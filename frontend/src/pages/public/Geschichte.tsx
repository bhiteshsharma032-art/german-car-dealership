import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { Award, Users, MapPin, Star, TrendingUp, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Image Placeholder Box ── */
function ImageBox({ label, aspect = 'aspect-[4/3]', className = '' }: { label: string; aspect?: string; className?: string }) {
  return (
    <div className={`${aspect} ${className} relative rounded-2xl overflow-hidden border border-white/[0.07] bg-gradient-to-br from-white/[0.03] to-white/[0.01] group`}>
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-red-500/40" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-red-500/40" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-red-500/40" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-red-500/40" />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover:border-red-500/30 group-hover:bg-red-500/5 transition-all duration-500">
          <svg className="w-6 h-6 text-white/20 group-hover:text-red-500/40 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/20 group-hover:text-white/30 transition-colors duration-500">{label}</span>
      </div>
    </div>
  );
}

export default function Geschichte() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: '2008',
      title: t('story.milestones.2008.title'),
      desc: t('story.milestones.2008.desc'),
      image: t('story.milestones.2008.title'),
      side: 'left',
    },
    {
      year: '2012',
      title: t('story.milestones.2012.title'),
      desc: t('story.milestones.2012.desc'),
      image: t('story.milestones.2012.title'),
      side: 'right',
    },
    {
      year: '2016',
      title: t('story.milestones.2016.title'),
      desc: t('story.milestones.2016.desc'),
      image: t('story.milestones.2016.title'),
      side: 'left',
    },
    {
      year: '2020',
      title: t('story.milestones.2020.title'),
      desc: t('story.milestones.2020.desc'),
      image: t('story.milestones.2020.title'),
      side: 'right',
    },
    {
      year: '2024',
      title: t('story.milestones.2024.title'),
      desc: t('story.milestones.2024.desc'),
      image: t('story.milestones.2024.title'),
      side: 'left',
    },
  ];

  const values = [
    { 
      icon: <ShieldCheck className="w-7 h-7" />, 
      title: t('story.values.1.title'), 
      desc: t('story.values.1.desc') 
    },
    { 
      icon: <Star className="w-7 h-7" />, 
      title: t('story.values.2.title'), 
      desc: t('story.values.2.desc') 
    },
    { 
      icon: <Users className="w-7 h-7" />, 
      title: t('story.values.3.title'), 
      desc: t('story.values.3.desc') 
    },
    { 
      icon: <TrendingUp className="w-7 h-7" />, 
      title: t('story.values.4.title'), 
      desc: t('story.values.4.desc') 
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('nav.story')} — Nordhessen Automobile</title>
        <meta name="description" content={t('story.hero.subtitle')} />
      </Helmet>

      <div className="bg-[#0a0a0a] min-h-screen">

        {/* ══ HERO ══ */}
        <section className="relative pt-36 pb-28 overflow-hidden flex items-center">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" 
            />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Speed Light Streaks mimicking passing cars */}
            <motion.div
              initial={{ x: '-100vw', opacity: 0 }}
              animate={{ x: '100vw', opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, ease: 'linear', repeat: Infinity, repeatDelay: 3 }}
              className="absolute top-[30%] left-0 w-[50vw] h-1 bg-gradient-to-r from-transparent via-red-500/60 to-transparent blur-[2px] transform -rotate-[10deg] pointer-events-none"
            />
            <motion.div
              initial={{ x: '-100vw', opacity: 0 }}
              animate={{ x: '100vw', opacity: [0, 1, 0] }}
              transition={{ duration: 3.5, ease: 'linear', repeat: Infinity, repeatDelay: 2, delay: 1 }}
              className="absolute top-[70%] left-0 w-[40vw] h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px] transform -rotate-[15deg] pointer-events-none"
            />
          </div>
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Scrolling background text */}
          <div className="absolute top-[60%] -translate-y-1/2 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0 mix-blend-overlay">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
              className="inline-flex text-[15rem] font-black tracking-tighter text-white"
            >
              <span className="px-10">TRUST • PERFORMANCE • QUALITY • EXCELLENCE</span>
              <span className="px-10">TRUST • PERFORMANCE • QUALITY • EXCELLENCE</span>
            </motion.div>
          </div>

          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-8">
                  <Clock className="w-3.5 h-3.5" />
                  {t('story.hero.badge')}
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none text-white mb-8">
                  {t('story.hero.title1')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                    {t('story.hero.title2')}
                  </span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                  {t('story.hero.subtitle')}
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ FOUNDING STORY ══ */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 border-t border-white/[0.04]" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <FadeUp className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                  <div className="w-8 h-px bg-red-500" />
                  {t('story.origins.badge')}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter leading-tight mb-8">
                  {t('story.origins.title')}
                </h2>
                <div className="space-y-5 text-gray-400 leading-relaxed">
                  <p>{t('story.origins.p1')}</p>
                  <p>{t('story.origins.p2')}</p>
                  <p className="text-white/90 font-medium border-l-2 border-red-500 pl-5">
                    {t('story.origins.quote')}
                  </p>
                </div>
                <div className="flex gap-10 mt-10 pt-10 border-t border-white/[0.06]">
                  {[
                    { val: '2008', label: t('story.origins.stat1.label') },
                    { val: '500+', label: t('story.origins.stat2.label') },
                    { val: '15+', label: t('story.origins.stat3.label') },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <div className="text-3xl font-display font-black text-white tracking-tighter">{val}</div>
                      <div className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeIn delay={0.15} className="order-1 lg:order-2">
                <div className="relative">
                  <ImageBox label={t('story.origins.image_label')} aspect="aspect-[4/3]" className="w-full" />
                  {/* Floating accent card */}
                  <div className="absolute -bottom-6 -left-6 bg-[#111111]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">Kassel, DE</div>
                        <div className="text-gray-500 text-[10px] tracking-wider uppercase">Sandershäuser Str. 87a</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══ PHILOSOPHY ══ */}
        <section className="py-28 relative overflow-hidden border-t border-white/[0.04]">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
          </div>
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <FadeUp className="text-center mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t('story.phil.badge')}
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter leading-tight mb-6">
                {t('story.phil.title1')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                  {t('story.phil.title2')}
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {t('story.phil.subtitle')}
              </p>
            </FadeUp>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeUp delay={0.1}>
                <div className="group p-10 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-red-500/20 hover:from-red-500/[0.05] hover:to-red-500/[0.02] transition-all duration-700">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-500">
                    <ShieldCheck className="w-8 h-8 text-red-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tight">
                    {t('story.phil.1.title')}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {t('story.phil.1.desc')}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{t('story.phil.1.link')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="group p-10 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-red-500/20 hover:from-red-500/[0.05] hover:to-red-500/[0.02] transition-all duration-700">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-500">
                    <Users className="w-8 h-8 text-red-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tight">
                    {t('story.phil.2.title')}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {t('story.phil.2.desc')}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{t('story.phil.2.link')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="group p-10 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-red-500/20 hover:from-red-500/[0.05] hover:to-red-500/[0.02] transition-all duration-700">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-500">
                    <Star className="w-8 h-8 text-red-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tight">
                    {t('story.phil.3.title')}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {t('story.phil.3.desc')}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{t('story.phil.3.link')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="group p-10 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-red-500/20 hover:from-red-500/[0.05] hover:to-red-500/[0.02] transition-all duration-700">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-500">
                    <TrendingUp className="w-8 h-8 text-red-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tight">
                    {t('story.phil.4.title')}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {t('story.phil.4.desc')}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{t('story.phil.4.link')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Philosophy Quote */}
            <FadeUp delay={0.5} className="mt-20">
              <div className="max-w-4xl mx-auto p-12 rounded-[2.5rem] border border-red-500/20 bg-gradient-to-br from-red-500/[0.08] to-red-500/[0.03] relative overflow-hidden">
                <div className="absolute top-8 left-8 text-red-500/20 text-8xl font-serif leading-none">"</div>
                <div className="absolute bottom-8 right-8 text-red-500/20 text-8xl font-serif leading-none rotate-180">"</div>
                <div className="relative z-10 text-center">
                  <p className="text-2xl md:text-3xl font-display font-bold text-white leading-relaxed mb-6">
                    {t('story.phil.quote')}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-red-500/40" />
                    <span className="text-sm text-red-400 tracking-[0.2em] uppercase font-bold">
                      Nordhessen Automobile
                    </span>
                    <div className="h-px w-12 bg-red-500/40" />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ TIMELINE ══ */}
        <section className="py-32 relative overflow-hidden bg-[#070707]">
          <div className="absolute inset-0 border-t border-white/[0.04]" />
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-red-500/4 rounded-full blur-[150px] pointer-events-none" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <FadeUp className="text-center mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                <Award className="w-3.5 h-3.5" />
                {t('story.milestones.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter">
                {t('story.milestones.title')}
              </h2>
            </FadeUp>

            {/* Timeline */}
            <div className="relative max-w-5xl mx-auto">
              {/* Central line — hidden on mobile, shown md+ */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent -translate-x-1/2" />

              <div className="space-y-16 md:space-y-0">
                {milestones.map((m) => {
                  const isLeft = m.side === 'left';
                  return (
                    <FadeUp key={m.year} delay={0.1} className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center md:mb-20 last:mb-0">
                      {/* Year node on center line */}
                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center">
                        <div className="w-14 h-14 rounded-full border-2 border-red-500/40 bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                          <span className="text-red-500 font-black text-xs tracking-wider">{m.year}</span>
                        </div>
                      </div>

                      {/* Left column content */}
                      <div className={`${isLeft ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16'}`}>
                        {isLeft ? (
                          /* Text on left */
                          <div className="space-y-4">
                            {/* Mobile year */}
                            <div className="md:hidden flex items-center gap-3 mb-2">
                              <span className="w-8 h-8 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center text-red-500 font-black text-[10px]">{m.year.slice(2)}</span>
                              <span className="text-red-500 text-xs tracking-widest font-bold">{m.year}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">{m.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{m.desc}</p>
                          </div>
                        ) : (
                          /* Image on left */
                          <FadeIn delay={0.2}>
                            <ImageBox label={m.image} aspect="aspect-[4/3]" />
                          </FadeIn>
                        )}
                      </div>

                      {/* Right column content */}
                      <div className={`mt-8 md:mt-0 ${isLeft ? 'md:pl-16 md:order-2' : 'md:pr-16 md:text-right'}`}>
                        {isLeft ? (
                          /* Image on right */
                          <FadeIn delay={0.2}>
                            <ImageBox label={m.image} aspect="aspect-[4/3]" />
                          </FadeIn>
                        ) : (
                          /* Text on right */
                          <div className="space-y-4">
                            <div className="md:hidden flex items-center gap-3 mb-2">
                              <span className="w-8 h-8 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center text-red-500 font-black text-[10px]">{m.year.slice(2)}</span>
                              <span className="text-red-500 text-xs tracking-widest font-bold">{m.year}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">{m.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{m.desc}</p>
                          </div>
                        )}
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 border-t border-white/[0.04]" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <FadeUp className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                <Star className="w-3.5 h-3.5" />
                {t('story.values.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-5">
                {t('story.values.title')}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {t('story.values.subtitle')}
              </p>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((v, i) => (
                <FadeUp key={v.title} delay={i * 0.1}>
                  <div className="group h-full p-8 rounded-[1.75rem] border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-500/20 transition-all duration-500 relative overflow-hidden">
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/[0.05] group-hover:to-transparent transition-all duration-700 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-red-400 group-hover:text-white group-hover:bg-red-500 transition-all duration-500 border border-white/[0.06] group-hover:border-red-500 group-hover:scale-110" style={{ background: 'rgba(239,68,68,0.07)' }}>
                        {v.icon}
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                        {v.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{v.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TEAM IMAGE GALLERY ══ */}
        <section className="py-24 relative overflow-hidden bg-[#070707]">
          <div className="absolute inset-0 border-t border-white/[0.04]" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <FadeUp className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                <Users className="w-3.5 h-3.5" />
                {t('story.team.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-4">
                {t('story.team.title')}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                {t('story.team.subtitle')}
              </p>
            </FadeUp>

            {/* Gallery grid */}
            <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
              <FadeIn delay={0.05} className="col-span-12 md:col-span-7">
                <ImageBox label={t('story.team.label.team')} aspect="aspect-[16/9]" className="h-full min-h-[240px]" />
              </FadeIn>
              <FadeIn delay={0.1} className="col-span-12 md:col-span-5 flex flex-col gap-4">
                <ImageBox label={t('story.team.label.showroom')} aspect="aspect-[4/3]" className="flex-1 min-h-[140px]" />
                <ImageBox label={t('story.team.label.consult')} aspect="aspect-[4/3]" className="flex-1 min-h-[140px]" />
              </FadeIn>
              <FadeIn delay={0.15} className="col-span-12 sm:col-span-4">
                <ImageBox label={t('story.team.label.work')} aspect="aspect-square" />
              </FadeIn>
              <FadeIn delay={0.2} className="col-span-12 sm:col-span-4">
                <ImageBox label={t('story.team.label.handover')} aspect="aspect-square" />
              </FadeIn>
              <FadeIn delay={0.25} className="col-span-12 sm:col-span-4">
                <ImageBox label={t('story.team.label.loc')} aspect="aspect-square" />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══ AWARDS / TRUST BADGES ══ */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 border-t border-white/[0.04]" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Award className="w-8 h-8" />, val: '500+', label: t('story.badges.1.label') },
                { icon: <ShieldCheck className="w-8 h-8" />, val: '100%', label: t('story.badges.2.label') },
                { icon: <Clock className="w-8 h-8" />, val: '15+', label: t('story.badges.3.label') },
              ].map(({ icon, val, label }, i) => (
                <FadeUp key={label} delay={i * 0.12}>
                  <div className="group flex items-center gap-5 p-7 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-red-500/20 hover:bg-white/[0.04] transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-red-400 group-hover:text-white group-hover:bg-red-500 transition-all duration-500 border border-white/[0.06] group-hover:border-red-500 flex-shrink-0" style={{ background: 'rgba(239,68,68,0.07)' }}>
                      {icon}
                    </div>
                    <div>
                      <div className="text-3xl font-display font-black text-white tracking-tighter">{val}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="py-32 relative overflow-hidden bg-[#050505] border-t border-white/[0.05]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[700px] h-[400px] bg-red-500/8 rounded-full blur-[120px]" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

          <div className="container mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
            <FadeUp>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs tracking-[0.25em] uppercase font-bold mb-10">
                {t('story.cta.badge')}
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none mb-6">
                {t('story.cta.title1')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                  {t('story.cta.title2')}
                </span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-gray-400 mb-14 max-w-xl mx-auto font-light leading-relaxed">
                {t('story.cta.subtitle')}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                to="/fahrzeuge"
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-full font-bold text-white text-lg transition-all duration-500 relative"
                style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 0 40px rgba(239,68,68,0.3)' }}
              >
                <div className="absolute inset-0 rounded-full border border-white/20" />
                <span>{t('story.cta.button')}</span>
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500 group-hover:text-red-600">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </FadeUp>
          </div>
        </section>

      </div>
    </>
  );
}
