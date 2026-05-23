import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { Award, Star, Heart, TrendingUp, ShieldCheck, ArrowRight, Users, Wrench, Car, Building2, GraduationCap, Truck, Target, Sparkles } from 'lucide-react';
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

export default function Geschichte() {
  const { t } = useLanguage();

  const timeline = [
    { year: '2014', key: '2014', icon: <Car className="w-5 h-5" /> },
    { year: '2015', key: '2015', icon: <Wrench className="w-5 h-5" /> },
    { year: '2016', key: '2016', icon: <Truck className="w-5 h-5" /> },
    { year: '2019/20', key: '2019_20', icon: <Users className="w-5 h-5" /> },
    { year: '2021', key: '2021', icon: <GraduationCap className="w-5 h-5" /> },
    { year: '2023', key: '2023', icon: <Building2 className="w-5 h-5" /> },
    { year: '2024', key: '2024', icon: <Wrench className="w-5 h-5" /> },
    { year: '2025', key: '2025', icon: <TrendingUp className="w-5 h-5" /> },
    { year: '2026', key: '2026', icon: <Award className="w-5 h-5" /> },
  ];

  const values = [
    { icon: <ShieldCheck className="w-7 h-7" />, key: 'trust' },
    { icon: <Heart className="w-7 h-7" />, key: 'service' },
    { icon: <Star className="w-7 h-7" />, key: 'quality' },
    { icon: <Car className="w-7 h-7" />, key: 'passion' },
    { icon: <Wrench className="w-7 h-7" />, key: 'assurance' },
    { icon: <Users className="w-7 h-7" />, key: 'team' },
  ];

  const todayTags = [
    t('story.today.tag.1'),
    t('story.today.tag.2'),
    t('story.today.tag.3'),
    t('story.today.tag.4'),
    t('story.today.tag.5'),
    t('story.today.tag.6'),
  ];

  return (
    <>
      <Helmet>
        <title>Über uns — Nordhessen Automobile</title>
        <meta name="description" content="Seit 2014 steht Nordhessen Automobile für hochwertige Gebrauchtwagen, professionelle Werkstatt- und Serviceleistungen und persönlichen Kundenservice in Kassel." />
      </Helmet>

      <div className="bg-[#0a0a0a] min-h-screen">

        {/* ══ HERO ══ */}
        <section className="relative pt-36 pb-28 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
          </div>
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-8">
                  <Award className="w-3.5 h-3.5" />
                  {t('story.hero.badge')}
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tighter leading-none text-white mb-8">
                  {t('story.hero.title.prefix')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">{t('story.hero.title.highlight')}</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
                  {t('story.hero.subtitle')}
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ VISION & MISSION ══ */}
        <section className="py-24 relative overflow-hidden border-t border-white/[0.04]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <FadeUp>
                <div className="p-8 md:p-10 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{t('story.vision.title')}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {t('story.vision.desc')}
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="p-8 md:p-10 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{t('story.mission.title')}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {t('story.mission.desc')}
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ══ */}
        <section className="py-28 relative overflow-hidden border-t border-white/[0.04]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <FadeUp className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                {t('story.timeline.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-5">
                {t('story.timeline.title')}
              </h2>
            </FadeUp>

            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-white/10 to-transparent" />

              {timeline.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-6 md:gap-12 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 border-2 border-[#0a0a0a] shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10" />
                    
                    {/* Content */}
                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                      <div className={`inline-flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-red-500 font-black text-lg">{item.year}</span>
                        <span className="text-red-400/60">{item.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{t(`story.timeline.${item.key}.title`)}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{t(`story.timeline.${item.key}.desc`)}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="py-28 relative overflow-hidden border-t border-white/[0.04]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <FadeUp className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
                <Star className="w-3.5 h-3.5" />
                {t('story.values.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-5">
                {t('story.values.title')}
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {values.map((v, i) => (
                <FadeUp key={v.key} delay={i * 0.1}>
                  <div className="group h-full p-8 rounded-[1.75rem] border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-500/20 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-red-400 group-hover:text-white group-hover:bg-red-500 transition-all duration-500 border border-white/[0.06] group-hover:border-red-500" style={{ background: 'rgba(239,68,68,0.07)' }}>
                      {v.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">{t(`story.values.${v.key}.title`)}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{t(`story.values.${v.key}.desc`)}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HEUTE ══ */}
        <section className="py-24 relative overflow-hidden border-t border-white/[0.04]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-8">
                  {t('story.today.title.prefix')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">{t('story.today.title.highlight')}</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-lg text-gray-400 leading-relaxed mb-10">
                  {t('story.today.desc')}
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {todayTags.map((item) => (
                    <div key={item} className="px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm text-gray-300 font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="py-32 relative overflow-hidden bg-[#050505] border-t border-white/[0.05]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[700px] h-[400px] bg-red-500/8 rounded-full blur-[120px]" />
          </div>
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
            <FadeUp>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none mb-6">
                {t('story.cta.title.prefix')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">{t('story.cta.title.highlight')}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-lg text-gray-400 mb-14 max-w-xl mx-auto font-light">
                {t('story.cta.subtitle')}
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/fahrzeuge" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all duration-500" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 0 40px rgba(239,68,68,0.3)' }}>
                  {t('story.cta.browse')} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/kontakt" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:border-red-500/40 transition-all duration-300">
                  {t('story.cta.contact')}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </>
  );
}
