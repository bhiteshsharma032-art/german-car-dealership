import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ScrollImageSequenceProps {
  frameCount?: number;
  folderPath?: string;
  filePrefix?: string;
  fileExtension?: string;
  padLength?: number;
}



const GOLD = '#ef4444';
const GOLD_LIGHT = '#f87171';
const NAVY = '#1a1a1f';

export default function ScrollImageSequence({
  frameCount = 180,
  folderPath = '/frames',
  filePrefix = 'frame-',
  fileExtension = '.jpg',
  padLength = 4
}: ScrollImageSequenceProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>();
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const smoothScrollRef = useRef<number>(0);
  const targetScrollRef = useRef<number>(0);
  const lastScrollProgressRef = useRef<number>(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;
    const totalFrames = frameCount;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = `${folderPath}/${filePrefix}${(index + 1).toString().padStart(padLength, '0')}${fileExtension}`;
        img.onload = () => {
          loadedImages[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          // Show content as soon as first frame is ready
          if (loadedCount === 1) {
            setImages([...loadedImages]);
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          resolve();
        };
      });
    };

    const loadProgressively = async () => {
      // Phase 1: Load first frame immediately
      await loadImage(0);

      // Phase 2: Load priority frames (every 10th) for smooth scrolling preview
      const priorityIndices: number[] = [];
      for (let i = 9; i < totalFrames; i += 10) {
        priorityIndices.push(i);
      }
      await Promise.all(priorityIndices.map(i => loadImage(i)));
      setImages([...loadedImages]);

      // Phase 3: Load remaining frames in small batches
      const remaining: number[] = [];
      for (let i = 0; i < totalFrames; i++) {
        if (i !== 0 && !priorityIndices.includes(i)) {
          remaining.push(i);
        }
      }
      const batchSize = 10;
      for (let b = 0; b < remaining.length; b += batchSize) {
        const batch = remaining.slice(b, b + batchSize);
        await Promise.all(batch.map(i => loadImage(i)));
        setImages([...loadedImages]);
      }
    };

    loadProgressively();
  }, [frameCount, folderPath]);

  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !container || !context) return;

    const setCanvasSize = () => {
      if (!canvas || images.length === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const renderFrame = () => {
      if (!context || !canvas) return;
      smoothScrollRef.current = lerp(smoothScrollRef.current, targetScrollRef.current, 0.08);
      if (Math.abs(smoothScrollRef.current - lastScrollProgressRef.current) > 0.001) {
        lastScrollProgressRef.current = smoothScrollRef.current;
        setScrollProgress(smoothScrollRef.current);
      }
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.12);
      let fi = Math.min(Math.floor(currentFrameRef.current), images.length - 1);
      let img = images[fi];
      // If target frame not loaded yet, find closest loaded frame
      if (!img || !img.complete) {
        for (let offset = 1; offset < images.length; offset++) {
          const below = fi - offset;
          const above = fi + offset;
          if (below >= 0 && images[below] && images[below].complete) { img = images[below]; break; }
          if (above < images.length && images[above] && images[above].complete) { img = images[above]; break; }
        }
      }
      if (img && img.complete) {
        const cw = canvas.width;
        const ch = canvas.height;
        context.clearRect(0, 0, cw, ch);
        
        // object-contain logic (shows full car without cropping)
        const imgRatio = img.width / img.height;
        const canvasRatio = cw / ch;
        let drawWidth = cw;
        let drawHeight = ch;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
           // height is the limiting factor
           drawHeight = ch;
           drawWidth = ch * imgRatio;
           offsetX = (cw - drawWidth) / 2;
        } else {
           // width is the limiting factor
           drawWidth = cw;
           drawHeight = cw / imgRatio;
           offsetY = (ch - drawHeight) / 2;
        }

        // Apply a gentle 1.18x scale to make the car wider/more prominent without overpowering the layout
        const zoom = 1.18;
        const finalWidth = drawWidth * zoom;
        const finalHeight = drawHeight * zoom;
        offsetX = (cw - finalWidth) / 2;
        offsetY = (ch - finalHeight) / 2;

        // Use smoothing for better quality
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(img, offsetX, offsetY, finalWidth, finalHeight);
      }
      rafRef.current = requestAnimationFrame(renderFrame);
    };

    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -rect.top / (container.offsetHeight - window.innerHeight)));
      targetScrollRef.current = easeOut(p);
      targetFrameRef.current = easeOut(p) * (images.length - 1);
    };

    handleScroll();
    renderFrame();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setCanvasSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [imagesLoaded, images]);

  const sections = [
    {
      subtitle: t('scroll.elegance'),
      title: 'BMW\nM340i',
      description: t('scroll.elegance_desc'),
      price: '',
      start: 0, fadeInEnd: 0.03, fadeOutStart: 0.22, end: 0.25,
      posClass: 'left-4 right-4 bottom-24 sm:left-auto sm:right-10 md:right-16 lg:right-20 sm:bottom-16 md:bottom-24 sm:max-w-lg md:max-w-2xl lg:max-w-4xl',
      align: 'left' as const,
      alignSm: 'right' as const,
    },
    {
      subtitle: t('scroll.design'),
      title: t('scroll.design_title'),
      description: t('scroll.design_desc'),
      price: '',
      start: 0.25, fadeInEnd: 0.28, fadeOutStart: 0.47, end: 0.50,
      posClass: 'left-4 right-4 bottom-24 sm:left-auto sm:right-10 md:right-16 lg:right-20 sm:bottom-16 md:bottom-24 sm:max-w-lg md:max-w-2xl lg:max-w-4xl',
      align: 'left' as const,
      alignSm: 'right' as const,
    },
    {
      subtitle: t('scroll.engine'),
      title: t('scroll.engine_title'),
      description: t('scroll.engine_desc'),
      price: '',
      start: 0.50, fadeInEnd: 0.53, fadeOutStart: 0.72, end: 0.75,
      posClass: 'left-4 right-4 bottom-24 sm:left-auto sm:right-10 md:right-16 lg:right-20 sm:bottom-16 md:bottom-24 sm:max-w-lg md:max-w-2xl lg:max-w-4xl',
      align: 'left' as const,
      alignSm: 'right' as const,
    },
    {
      subtitle: t('scroll.performance'),
      title: t('scroll.performance_title'),
      description: t('scroll.performance_desc'),
      price: '',
      start: 0.75, fadeInEnd: 0.78, fadeOutStart: 0.87, end: 0.90,
      posClass: 'left-4 right-4 bottom-24 sm:left-auto sm:right-10 md:right-16 lg:right-20 sm:bottom-16 md:bottom-24 sm:max-w-lg md:max-w-2xl lg:max-w-4xl',
      align: 'left' as const,
      alignSm: 'right' as const,
    },
  ];

  // Closing CTA section opacity (fades in after Performance)
  const closingStart = 0.90;
  const closingFadeInEnd = 0.94;
  const closingOpacity = scrollProgress <= closingStart ? 0
    : scrollProgress < closingFadeInEnd ? (scrollProgress - closingStart) / (closingFadeInEnd - closingStart)
      : 1;

  const smoothStep = (t: number) => t * t * (3 - 2 * t);
  const getSectionOpacity = (s: typeof sections[0]) => {
    const p = scrollProgress;
    const { start = 0, fadeInEnd = 0, fadeOutStart = 0, end = 0 } = s;
    if (p <= start) return start === 0 ? 1 : 0;
    if (p < fadeInEnd) return start === 0 ? 1 : smoothStep((p - start) / (fadeInEnd - start));
    if (p <= fadeOutStart) return 1;
    if (p < end) return 1 - smoothStep((p - fadeOutStart) / (end - fadeOutStart));
    return 0;
  };

  const currentSectionIdx = scrollProgress >= closingStart ? 4 : Math.min(Math.floor(scrollProgress * 4), 3);


  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden -mt-20 md:mt-0"
        style={{ background: NAVY }}
      >
        {/* Top HUD Indicators (Mobile only) */}
        <div className="absolute top-[12vh] right-6 z-10 flex flex-col items-end gap-1.5 md:hidden pointer-events-none opacity-40">
           <div className="flex gap-1">
             {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-[2px] h-4 ${i < 5 ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'bg-white/20'}`} />
             ))}
           </div>
           <span className="text-[6px] tracking-[0.4em] font-mono text-white/50 uppercase">System Integrity: 98%</span>
           <div className="w-16 h-[1px] bg-white/10" />
           <span className="text-[6px] tracking-[0.3em] font-mono text-white/30 uppercase">Node Kass-021</span>
        </div>

        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4">
            <div className="w-8 h-8 border-2 border-white/20 rounded-full animate-spin" style={{ borderTopColor: GOLD }} />
            <div className="text-white/60 text-xs tracking-[0.3em] uppercase">Loading {loadProgress}%</div>
            <div className="w-40 h-[2px] bg-[#2b2b36]/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: loadProgress + '%', background: GOLD }} />
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover absolute inset-0"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        />

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 md:opacity-30 pointer-events-none">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
          <span className="text-[7px] tracking-[0.5em] uppercase text-white/50 font-bold">{t('scroll.down')}</span>
        </div>

        {/* Futuristic Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-pulse"
            style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/10 rounded-full animate-pulse"
            style={{ animation: 'float 9s ease-in-out infinite 0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-red-500/20 rounded-full animate-pulse"
            style={{ animation: 'float 7s ease-in-out infinite 2s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{ animation: 'float 10s ease-in-out infinite 1.5s' }}></div>

          {/* Geometric Lines */}
          <div className="absolute top-1/4 right-0 w-32 h-px bg-gradient-to-l from-yellow-500/30 to-transparent"
            style={{ animation: 'slideLeft 3s ease-in-out infinite' }}></div>
          <div className="absolute bottom-1/3 left-0 w-40 h-px bg-gradient-to-r from-white/20 to-transparent"
            style={{ animation: 'slideRight 4s ease-in-out infinite 1s' }}></div>

          {/* Corner Accents */}
          <div className="absolute top-20 right-20 w-16 h-16 border-t border-r border-yellow-500/20"
            style={{ animation: 'fadeInOut 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 border-b border-l border-white/10"
            style={{ animation: 'fadeInOut 5s ease-in-out infinite 2s' }}></div>

          {/* Scanning Lines */}
          <div className="absolute top-[10vh] left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
            style={{ animation: 'scanDown 8s linear infinite' }}></div>
          <div className="absolute top-[15vh] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{ animation: 'scanDown 12s linear infinite 4s' }}></div>
          <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-red-500/5 to-transparent" 
            style={{ animation: 'slideRight 15s linear infinite' }}></div>
          <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" 
            style={{ animation: 'slideRight 20s linear infinite reverse' }}></div>
        </div>

        {imagesLoaded && (
          <>
            {/* ── Side Navigation ── */}
            <div className="absolute top-[22vh] md:top-1/3 w-[94%] left-[3%] md:left-12 md:w-auto -translate-y-0 md:-translate-y-1/4 flex flex-row md:flex-col justify-between md:justify-center z-20 p-1.5 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-xl bg-white/[0.03] md:bg-black/10 border border-white/[0.08] md:border-white/[0.03] shadow-2xl">
              {/* Vertical Track Line (desktop only) */}
              <div className="absolute left-[27px] md:left-[35px] top-10 bottom-10 w-[2px] bg-white/[0.08] hidden md:block" />
              <div 
                className="absolute left-[27px] md:left-[35px] top-10 w-[2px] transition-all duration-700 ease-out hidden md:block shadow-[0_0_10px_rgba(239,68,68,0.8)]" 
                style={{ height: `calc(${(currentSectionIdx / 3) * 100}% - 5rem)`, background: GOLD }} 
              />
              
              {[t('scroll.nav.start'), t('scroll.nav.design'), t('scroll.nav.engine'), t('scroll.nav.performance')].map((label, i) => {
                const active = currentSectionIdx === i;
                const handleClick = () => {
                  const container = containerRef.current;
                  if (!container) return;
                  
                  const sectionProgress = i * 0.25; // 0%, 25%, 50%, 75%
                  const scrollHeight = container.offsetHeight - window.innerHeight;
                  const targetScroll = sectionProgress * scrollHeight;
                  
                  // Smooth scroll to target
                  window.scrollTo({
                    top: container.offsetTop + targetScroll,
                    behavior: 'smooth'
                  });
                };

                return (
                  <button
                    key={label}
                    onClick={handleClick}
                    className="group relative py-2.5 md:py-6 px-3 md:pl-16 md:pr-8 text-[9px] sm:text-xs md:text-base tracking-[0.15em] md:tracking-[0.25em] uppercase transition-all duration-500 cursor-pointer text-center md:text-left flex flex-col md:flex-row items-center overflow-hidden rounded-xl md:rounded-2xl flex-1"
                    style={{ 
                      color: active ? 'white' : 'rgba(255,255,255,0.5)',
                      fontWeight: active ? '900' : '600',
                    }}
                  >
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Active dot indicator on the track (desktop) */}
                    <span 
                      className={`hidden md:block absolute left-2 md:left-4 w-3 h-3 rounded-full transition-all duration-500 border-[2px] ${active ? 'bg-red-500 border-red-500 scale-100 shadow-[0_0_15px_rgba(239,68,68,1)]' : 'bg-transparent border-white/20 scale-75 group-hover:scale-100 group-hover:border-white/40'}`}
                    />
                    
                    <span className="relative z-10 transition-transform duration-500 md:group-hover:translate-x-3 flex flex-col md:flex-row items-center gap-1 md:gap-4">
                      <span className={`font-black text-[10px] md:text-base transition-colors duration-500 ${active ? 'text-red-500 opacity-100' : 'text-gray-600 opacity-60'}`}>
                        {`0${i+1}`}
                      </span>
                      <span>{label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Section Overlays ── */}
            {sections.map((section, index) => {
              const opacity = getSectionOpacity(section);
              if (opacity <= 0) return null;
              const ty = (1 - opacity) * 16;

              return (
                <div
                  key={index}
                  className={'absolute z-10 px-4 py-6 md:p-0 ' + section.posClass}
                  style={{ 
                    opacity, 
                    transform: 'translateY(' + ty + 'px)',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                    borderRadius: '2rem',
                  }}
                >
                  {/* Gold rule + subtitle */}
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="h-[2px] w-8 sm:w-10 flex-shrink-0" style={{ background: GOLD }} />
                    <span
                      className="text-[10px] sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase font-black"
                      style={{ color: GOLD, textShadow: '0 0 10px rgba(239,68,68,0.3)' }}
                    >
                      {section.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className="font-black leading-[0.88] mb-3 sm:mb-4 md:mb-5 tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                    style={{
                      fontSize: 'clamp(2.5rem, 12vw, 7.5rem)',
                      textAlign: 'left',
                      textShadow: '0 2px 40px rgba(0,0,0,0.9)',
                    }}
                  >
                    {(section.title || '').split('\n').map((line, li) => (
                      <span key={li} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </h1>

                  {/* Description - visible on mobile to fill blank space */}
                  <p
                    className="text-xs sm:text-sm md:text-lg leading-relaxed block font-medium"
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      textAlign: 'left',
                      maxWidth: '380px',
                      textShadow: '0 1px 1px rgba(0,0,0,0.5)',
                    }}
                  >
                    {section.description}
                  </p>
                </div>
              );
            })}





            {/* ── Closing CTA Section ── */}
            {closingOpacity > 0 && (
              <div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                style={{
                  opacity: closingOpacity,
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                }}
              >
                {/* Decorative top line */}
                <div className="w-20 h-[1px] mb-6" style={{ background: 'linear-gradient(90deg, transparent, ' + GOLD + ', transparent)' }} />

                <div className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: GOLD }}>
                  Nordhessen Automobile
                </div>

                <h2
                  className="font-black text-center leading-[0.9] mb-6"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    background: 'linear-gradient(135deg, #ffffff 0%, ' + GOLD + ' 50%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('scroll.cta.title1')}
                  <br />
                  {t('scroll.cta.title2')}
                </h2>

                <p className="text-white/60 text-sm md:text-base text-center max-w-md mb-10 leading-relaxed px-6">
                  {t('scroll.cta.desc')}
                </p>

                {/* Stats row */}
                <div className="flex gap-10 md:gap-16 mb-10">
                  {[
                    ['100%', t('scroll.cta.stat1')],
                    [t('scroll.cta.stat2_val'), t('scroll.cta.stat2')],
                    [t('scroll.cta.stat3_val'), t('scroll.cta.stat3')],
                  ].map(([val, lbl]) => (
                    <div key={lbl} className="text-center">
                      <div className="text-2xl md:text-3xl font-black text-white mb-1">{val}</div>
                      <div className="text-[9px] tracking-[0.3em] uppercase" style={{ color: GOLD + 'cc' }}>{lbl}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => { window.location.href = '/fahrzeuge'; }}
                    className="px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-extrabold border transition-all duration-300 hover:bg-[#2b2b36]/10"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}
                  >
                    {t('scroll.cta.button')}
                  </button>
                </div>

                {/* Bottom decorative line */}
                <div className="w-20 h-[1px] mt-10" style={{ background: 'linear-gradient(90deg, transparent, ' + GOLD + '60, transparent)' }} />
              </div>
            )}



            {/* ── Bottom branding ── */}
            <div className="absolute right-10 bottom-20 rotate-90 origin-bottom-right z-10 hidden md:block">
              <span className="text-[9px] tracking-[0.5em] uppercase font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Nordhessen Automobile
              </span>
            </div>

            {/* ── Left Empty Space Fillers (Tech Elements) ── */}
            <div className="absolute left-6 md:left-12 top-[35vh] md:bottom-28 z-0 flex flex-col gap-8 md:gap-10 pointer-events-none opacity-60 md:opacity-80">
              
              {/* Technical Target Graphic */}
              <div className="relative w-12 h-12 md:w-16 md:h-16 opacity-40 md:opacity-60">
                <div className="absolute inset-0 border border-white/[0.08] rounded-full" />
                <div className="absolute inset-1.5 md:inset-2 border border-white/[0.15] rounded-full border-t-red-500/80" style={{ animation: 'spin 8s linear infinite' }} />
                <div className="absolute inset-3.5 md:inset-4 border border-white/[0.05] rounded-full border-b-white/50" style={{ animation: 'spin 12s linear infinite reverse' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" />
                </div>
                {/* Crosshairs */}
                <div className="absolute top-[-10px] bottom-[-10px] left-1/2 w-[1px] bg-white/[0.08]" />
                <div className="absolute left-[-10px] right-[-10px] top-1/2 h-[1px] bg-white/[0.08]" />
              </div>
              
              {/* Technical Scan Marker (Mobile Only) */}
              <div className="flex md:hidden flex-col gap-1.5 border-l border-white/20 pl-4 py-1">
                 <span className="text-[7px] tracking-[0.4em] font-mono text-white/30 uppercase">Scan Active</span>
                 <div className="flex gap-1">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="w-1 h-1 bg-red-500/50 rounded-full animate-pulse" style={{ animationDelay: i * 200 + 'ms' }} />
                   ))}
                 </div>
              </div>

              <div className="flex gap-8 items-end">
                {/* Coordinates */}
                <div className="flex flex-col gap-2 border-l-2 border-red-500/40 pl-5 py-1">
                  <span className="text-[8px] md:text-[9px] tracking-[0.4em] font-mono text-red-500/60 uppercase">
                    {t('scroll.location')}
                  </span>
                  <span className="text-[10px] md:text-xs tracking-[0.2em] font-mono text-white/50 uppercase">
                    51.3127° N
                  </span>
                  <span className="text-[10px] md:text-xs tracking-[0.2em] font-mono text-white/50 uppercase">
                    9.4797° E
                  </span>
                </div>

                {/* Data streams indicator */}
                <div className="hidden sm:flex gap-2.5 pb-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-1.5 opacity-60">
                      <div className="w-1 h-3 bg-white/10 rounded-sm" />
                      <div className={`w-1 rounded-sm ${i === 1 ? 'bg-red-500 h-8 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : i === 3 ? 'bg-white/50 h-5' : 'bg-white/20 h-2'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Ambient Background Typography ── */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] md:-translate-x-[40%] -rotate-90 pointer-events-none opacity-[0.04] md:opacity-[0.03] z-0 mix-blend-overlay">
              <span className="text-[6rem] sm:text-[10rem] md:text-[15rem] font-black tracking-tighter text-white whitespace-nowrap">
                NORDHESSEN
              </span>
            </div>

            {/* ── Progress bar ── */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] z-10" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full"
                style={{
                  width: (scrollProgress * 100) + '%',
                  background: 'linear-gradient(90deg, ' + GOLD + ', ' + GOLD_LIGHT + ')',
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
