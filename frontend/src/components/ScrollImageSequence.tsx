import { useEffect, useRef, useState } from 'react';

interface ScrollImageSequenceProps {
  frameCount?: number;
  folderPath?: string;
  filePrefix?: string;
  fileExtension?: string;
  padLength?: number;
}



const GOLD = '#dc2626';
const GOLD_LIGHT = '#ef4444';
const NAVY = '#1a1a1a';

export default function ScrollImageSequence({
  frameCount = 180,
  folderPath = '/frames',
  filePrefix = 'frame-',
  fileExtension = '.jpg',
  padLength = 4
}: ScrollImageSequenceProps) {
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
      const img = images[0];
      const ww = window.innerWidth, wh = window.innerHeight;
      const ia = img.width / img.height, wa = ww / wh;
      if (wa > ia) { canvas.width = ww; canvas.height = ww / ia; }
      else { canvas.height = wh; canvas.width = wh * ia; }
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
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
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
      subtitle: 'ELEGANCE MEETS PERFORMANCE',
      title: 'BMW\nM340i',
      description: 'The perfect fusion of sportiness and everyday practicality. A four-door coupé that turns every drive into an experience.',
      price: '',
      start: 0, fadeInEnd: 0.03, fadeOutStart: 0.22, end: 0.25,
      posClass: 'left-8 md:left-16 bottom-40',
      align: 'left' as const,
    },
    {
      subtitle: 'SCULPTED FOR AERODYNAMICS',
      title: 'Design',
      description: 'Frameless doors, flowing roofline, and the iconic kidney grille. Every detail designed to cut through the air with precision.',
      price: '',
      start: 0.25, fadeInEnd: 0.28, fadeOutStart: 0.47, end: 0.50,
      posClass: 'left-8 md:left-16 bottom-40',
      align: 'left' as const,
    },
    {
      subtitle: 'TURBOCHARGED EFFICIENCY',
      title: 'Engine',
      description: 'Powerful engine delivering pure driving dynamics and efficiency on every journey. Perfectly matched transmission for an exhilarating drive.',
      price: '',
      start: 0.50, fadeInEnd: 0.53, fadeOutStart: 0.72, end: 0.75,
      posClass: 'left-8 md:left-16 bottom-40',
      align: 'left' as const,
    },
    {
      subtitle: 'DYNAMIC DRIVING EXPERIENCE',
      title: 'Performance',
      description: 'Exceptional acceleration and precise handling thanks to advanced M Sport suspension technology and variable sport steering.',
      price: '',
      start: 0.75, fadeInEnd: 0.78, fadeOutStart: 0.87, end: 0.90,
      posClass: 'left-8 md:left-16 bottom-40',
      align: 'left' as const,
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
    if (p <= s.start) return s.start === 0 ? 1 : 0;
    if (p < s.fadeInEnd) return s.start === 0 ? 1 : smoothStep((p - s.start) / (s.fadeInEnd - s.start));
    if (p <= s.fadeOutStart) return 1;
    if (p < s.end) return 1 - smoothStep((p - s.fadeOutStart) / (s.end - s.fadeOutStart));
    return 0;
  };

  const currentSectionIdx = scrollProgress >= closingStart ? 4 : Math.min(Math.floor(scrollProgress * 4), 3);
  const searchOpacity = scrollProgress > 0.12 && scrollProgress < closingStart ? Math.min((scrollProgress - 0.12) / 0.05, 1) : scrollProgress >= closingStart ? 1 - closingOpacity : 0;
  const searchX = scrollProgress > 0.12 ? 0 : 30;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden"
        style={{ background: NAVY }}
      >
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4">
            <div className="w-8 h-8 border-2 border-white/20 rounded-full animate-spin" style={{ borderTopColor: GOLD }} />
            <div className="text-white/60 text-xs tracking-[0.3em] uppercase">Loading {loadProgress}%</div>
            <div className="w-40 h-[2px] bg-[#1a1a1a]/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: loadProgress + '%', background: GOLD }} />
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        />

        {/* Futuristic Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-500/30 rounded-full animate-pulse"
            style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#1a1a1a]/20 rounded-full animate-pulse"
            style={{ animation: 'float 8s ease-in-out infinite 1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-yellow-500/20 rounded-full animate-pulse"
            style={{ animation: 'float 7s ease-in-out infinite 2s' }}></div>

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
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"
            style={{ animation: 'scanDown 8s linear infinite' }}></div>
        </div>

        {imagesLoaded && (
          <>
            {/* ── Top Navigation ── */}
            <div className="absolute top-0 right-0 md:left-0 flex flex-col md:flex-row justify-start md:justify-center items-end md:items-center gap-6 md:gap-10 pt-24 md:pt-20 z-10 px-6">
              {['01 Start', '02 Design', '03 Engine', '04 Performance'].map((label, i) => {
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
                    className="relative pb-1 md:pb-2 text-xs md:text-base tracking-[0.25em] uppercase font-semibold transition-colors duration-500 cursor-pointer hover:text-white text-right md:text-left"
                    style={{ color: active ? GOLD : 'rgba(255,255,255,0.35)' }}
                  >
                    {label}
                    <span
                      className="absolute bottom-0 right-0 md:left-1/2 md:-translate-x-1/2 h-[1px] transition-all duration-500"
                      style={{ width: active ? '100%' : '0%', background: GOLD }}
                    />
                  </button>
                );
              })}
            </div>

            {/* ── Thin top border accent ── */}
            <div className="absolute top-0 left-0 w-full h-[2px] z-10" style={{ background: 'linear-gradient(90deg, transparent 0%, ' + GOLD + ' 50%, transparent 100%)' }} />

            {/* ── Section Overlays ── */}
            {sections.map((section, index) => {
              const opacity = getSectionOpacity(section);
              if (opacity <= 0) return null;
              const ty = (1 - opacity) * 16;

              return (
                <div
                  key={index}
                  className={'absolute z-10 max-w-md ' + section.posClass}
                  style={{ opacity, transform: 'translateY(' + ty + 'px)' }}
                >
                  {/* Gold rule + subtitle */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-10" style={{ background: GOLD }} />
                    <span
                      className="text-sm md:text-base tracking-[0.3em] uppercase font-semibold"
                      style={{ color: GOLD }}
                    >
                      {section.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className="font-black leading-[0.88] mb-5 tracking-tighter text-white"
                    style={{
                      fontSize: 'clamp(3.5rem, 7vw, 7.5rem)',
                      textAlign: section.align,
                      textShadow: '0 2px 40px rgba(0,0,0,0.8)',
                    }}
                  >
                    {section.title.split('\n').map((line, li) => (
                      <span key={li} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </h1>

                  {/* Description */}
                  <p
                    className="text-base md:text-lg leading-relaxed"
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      textAlign: 'left',
                      maxWidth: '340px',
                    }}
                  >
                    {section.description}
                  </p>
                </div>
              );
            })}



            {/* ── Glassmorphic Search Panel ── */}
            <div
              className="absolute right-8 md:right-16 top-[40%] -translate-y-1/2 z-20 hidden lg:block"
              style={{
                opacity: searchOpacity,
                transform: 'translateX(' + searchX + 'px)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              }}
            >
              <div
                className="w-[280px] border"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderColor: GOLD + '30',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 12px 48px rgba(0,0,0,0.3)',
                }}
              >
                {/* Gold top accent line */}
                <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, ' + GOLD + ', transparent)' }} />

                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: GOLD + '50' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold tracking-widest uppercase">Fahrzeug suchen</div>
                      <div className="text-[9px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>Find your car</div>
                    </div>
                  </div>

                  <div className="h-px mb-6" style={{ background: GOLD + '20' }} />

                  <div className="space-y-4 mb-7">
                    {[
                      { label: 'Marke', options: ['Alle Marken', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Volkswagen'] },
                      { label: 'Preis bis', options: ['Kein Limit', 'Bis 30.000 €', 'Bis 50.000 €', 'Bis 75.000 €', 'Bis 100.000 €', 'Über 150.000 €'] },
                      { label: 'Kraftstoff', options: ['Alle', 'Benzin', 'Diesel', 'Elektro', 'Hybrid'] },
                    ].map((field) => (
                      <div key={field.label}>
                        <label
                          className="block text-[9px] tracking-[0.25em] uppercase mb-2"
                          style={{ color: GOLD }}
                        >
                          {field.label}
                        </label>
                        <select
                          className="w-full px-4 py-2.5 text-white text-xs border focus:outline-none transition-colors appearance-none"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.85)',
                          }}
                          defaultValue=""
                        >
                          {field.options.map((opt, oi) => (
                            <option key={opt} value={oi === 0 ? '' : opt} className="bg-black">{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => { window.location.href = '/fahrzeuge'; }}
                    className="w-full py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, ' + GOLD + ' 0%, ' + GOLD_LIGHT + ' 100%)', color: NAVY }}
                  >
                    Bestand ansehen
                  </button>

                  <div className="mt-5 pt-5 flex justify-between" style={{ borderTop: '1px solid ' + GOLD + '20' }}>
                    {[['100%', 'Geprüft'], ['Premium', 'Qualität'], ['Top', 'Service']].map(([val, lbl]) => (
                      <div key={lbl} className="text-center">
                        <div className="text-white text-sm font-bold">{val}</div>
                        <div className="text-[8px] tracking-wider uppercase" style={{ color: GOLD + 'aa' }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
                  Finden Sie Ihr
                  <br />
                  Traumauto
                </h2>

                <p className="text-white/60 text-sm md:text-base text-center max-w-md mb-10 leading-relaxed px-6">
                  Premium-Fahrzeuge, persönliche Beratung und erstklassiger Service.
                  <br />
                  Entdecken Sie unsere aktuelle Kollektion.
                </p>

                {/* Stats row */}
                <div className="flex gap-10 md:gap-16 mb-10">
                  {[
                    ['100%', 'Geprüft'],
                    ['Premium', 'Qualität'],
                    ['Top', 'Service'],
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
                    className="px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-extrabold border transition-all duration-300 hover:bg-[#1a1a1a]/10"
                    style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}
                  >
                    Alle Modelle
                  </button>
                </div>

                {/* Bottom decorative line */}
                <div className="w-20 h-[1px] mt-10" style={{ background: 'linear-gradient(90deg, transparent, ' + GOLD + '60, transparent)' }} />
              </div>
            )}



            {/* ── Bottom branding ── */}
            <div className="absolute right-10 bottom-20 rotate-90 origin-bottom-right z-10">
              <span className="text-[9px] tracking-[0.5em] uppercase font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Nordhessen Automobile
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
