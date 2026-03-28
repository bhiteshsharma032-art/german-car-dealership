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

const milestones = [
  {
    year: '2008',
    title: 'Die Gründung',
    titleEn: 'The Founding',
    desc: 'Nordhessen Automobile wurde in Kassel gegründet — mit einer klaren Vision: erstklassige Fahrzeuge zu fairen Preisen und mit absolutem Vertrauen anzubieten.',
    descEn: 'Nordhessen Automobile was founded in Kassel with a clear vision: to offer first-class vehicles at fair prices with absolute trust.',
    image: 'Gründungsjahr 2008',
    side: 'left',
  },
  {
    year: '2012',
    title: 'Erweiterung & Wachstum',
    titleEn: 'Expansion & Growth',
    desc: 'Unser erster großer Meilenstein: Die Erweiterung des Showrooms und die Einführung unserer Finanzierungsdienstleistungen. Über 100 zufriedene Kunden in diesem Jahr.',
    descEn: 'Our first major milestone: expanding the showroom and introducing our financing services. Over 100 satisfied customers that year.',
    image: 'Showroom 2012',
    side: 'right',
  },
  {
    year: '2016',
    title: 'Premium-Markenpartnerschaft',
    titleEn: 'Premium Brand Partnership',
    desc: 'Offizieller Händler für BMW, Mercedes-Benz und Audi. Wir setzen neue Standards für Qualität und Exklusivität in der Region Nordhessen.',
    descEn: 'Official dealer for BMW, Mercedes-Benz and Audi. We set new standards for quality and exclusivity in the Nordhessen region.',
    image: 'Partnerschaft 2016',
    side: 'left',
  },
  {
    year: '2020',
    title: 'Digitale Transformation',
    titleEn: 'Digital Transformation',
    desc: 'Launch unserer digitalen Plattform. Kunden können Fahrzeuge nun online durchsuchen, konfigurieren und direkt Kontakt aufnehmen — auch in herausfordernden Zeiten.',
    descEn: 'Launch of our digital platform. Customers can now browse vehicles online, configure them, and contact us directly — even in challenging times.',
    image: 'Digital 2020',
    side: 'right',
  },
  {
    year: '2024',
    title: 'Neue Ära',
    titleEn: 'A New Era',
    desc: 'Mit dem kompletten Relaunch unserer Marke und über 500 zufriedenen Kunden schreiben wir das nächste Kapitel. Nordhessen Automobile — für die nächste Generation.',
    descEn: 'With the complete relaunch of our brand and over 500 satisfied customers, we are writing the next chapter. Nordhessen Automobile — for the next generation.',
    image: 'Relaunch 2024',
    side: 'left',
  },
];

const values = [
  { 
    icon: <ShieldCheck className="w-7 h-7" />, 
    title: 'Vertrauen', 
    titleEn: 'Trust', 
    desc: 'Absolute Transparenz bei jedem Fahrzeug und jedem Preis. Keine versteckten Kosten, keine Überraschungen — nur ehrliche Beratung und faire Konditionen.', 
    descEn: 'Absolute transparency with every vehicle and every price. No hidden costs, no surprises — just honest advice and fair conditions.' 
  },
  { 
    icon: <Star className="w-7 h-7" />, 
    title: 'Qualität', 
    titleEn: 'Quality', 
    desc: 'Nur Fahrzeuge die unsere strengen Qualitätsstandards erfüllen. Jedes Auto wird sorgfältig geprüft und aufbereitet, bevor es zu Ihnen kommt.', 
    descEn: 'Only vehicles that meet our strict quality standards. Every car is carefully inspected and prepared before it reaches you.' 
  },
  { 
    icon: <Users className="w-7 h-7" />, 
    title: 'Kundennähe', 
    titleEn: 'Customer Focus', 
    desc: 'Persönliche Beratung auf Augenhöhe. Wir nehmen uns Zeit für Ihre Wünsche und begleiten Sie von der ersten Anfrage bis zur Fahrzeugübergabe.', 
    descEn: 'Personal advice at eye level. We take time for your needs and accompany you from the first inquiry to vehicle handover.' 
  },
  { 
    icon: <TrendingUp className="w-7 h-7" />, 
    title: 'Innovation', 
    titleEn: 'Innovation', 
    desc: 'Moderne Technologie trifft persönlichen Service. Digitale Prozesse für Ihre Bequemlichkeit, menschliche Expertise für Ihre Sicherheit.', 
    descEn: 'Modern technology meets personal service. Digital processes for your convenience, human expertise for your security.' 
  },
];

