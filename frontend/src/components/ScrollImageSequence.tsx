import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ScrollImageSequenceProps {
  frameCount?: number;
  folderPath?: string;
  filePrefix?: string;
  fileExtension?: string;
  padLength?: number;
  onLoadProgress?: (progress: number) => void;
  onAllLoaded?: () => void;
}

const GOLD = '#ef4444';
const GOLD_LIGHT = '#f87171';
const NAVY = '#1a1a1f';

export default function ScrollImageSequence({
  frameCount = 192,
  folderPath = '/frames-webp',
  filePrefix = '',
  fileExtension = '.webp',
  padLength = 4,
  onLoadProgress,
  onAllLoaded,
}: ScrollImageSequenceProps) {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const [ready, setReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadPercent, setLoadPercent] = useState(0);
  // Shorter scroll distance on mobile so users don't have to scroll forever
  const [scrollHeight, setScrollHeight] = useState('500vh');
  const rafRef = useRef(0);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const lastProgressRef = useRef(0);
  const lastFrameDrawn = useRef(-1);

  const getUrl = useCallback((i: number) =>
    `${folderPath}/${filePrefix}${(i + 1).toString().padStart(padLength, '0')}${fileExtension}`,
    [folderPath, filePrefix, padLength, fileExtension]);

  // Responsive scroll length: shorter on mobile (250vh) vs desktop (500vh)
  useEffect(() => {
    const updateHeight = () => setScrollHeight(window.innerWidth < 768 ? '260vh' : '500vh');
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // ── OPTIMIZED IMAGE LOADING ──
  useEffect(() => {
    const arr = imagesRef.current;
    let loaded = 0;
    let revealed = false;
    let cancelled = false;

    const load = (idx: number): Promise<void> => new Promise(r => {
      if (cancelled || arr[idx]) { r(); return; }
      const img = new Image();
      img.decoding = 'async';
      img.src = getUrl(idx);
      img.onload = () => {
        if (cancelled) { r(); return; }
        arr[idx] = img;
        loaded++;
        const pct = Math.round((loaded / frameCount) * 100);
        setLoadPercent(pct);
        onLoadProgress?.(pct);
        if (!revealed) {
          revealed = true;
          setReady(true);
          onAllLoaded?.();
        }
        r();
      };
      img.onerror = () => { loaded++; r(); };
    });

    (async () => {
      // Phase 1: Load first frame immediately for instant display
      await load(0);
      if (cancelled) return;

      // Phase 2: Load 24 evenly-spaced keyframes for smooth initial scrolling
      const keyCount = 24;
      const keys: number[] = [];
      for (let i = 1; i <= keyCount; i++) keys.push(Math.round((i / keyCount) * (frameCount - 1)));
      await Promise.all(keys.map(load));
      if (cancelled) return;

      // Phase 3: Fill remaining frames in batches of 12 (WebP is small, can load more in parallel)
      const rest: number[] = [];
      for (let i = 1; i < frameCount; i++) if (!arr[i]) rest.push(i);
      for (let b = 0; b < rest.length; b += 12) {
        if (cancelled) return;
        await Promise.all(rest.slice(b, b + 12).map(load));
      }
    })();

    return () => { cancelled = true; };
  }, [frameCount, getUrl]);

  // ── CANVAS + SCROLL ──
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrameDrawn.current = -1;
    };
    resize();
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(resize, 150) as any; };
    window.addEventListener('resize', onResize);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const findImg = (target: number): HTMLImageElement | null => {
      const imgs = imagesRef.current;
      const fi = Math.max(0, Math.min(Math.round(target), imgs.length - 1));
      if (imgs[fi]?.complete) return imgs[fi];
      // Search nearby frames for closest loaded image
      for (let d = 1; d < 20; d++) {
        if (fi - d >= 0 && imgs[fi - d]?.complete) return imgs[fi - d];
        if (fi + d < imgs.length && imgs[fi + d]?.complete) return imgs[fi + d];
      }
      return imgs[0];
    };

    const render = () => {
      // Smoother interpolation - higher values = snappier, lower = smoother
      smoothScrollRef.current = lerp(smoothScrollRef.current, targetScrollRef.current, 0.08);
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.10);
      const fi = Math.round(currentFrameRef.current);
      if (Math.abs(smoothScrollRef.current - lastProgressRef.current) > 0.0005) {
        lastProgressRef.current = smoothScrollRef.current;
        setScrollProgress(smoothScrollRef.current);
      }
      if (fi !== lastFrameDrawn.current || smoothScrollRef.current > 0.92) {
        const img = findImg(fi);
        if (img) {
          const cw = window.innerWidth, ch = window.innerHeight;
          ctx.fillStyle = NAVY;
          ctx.fillRect(0, 0, cw, ch);
          const dw = cw, dh = cw / (img.width / img.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, (ch - dh) / 2, dw, dh);
          
          // Smooth fade to background at the very end (last 8% of scroll)
          const fadeStart = 0.92;
          if (smoothScrollRef.current > fadeStart) {
            const fadeProgress = (smoothScrollRef.current - fadeStart) / (1 - fadeStart);
            ctx.fillStyle = NAVY;
            ctx.globalAlpha = fadeProgress;
            ctx.fillRect(0, 0, cw, ch);
            ctx.globalAlpha = 1;
          }
          
          lastFrameDrawn.current = fi;
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -rect.top / (container.offsetHeight - window.innerHeight)));
      targetScrollRef.current = p;
      // Map scroll to frames: use 92% of scroll for all frames, last 8% holds on final frame
      const frameProgress = Math.min(p / 0.92, 1);
      targetFrameRef.current = frameProgress * (frameCount - 1);
    };

    onScroll();
    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); cancelAnimationFrame(rafRef.current); };
  }, [ready, frameCount]);

  // ── SECTION DATA ──
  const sections = useMemo(() => [
    { subtitle: t('scroll.elegance'), title: 'BMW\nM340i', start: 0, fadeInEnd: 0.03, fadeOutStart: 0.18, end: 0.20,
      posClass: 'left-4 right-4 bottom-[25vh] p-5 sm:p-0 sm:left-auto sm:right-10 md:right-16 sm:bottom-16 md:bottom-24 sm:max-w-sm md:max-w-md' },
    { subtitle: t('scroll.design'), title: t('scroll.design_title'), start: 0.20, fadeInEnd: 0.23, fadeOutStart: 0.38, end: 0.40,
      posClass: 'left-4 right-4 bottom-[25vh] sm:left-auto sm:right-10 md:right-16 sm:bottom-16 md:bottom-24 sm:max-w-sm md:max-w-md' },
    { subtitle: t('scroll.engine'), title: t('scroll.engine_title'), start: 0.40, fadeInEnd: 0.43, fadeOutStart: 0.58, end: 0.60,
      posClass: 'left-4 right-4 bottom-[25vh] sm:left-auto sm:right-10 md:right-16 sm:bottom-16 md:bottom-24 sm:max-w-sm md:max-w-md' },
    { subtitle: t('scroll.performance'), title: t('scroll.performance_title'), start: 0.60, fadeInEnd: 0.63, fadeOutStart: 0.78, end: 0.80,
      posClass: 'left-4 right-4 bottom-[25vh] sm:left-auto sm:right-8 md:right-12 lg:right-16 sm:bottom-16 md:bottom-24 sm:max-w-sm md:max-w-lg lg:max-w-xl pr-4 sm:pr-0' },
  ], [t, language]);

  const closingStart = 0.88, closingFadeInEnd = 0.94;
  const closingOpacity = scrollProgress <= closingStart ? 0 : scrollProgress < closingFadeInEnd ? (scrollProgress - closingStart) / (closingFadeInEnd - closingStart) : 1;
  const smoothStep = (x: number) => x * x * (3 - 2 * x);
  const getSectionOpacity = (s: typeof sections[0]) => {
    const p = scrollProgress;
    if (p <= s.start) return s.start === 0 ? 1 : 0;
    if (p < s.fadeInEnd) return s.start === 0 ? 1 : smoothStep((p - s.start) / (s.fadeInEnd - s.start));
    if (p <= s.fadeOutStart) return 1;
    if (p < s.end) return 1 - smoothStep((p - s.fadeOutStart) / (s.end - s.fadeOutStart));
    return 0;
  };
  const currentSectionIdx = scrollProgress >= closingStart ? 4 : scrollProgress < 0.20 ? 0 : scrollProgress < 0.40 ? 1 : scrollProgress < 0.60 ? 2 : 3;
  void currentSectionIdx; // kept for potential future use

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: scrollHeight }}>
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden" style={{ background: NAVY }}>

        {/* Loading Screen */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-6 bg-[#1a1a1f]">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin" style={{ borderTopColor: GOLD, borderRightColor: GOLD_LIGHT, animationDuration: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/80 text-xs font-bold">{loadPercent}%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm tracking-[0.3em] uppercase font-bold mb-2" style={{ color: GOLD }}>Nordhessen Automobile</div>
              <div className="text-white/40 text-xs tracking-[0.2em] uppercase">Loading Experience</div>
            </div>
            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full transition-all duration-300" style={{ width: `${loadPercent}%`, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }} />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="w-full h-full object-cover absolute inset-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }} />

        {/* Decorative Automotive Graphics */}
        {ready && (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none z-[3] opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="0.5"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <line x1="0" y1="0" x2="256" y2="256" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute top-20 right-0 w-96 h-32 pointer-events-none z-[3] opacity-30 overflow-hidden">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <line x1="400" y1="20" x2="200" y2="20" stroke="rgba(239,68,68,0.6)" strokeWidth="2" strokeDasharray="10,5" />
                <line x1="400" y1="40" x2="150" y2="40" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" strokeDasharray="8,4" />
                <line x1="400" y1="60" x2="180" y2="60" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" strokeDasharray="12,6" />
                <line x1="400" y1="80" x2="220" y2="80" stroke="rgba(239,68,68,0.3)" strokeWidth="1" strokeDasharray="6,3" />
              </svg>
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none z-[3]" style={{ opacity: 0.15, transform: `translate(-50%, 0) rotate(${scrollProgress * 360}deg)` }}>
              <svg width="100%" height="100%" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth="0.5" strokeDasharray="4,4" />
                <circle cx="80" cy="80" r="50" fill="none" stroke="rgba(239,68,68,0.6)" strokeWidth="1" />
                <circle cx="80" cy="80" r="30" fill="none" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5" />
                <line x1="80" y1="10" x2="80" y2="30" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
                <line x1="80" y1="130" x2="80" y2="150" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
                <line x1="10" y1="80" x2="30" y2="80" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
                <line x1="130" y1="80" x2="150" y2="80" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              </svg>
            </div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none z-[2] opacity-5">
              <svg width="100%" height="100%" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M 100 150 L 150 150 L 180 120 L 250 120 L 280 100 L 350 100 L 380 120 L 450 120 L 480 150 L 500 150" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <ellipse cx="200" cy="150" rx="25" ry="25" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3"/>
                <ellipse cx="430" cy="150" rx="25" ry="25" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3"/>
              </svg>
            </div>
            <div className="absolute bottom-32 left-0 w-48 h-48 pointer-events-none z-[3] opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)"><polygon points="25,0 50,14.43 50,43.3 25,57.73 0,43.3 0,14.43" fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="1"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#hexagons)" />
              </svg>
            </div>
            <div className="absolute bottom-40 right-10 w-32 h-32 pointer-events-none z-[3] opacity-20" style={{ transform: `rotate(${scrollProgress * 180}deg)` }}>
              <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <path d="M 64 64 L 64 20" stroke="rgba(239,68,68,0.8)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="64" cy="64" r="40" fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth="1" strokeDasharray="3,3"/>
                <circle cx="64" cy="64" r="4" fill="rgba(239,68,68,0.8)"/>
              </svg>
            </div>
          </>
        )}

        {/* Dynamic Bottom Gradient */}
        {ready && scrollProgress > 0.7 && (
          <div className="absolute inset-0 pointer-events-none z-[5]" style={{ background: 'linear-gradient(to top, #1a1a1f 0%, rgba(26, 26, 31, 0.8) 25%, transparent 55%)', opacity: Math.min((scrollProgress - 0.7) / 0.25, 1) }} />
        )}

        {ready && (<>
          {/* Static Brand Identity — prominent, always visible during scroll */}
          <div className="absolute left-4 right-4 md:left-10 md:right-auto bottom-24 md:top-1/2 md:-translate-y-1/2 z-20 pointer-events-none flex flex-col items-start gap-2 md:gap-3">
            <div className="h-[2px] w-14 md:w-20" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)`, boxShadow: `0 0 10px ${GOLD}` }} />
            <div className="flex flex-col leading-[0.95]">
              <span className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-black text-white" style={{ textShadow: `0 0 24px ${GOLD}, 0 2px 14px rgba(0,0,0,0.95), 0 4px 24px rgba(0,0,0,0.9)` }}>
                Nordhessen
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-black text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`, filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))' }}>
                Automobile
              </span>
            </div>
            <span className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-bold text-white/60" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
              Kassel · Premium Fahrzeuge
            </span>
          </div>

          {/* Section Overlays */}
          {sections.map((section, index) => {
            const opacity = getSectionOpacity(section);
            if (opacity <= 0) return null;
            const isPerformance = index === 3;
            return (
              <div key={`${language}-${index}`} className={'absolute z-10 ' + section.posClass} style={{ opacity, transform: `translateY(${(1 - opacity) * 16}px)` }}>
                <div className="absolute inset-0 -m-8 rounded-3xl blur-2xl" style={{ background: isPerformance ? 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)' : 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
                <div className="relative z-10 p-6 md:p-0">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="h-[2px] w-6 sm:w-10 flex-shrink-0" style={{ background: GOLD, boxShadow: `0 0 10px ${GOLD}` }} />
                    <span className="text-[9px] sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold" style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}, 0 2px 10px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8)` }}>{section.subtitle}</span>
                  </div>
                  <h1 className="font-black leading-[0.88] mb-1 sm:mb-4 md:mb-5 tracking-tighter text-white" style={{ fontSize: isPerformance ? 'clamp(2.5rem, 10vw, 6.5rem)' : 'clamp(2.7rem, 11vw, 7.5rem)', textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 8px 40px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,0.5)' }}>
                    {(section.title || '').split('\n').map((line, li) => <span key={li} style={{ display: 'block' }}>{line}</span>)}
                  </h1>
                </div>
                <div className="md:hidden absolute left-0 right-0 -bottom-[5.5rem] flex flex-col items-center justify-center gap-3 w-full opacity-60">
                  <div className="w-[1px] h-[30px] bg-gradient-to-b from-white/40 to-transparent" />
                  <span className="text-[9px] tracking-[0.4em] text-white uppercase font-bold" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>Scroll Down</span>
                </div>
              </div>
            );
          })}

          {/* Closing CTA */}
          {closingOpacity > 0 && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center" style={{ opacity: closingOpacity, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3) 100%)' }}>
              <div className="w-20 h-[1px] mb-6" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, boxShadow: `0 0 10px ${GOLD}` }} />
              <div className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}, 0 2px 10px rgba(0,0,0,0.9)` }}>Nordhessen Automobile</div>
              <h2 className="font-black text-center leading-[0.9] mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', background: `linear-gradient(135deg, #ffffff 0%, ${GOLD} 50%, #ffffff 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.9)) drop-shadow(0 2px 10px rgba(0,0,0,1))' }}>
                {t('scroll.cta.title1')}<br />{t('scroll.cta.title2')}
              </h2>
              <p className="text-white/80 text-sm md:text-base text-center max-w-md mb-10 leading-relaxed px-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8)' }}>{t('scroll.cta.desc')}</p>
              <div className="flex gap-10 md:gap-16 mb-10">
                {[['100%', t('scroll.cta.stat1')], [t('scroll.cta.stat2_val'), t('scroll.cta.stat2')], [t('scroll.cta.stat3_val'), t('scroll.cta.stat3')]].map(([val, lbl]) => (
                  <div key={lbl} className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>{val}</div>
                    <div className="text-[9px] tracking-[0.3em] uppercase" style={{ color: GOLD + 'cc', textShadow: `0 0 10px ${GOLD}, 0 2px 8px rgba(0,0,0,0.9)` }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => { window.location.href = '/fahrzeuge'; }} className="px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-extrabold border transition-all duration-300 hover:bg-[#2b2b36]/10" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.9)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{t('scroll.cta.button')}</button>
              <div className="w-20 h-[1px] mt-10" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}60, transparent)` }} />
            </div>
          )}

          {/* Bottom elements */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none">
            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/30" />
            <span className="text-[8px] tracking-[0.4em] uppercase text-white/30 font-light" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>Scroll Down</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] z-10" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full" style={{ width: (scrollProgress * 100) + '%', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }} />
          </div>
        </>)}
      </div>
    </div>
  );
}