export default function Geschichte() {
  const { language } = useLanguage();
  const isDE = language === 'de';

  return (
    <>
      <Helmet>
        <title>{isDE ? 'Unsere Geschichte' : 'Our Story'} — Nordhessen Automobile</title>
        <meta name="description" content={isDE ? 'Die Geschichte von Nordhessen Automobile seit 2008 — Vertrauen, Qualität, Leidenschaft.' : 'The story of Nordhessen Automobile since 2008 — trust, quality, passion.'} />
      </Helmet>

      <div className="bg-[#0a0a0a] min-h-screen">

        {/* ══ HERO ══ */}
        <section className="relative pt-36 pb-28 overflow-hidden flex items-center">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
          </div>
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-500/8 text-red-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-8">
                  <Clock className="w-3.5 h-3.5" />
                  {isDE ? 'Seit 2008' : 'Since 2008'}
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none text-white mb-8">
                  {isDE ? 'Unsere' : 'Our'}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                    {isDE ? 'Geschichte' : 'Story'}
                  </span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                  {isDE
                    ? 'Mehr als 15 Jahre Leidenschaft, Vertrauen und Qualität. Entdecken Sie den Weg, der Nordhessen Automobile zu dem gemacht hat, was es heute ist.'
                    : 'More than 15 years of passion, trust and quality. Discover the journey that made Nordhessen Automobile what it is today.'}
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
                  {isDE ? 'Unsere Ursprünge' : 'Our Origins'}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter leading-tight mb-8">
                  {isDE ? 'Gegründet aus\nLeidenschaft.' : 'Founded from\nPassion.'}
                </h2>
                <div className="space-y-5 text-gray-400 leading-relaxed">
                  <p>
                    {isDE
                      ? 'Nordhessen-Automobile Seidler & Osmikhovsky GbR entstand 2008 aus einer gemeinsamen Überzeugung: Der Kauf eines Fahrzeugs soll kein Kompromiss sein. Qualität, Ehrlichkeit und persönliche Betreuung sollten im Mittelpunkt stehen.'
                      : 'Nordhessen-Automobile Seidler & Osmikhovsky GbR was founded in 2008 from a shared conviction: buying a vehicle should never be a compromise. Quality, honesty and personal service should be at the forefront.'}
                  </p>
                  <p>
                    {isDE
                      ? 'Was als kleines Unternehmen in Kassel begann, hat sich über die Jahre zu einem der angesehensten Autohäuser der Region entwickelt — mit über 500 zufriedenen Kunden und einem Ruf für absolute Verlässlichkeit.'
                      : 'What began as a small business in Kassel has grown over the years into one of the most respected dealerships in the region — with over 500 satisfied customers and a reputation for absolute reliability.'}
                  </p>
                  <p className="text-white/90 font-medium border-l-2 border-red-500 pl-5">
                    {isDE
                      ? 'Unsere Philosophie ist einfach: Wir verkaufen nicht nur Autos — wir schaffen Vertrauen, erfüllen Träume und bauen langfristige Beziehungen auf.'
                      : 'Our philosophy is simple: We don\'t just sell cars — we build trust, fulfill dreams and create long-term relationships.'}
                  </p>
                </div>
                <div className="flex gap-10 mt-10 pt-10 border-t border-white/[0.06]">
                  {[
                    { val: '2008', label: isDE ? 'Gegründet' : 'Founded' },
                    { val: '500+', label: isDE ? 'Kunden' : 'Customers' },
                    { val: '15+', label: isDE ? 'Jahre' : 'Years' },
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
                  <ImageBox label={isDE ? 'Gründungsmoment' : 'Founding Moment'} aspect="aspect-[4/3]" className="w-full" />
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
                {isDE ? 'Unsere Philosophie' : 'Our Philosophy'}
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter leading-tight mb-6">
                {isDE ? 'Mehr als nur' : 'More than just'}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                  {isDE ? 'Autoverkauf' : 'Car Sales'}
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {isDE
                  ? 'Bei Nordhessen Automobile geht es nicht nur um den Verkauf von Fahrzeugen. Es geht um Vertrauen, Partnerschaft und die Erfüllung Ihrer individuellen Mobilitätswünsche.'
                  : 'At Nordhessen Automobile, it\'s not just about selling vehicles. It\'s about trust, partnership and fulfilling your individual mobility needs.'}
              </p>
            </FadeUp>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeUp delay={0.1}>
                <div className="group p-10 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-red-500/20 hover:from-red-500/[0.05] hover:to-red-500/[0.02] transition-all duration-700">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-500">
                    <ShieldCheck className="w-8 h-8 text-red-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tight">
                    {isDE ? 'Transparenz als Standard' : 'Transparency as Standard'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {isDE
                      ? 'Wir glauben, dass Vertrauen die Grundlage jeder erfolgreichen Geschäftsbeziehung ist. Deshalb legen wir alle Karten auf den Tisch: vollständige Fahrzeughistorie, faire Preisgestaltung und ehrliche Beratung ohne Verkaufsdruck.'
                      : 'We believe that trust is the foundation of every successful business relationship. That\'s why we put all our cards on the table: complete vehicle history, fair pricing and honest advice without sales pressure.'}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{isDE ? 'Ehrlichkeit zahlt sich aus' : 'Honesty pays off'}</span>
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
                    {isDE ? 'Langfristige Partnerschaften' : 'Long-term Partnerships'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {isDE
                      ? 'Für uns endet die Beziehung nicht mit dem Verkauf. Wir begleiten Sie über Jahre hinweg — von der Finanzierung über die Wartung bis zum nächsten Fahrzeugwechsel. Ihre Zufriedenheit ist unser langfristiger Erfolg.'
                      : 'For us, the relationship doesn\'t end with the sale. We accompany you for years — from financing to maintenance to your next vehicle change. Your satisfaction is our long-term success.'}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{isDE ? 'Gemeinsam weiter' : 'Moving forward together'}</span>
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
                    {isDE ? 'Qualität ohne Kompromisse' : 'Quality Without Compromise'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {isDE
                      ? 'Jedes Fahrzeug durchläuft unsere mehrstufige Qualitätsprüfung. Wir akzeptieren nur das Beste und bereiten jedes Auto professionell auf. Ihr neues Fahrzeug soll Sie nicht nur heute, sondern auch morgen noch begeistern.'
                      : 'Every vehicle goes through our multi-stage quality inspection. We only accept the best and professionally prepare every car. Your new vehicle should excite you not just today, but tomorrow too.'}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{isDE ? 'Geprüfte Exzellenz' : 'Tested excellence'}</span>
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
                    {isDE ? 'Innovation mit Herz' : 'Innovation with Heart'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {isDE
                      ? 'Wir nutzen modernste Technologie für Ihre Bequemlichkeit — von der Online-Fahrzeugsuche bis zur digitalen Finanzierung. Aber hinter jedem Klick steht ein echter Mensch, der für Sie da ist.'
                      : 'We use cutting-edge technology for your convenience — from online vehicle search to digital financing. But behind every click is a real person who is there for you.'}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-bold group-hover:text-red-300 transition-colors duration-300">
                    <span>{isDE ? 'Digital & Persönlich' : 'Digital & Personal'}</span>
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
                    {isDE
                      ? 'Wir verkaufen nicht nur Autos. Wir erfüllen Träume, schaffen Vertrauen und bauen Beziehungen, die über Jahre halten.'
                      : 'We don\'t just sell cars. We fulfill dreams, build trust and create relationships that last for years.'}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-red-500/40" />
                    <span className="text-sm text-red-400 tracking-[0.2em] uppercase font-bold">
                      {isDE ? 'Nordhessen Automobile' : 'Nordhessen Automobile'}
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
                {isDE ? 'Meilensteine' : 'Milestones'}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter">
                {isDE ? 'Der Weg zum Erfolg' : 'The Road to Success'}
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
                            <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">{isDE ? m.title : m.titleEn}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{isDE ? m.desc : m.descEn}</p>
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
                            <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">{isDE ? m.title : m.titleEn}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{isDE ? m.desc : m.descEn}</p>
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
                {isDE ? 'Unsere Werte' : 'Our Values'}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-5">
                {isDE ? 'Was uns antreibt' : 'What Drives Us'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {isDE
                  ? 'Diese vier Säulen bilden das Fundament unserer Arbeit und prägen jeden Schritt unserer Kundenbeziehungen.'
                  : 'These four pillars form the foundation of our work and shape every step of our customer relationships.'}
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
                        {isDE ? v.title : v.titleEn}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{isDE ? v.desc : v.descEn}</p>
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
                {isDE ? 'Unser Team' : 'Our Team'}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-4">
                {isDE ? 'Menschen hinter der Marke' : 'People Behind the Brand'}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                {isDE
                  ? 'Unser Team aus leidenschaftlichen Automobilexperten steht Ihnen mit Fachwissen, Ehrlichkeit und persönlichem Engagement zur Seite.'
                  : 'Our team of passionate automotive experts supports you with expertise, honesty and personal commitment.'}
              </p>
            </FadeUp>

            {/* Gallery grid */}
            <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
              <FadeIn delay={0.05} className="col-span-12 md:col-span-7">
                <ImageBox label={isDE ? 'Team Nordhessen' : 'Team Photo'} aspect="aspect-[16/9]" className="h-full min-h-[240px]" />
              </FadeIn>
              <FadeIn delay={0.1} className="col-span-12 md:col-span-5 flex flex-col gap-4">
                <ImageBox label={isDE ? 'Showroom' : 'Showroom'} aspect="aspect-[4/3]" className="flex-1 min-h-[140px]" />
                <ImageBox label={isDE ? 'Beratung' : 'Consultation'} aspect="aspect-[4/3]" className="flex-1 min-h-[140px]" />
              </FadeIn>
              <FadeIn delay={0.15} className="col-span-12 sm:col-span-4">
                <ImageBox label={isDE ? 'Werkstatt' : 'Workshop'} aspect="aspect-square" />
              </FadeIn>
              <FadeIn delay={0.2} className="col-span-12 sm:col-span-4">
                <ImageBox label={isDE ? 'Fahrzeugübergabe' : 'Vehicle Handover'} aspect="aspect-square" />
              </FadeIn>
              <FadeIn delay={0.25} className="col-span-12 sm:col-span-4">
                <ImageBox label={isDE ? 'Standort Kassel' : 'Kassel Location'} aspect="aspect-square" />
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
                { icon: <Award className="w-8 h-8" />, val: '500+', label: isDE ? 'Zufriedene Kunden' : 'Satisfied Customers' },
                { icon: <ShieldCheck className="w-8 h-8" />, val: '100%', label: isDE ? 'Geprüfte Fahrzeuge' : 'Tested Vehicles' },
                { icon: <Clock className="w-8 h-8" />, val: '15+', label: isDE ? 'Jahre Erfahrung' : 'Years of Experience' },
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
                {isDE ? 'Werden Sie Teil unserer Geschichte' : 'Become Part of Our Story'}
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none mb-6">
                {isDE ? 'Ihr nächstes' : 'Your next'}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                  {isDE ? 'Kapitel.' : 'chapter.'}
                </span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-gray-400 mb-14 max-w-xl mx-auto font-light leading-relaxed">
                {isDE
                  ? 'Entdecken Sie unsere aktuellen Premium-Fahrzeuge und schreiben Sie Ihre eigene Erfolgsgeschichte.'
                  : 'Discover our current premium vehicles and write your own success story.'}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                to="/fahrzeuge"
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-full font-bold text-white text-lg transition-all duration-500 relative"
                style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', boxShadow: '0 0 40px rgba(239,68,68,0.3)' }}
              >
                <div className="absolute inset-0 rounded-full border border-white/20" />
                <span>{isDE ? 'Fahrzeuge entdecken' : 'Discover Vehicles'}</span>
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
