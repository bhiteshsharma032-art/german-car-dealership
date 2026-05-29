import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Euro,
  CreditCard,
  BadgeCheck,
  Star,
  Sparkles,
  Car,
} from 'lucide-react';
import ScrollImageSequence from '../../components/ScrollImageSequence';
import { carService, Car as CarType } from '../../services/carService';
import VehicleCard from '../../components/inventory/VehicleCard';
import ExpandableText from '../../components/ui/ExpandableText';
import { useLanguage } from '../../contexts/LanguageContext';



/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ Fade-Up Animation Wrapper ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ Magnetic Wrapper ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ Main Component ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export default function Home() {
  const { t } = useLanguage();
  const [featuredCars, setFeaturedCars] = useState<CarType[]>([]);
  const [heroCars, setHeroCars] = useState<CarType[]>([]);
  const [availableBrands, setAvailableBrands] = useState<{ name: string; logo: string; dark?: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  // Brand logos via verified direct Wikimedia Commons SVG URLs.
  // Each URL was hand-checked to render natively in browsers.
  // dark === logo is mostly black/dark and needs to be inverted to white on the dark cards.
  const BRAND_DATA: Record<string, { logo: string; dark?: boolean }> = {
    'audi':           { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg', dark: true },
    'bmw':            { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
    'mercedes-benz':  { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg', dark: true },
    'mercedes':       { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg', dark: true },
    'porsche':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Porsche_Crest.svg' },
    'volkswagen':     { logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg' },
    'vw':             { logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg' },
    'skoda':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/%C5%A0koda_Auto_logo_%282016%29.svg' },
    'škoda':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/%C5%A0koda_Auto_logo_%282016%29.svg' },
    'seat':           { logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/SEAT_Logo_2012.svg', dark: true },
    'cupra':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/CUPRA_Logo_NEW.svg', dark: true },
    'ford':           { logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg' },
    'opel':           { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Opel_2017.svg' },
    'mini':           { logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/MINI_logo.svg', dark: true },
    'toyota':         { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg', dark: true },
    'lexus':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Lexus_division_emblem.svg', dark: true },
    'honda':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg', dark: true },
    'mazda':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Mazda_logo_with_emblem.svg', dark: true },
    'nissan':         { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg' },
    'hyundai':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg', dark: true },
    'kia':            { logo: 'https://upload.wikimedia.org/wikipedia/commons/1/14/KIA_logo3.svg', dark: true },
    'renault':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Renault_2021.svg' },
    'peugeot':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Peugeot_2021_Logo.svg' },
    'citroen':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Citroen_2022.svg' },
    'citroën':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Citroen_2022.svg' },
    'fiat':           { logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/FIAT_logo_2021.svg' },
    'volvo':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Volvo_Cars_logo.svg' },
    'jaguar':         { logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Jaguar_2012_logo.svg', dark: true },
    'land rover':     { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Land_Rover_logo2.svg', dark: true },
    'tesla':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg' },
    'alfa romeo':     { logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Logo_of_Alfa_Romeo.svg' },
    'maserati':       { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Logo_of_Maserati.svg' },
    'ferrari':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Ferrari-Logo.svg' },
    'lamborghini':    { logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Lamborghini_Logo.svg', dark: true },
    'bentley':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Bentley_logo.svg', dark: true },
    'jeep':           { logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Jeep_wordmark.svg', dark: true },
    'dodge':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Dodge.svg', dark: true },
    'chevrolet':      { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Chevrolet.svg' },
    'mitsubishi':     { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Mitsubishi_logo.svg' },
    'subaru':         { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Subaru_logo.svg' },
    'suzuki':         { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Suzuki_logo_2.svg' },
    'smart':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Smart_logo.svg', dark: true },
    'dacia':          { logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Dacia_logo_2021.svg', dark: true },
    'mclaren':        { logo: 'https://upload.wikimedia.org/wikipedia/en/6/68/McLaren_Racing_logo.svg' },
    'aston martin':   { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Aston_Martin_logo.svg', dark: true },
    'rolls-royce':    { logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Rolls-Royce_Motor_Cars_logo.svg', dark: true },
    'genesis':        { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Genesis_division_emblem.svg', dark: true },
    'infiniti':       { logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Infiniti.svg', dark: true },
    'polestar':       { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Polestar_logo.svg', dark: true },
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, brandsRes] = await Promise.all([
          carService.getAllCars({ limit: 50 }),
          carService.getBrandsWithCounts(),
        ]);

        if (carsRes.success && carsRes.data) {
          const sortedFeatured = [...carsRes.data].sort((a, b) => (b.isExclusive ? 1 : 0) - (a.isExclusive ? 1 : 0));
          setFeaturedCars(sortedFeatured.slice(0, 4));
          
          const sortedNewest = [...carsRes.data].sort((a, b) => b.year - a.year);
          const newestBMW = sortedNewest.find(c => c.brand.toLowerCase() === 'bmw');
          const newestPremium = sortedNewest.filter(c => c.id !== newestBMW?.id && ['bmw', 'mercedes-benz', 'mercedes', 'audi', 'porsche'].includes(c.brand.toLowerCase()));
          
          const hero1 = newestBMW || sortedNewest[0];
          const hero2 = newestPremium[0] || sortedNewest.find(c => c.id !== hero1?.id) || sortedNewest[1];
          
          setHeroCars([hero1, hero2].filter(Boolean) as CarType[]);
        }

        if (brandsRes && brandsRes.length > 0) {
          const dynamicBrands = brandsRes
            .filter((b) => !!BRAND_DATA[b.brand.toLowerCase()])
            .map((b) => {
              const meta = BRAND_DATA[b.brand.toLowerCase()];
              return { name: b.brand, logo: meta.logo, dark: meta.dark };
            });
          setAvailableBrands(dynamicBrands);
        } else {
          const fallbackKeys = ['audi', 'bmw', 'mercedes-benz', 'porsche', 'volkswagen', 'skoda', 'seat', 'opel', 'ford', 'toyota', 'renault', 'peugeot'];
          setAvailableBrands(fallbackKeys.map((k) => {
            const meta = BRAND_DATA[k];
            const display = k === 'mercedes-benz' ? 'Mercedes-Benz' : k.charAt(0).toUpperCase() + k.slice(1);
            return { name: display, logo: meta.logo, dark: meta.dark };
          }));
        }
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('home.features.q.title'),
      desc: t('home.features.q.desc'),
    },
    {
      icon: <Euro className="w-6 h-6" />,
      title: t('home.features.c.title'),
      desc: t('home.features.c.desc'),
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: t('home.features.g.title'),
      desc: t('home.features.g.desc'),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: t('home.features.f.title'),
      desc: t('home.features.f.desc'),
    },
  ];

  const stats = [
    { value: '500+', label: t('home.stats.customers') },
    { value: '10+', label: t('home.stats.experience') },
    { value: '100%', label: t('home.stats.quality') },
  ];

  return (
    <>
      <Helmet>
        <title>Nordhessen Automobile — Ihr Partner für Premium-Fahrzeuge</title>
        <meta
          name="description"
          content={t('home.hero.subtitle')}
        />
      </Helmet>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ SCROLL IMAGE HERO ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <div className="relative z-0 bg-[#1a1a1f]">
        <ScrollImageSequence frameCount={192} folderPath="/frames-webp" filePrefix="" fileExtension=".webp" padLength={4} />
      </div>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ BRAND SHOWCASE ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-[#0e0e0e]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239,68,68,0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp className="text-center mb-20">
            <span className="section-label mb-4 inline-flex px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 text-[10px] tracking-[0.2em] uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              {t('home.brands.label')}
            </span>
            <h2 className="section-title mb-6">
              {t('home.brands.title')}
            </h2>
            <p className="section-subtitle mx-auto max-w-xl">
              {t('home.brands.subtitle')}
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            {availableBrands.map((brand, i) => (
              <FadeUp key={brand.name} delay={Math.min(i * 0.05, 0.5)}>
                <Magnetic>
                  <Link
                    to={`/fahrzeuge?brand=${brand.name}`}
                    className="group relative w-full aspect-square rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col items-center justify-center transition-all duration-500 border border-white/[0.08] hover:border-red-500/40 bg-[#141414]/90 hover:bg-[#1a1a1a] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] focus:outline-none focus:ring-2 focus:ring-red-500/50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 h-12 sm:h-14 md:h-16 w-full flex items-center justify-center mb-2 sm:mb-3">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-2xl"
                        style={brand.dark ? { filter: 'brightness(0) invert(1)' } : undefined}
                        onError={(e) => {
                          // Fallback chain: Wikimedia fail → carlogos.org → Clearbit → favicon
                          const img = e.currentTarget;
                          const slug = brand.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                          const step = parseInt(img.dataset.fallbackStep || '0', 10);
                          if (step === 0) {
                            img.dataset.fallbackStep = '1';
                            img.src = `https://www.carlogos.org/car-logos/${slug}-logo.png`;
                          } else if (step === 1) {
                            img.dataset.fallbackStep = '2';
                            img.src = `https://logo.clearbit.com/${slug.replace(/-/g, '')}.com`;
                          } else if (step === 2) {
                            img.dataset.fallbackStep = '3';
                            img.src = `https://www.google.com/s2/favicons?domain=${slug.replace(/-/g, '')}.com&sz=128`;
                          } else {
                            img.style.display = 'none';
                          }
                        }}
                      />
                    </div>

                    <span className="relative z-10 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gray-500 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                      {brand.name}
                    </span>
                  </Link>
                </Magnetic>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ PREMIUM SERVICES ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <section className="py-20 sm:py-32 relative bg-[#111111] overflow-hidden">
        <div className="absolute inset-0 border-t border-white/[0.04]" />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp className="text-center mb-20">
            <span className="section-label mb-4 inline-flex px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 text-[10px] tracking-[0.2em] uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              {t('home.services.label')}
            </span>
            <h2 className="section-title mb-6">{t('home.services.title')}</h2>
            <p className="section-subtitle mx-auto max-w-xl">
              {t('home.services.subtitle')}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: t('home.services.fin.title'),
                desc: t('home.services.fin.desc'),
              },
              {
                icon: <BadgeCheck className="w-8 h-8" />,
                title: t('home.services.gar.title'),
                desc: t('home.services.gar.desc'),
              },
              {
                icon: <Euro className="w-8 h-8" />,
                title: t('home.services.trade.title'),
                desc: t('home.services.trade.desc'),
              }
            ].map((service, i) => (
              <FadeUp key={service.title} delay={i * 0.15} className="h-full">
                <div className="group relative h-full bg-[#181818] rounded-[2rem] p-8 sm:p-10 border border-white/[0.05] hover:border-red-500/30 transition-all duration-500 hover:bg-[#1c1c1c] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-500">
                    <div className="text-red-500 group-hover:text-white transition-colors duration-500">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{service.title}</h3>
                  <p className="relative z-10 text-sm sm:text-base text-gray-400 leading-relaxed font-light">{service.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ STATS BAR ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <section className="py-16 sm:py-24 relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 border-y border-white/[0.06]" />
        
        <div className="absolute -left-40 top-0 w-80 h-full bg-red-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-40 top-0 w-80 h-full bg-red-500/5 blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.15} className="text-center md:px-8 pt-8 md:pt-0 first:pt-0">
                <div 
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 tracking-tighter"
                  style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {stat.value}
                </div>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.3em] font-semibold">{stat.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ FEATURED VEHICLES ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-[#111111]">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-6">
              <div>
                <span className="section-label mb-4 inline-flex">
                  <Car className="w-3.5 h-3.5" />
                  {t('home.featured.label')}
                </span>
                <h2 className="section-title">{t('home.featured.title')}</h2>
                <p className="section-subtitle mt-3">
                  {t('home.featured.subtitle')}
                </p>
              </div>
              <Link
                to="/fahrzeuge"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/[0.04] border border-white/[0.06] text-gray-300 hover:text-white hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 group whitespace-nowrap"
              >
                {t('home.featured.viewAll')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </FadeUp>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 rounded-xl border-2 border-red-500/20 border-t-blue-500 animate-spin" />
            </div>
          ) : featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredCars.map((vehicle, i) => (
                <FadeUp key={vehicle.id} delay={i * 0.1}>
                  <VehicleCard
                    id={vehicle.id}
                    make={vehicle.brand}
                    model={vehicle.model}
                    title={vehicle.title || `${vehicle.brand} ${vehicle.model}`}
                    price={{
                      amount: vehicle.price,
                      formatted: vehicle.priceFormatted || `${vehicle.price.toLocaleString('de-DE')} Γé¼`,
                    }}
                    netPrice={vehicle.netPrice}
                    netPriceFormatted={vehicle.netPriceFormatted}
                    isVatable={vehicle.isVatable}
                    mileage={{
                      formatted: vehicle.mileageFormatted || `${vehicle.mileage.toLocaleString('de-DE')} km`,
                    }}
                    firstRegistration={`${vehicle.year}-01-01`}
                    power={{
                      formatted: vehicle.powerFormatted || `${vehicle.horsePower} PS`,
                    }}
                    fuelType={vehicle.fuelType}
                    transmission={vehicle.transmission}
                    image={vehicle.images[0]}
                    images={vehicle.images}
                    isNew={new Date(vehicle.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
                    isExclusive={vehicle.isExclusive}
                    hasFinancing={true}
                  />
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              {t('home.no_cars')}
            </div>
          )}

          <FadeUp className="mt-10 sm:hidden flex justify-center">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                boxShadow: '0 0 20px rgba(239,68,68,0.15)',
              }}
            >
              {t('home.featured.viewAll')} <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ ABOUT US / PHILOSOPHIE ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <section id="philosophie" className="py-20 sm:py-32 relative overflow-hidden bg-[#0c0c0c]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none blur-3xl" />
        
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <FadeUp className="w-full lg:w-1/2">
              <div className="relative h-[500px] sm:h-[600px] w-full">
                {heroCars.length >= 2 ? (
                  <>
                    <div className="absolute top-0 right-0 w-[90%] sm:w-[85%] h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden border border-white/[0.04] shadow-2xl z-20 group">
                      <div className="absolute inset-0 bg-red-500 mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-10" />
                      <img 
                        src={heroCars[0].images[0]} 
                        alt={heroCars[0].brand} 
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                      />
                    </div>
                    <div className="absolute bottom-4 left-0 w-[80%] sm:w-[75%] h-[240px] sm:h-[320px] rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-30 group ring-4 ring-[#0c0c0c]">
                      <div className="absolute inset-0 bg-red-500 mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-10" />
                      <img 
                        src={heroCars[1].images[0]} 
                        alt={heroCars[1].brand} 
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                      />
                    </div>
                  </>
                ) : heroCars.length === 1 ? (
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/[0.04] shadow-2xl group">
                    <img 
                      src={heroCars[0].images[0]} 
                      alt={heroCars[0].brand} 
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                     <Car className="w-20 h-20 text-white/10" />
                  </div>
                )}
                
                {/* Floating Tech Label */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 sm:-left-6 z-40 backdrop-blur-xl bg-[#0a0a0a]/90 border border-white/10 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl flex items-center gap-3 sm:gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-red-500/30 flex items-center justify-center bg-red-500/10">
                    <ShieldCheck className="text-red-500 w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-[11px] sm:text-[15px] tracking-widest uppercase mb-0.5 sm:mb-1">{t('home.features.q.title').split(' ')[0]}</div>
                    <div className="text-white/50 text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase">{t('home.features.q.title').split(' ').slice(1).join(' ')}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
            
            {/* Text side */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
              <FadeUp>
                <span className="section-label mb-6 inline-flex px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 text-[10px] tracking-[0.2em] uppercase font-bold">
                  {t('home.phi.label')}
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 sm:mb-8 tracking-tighter leading-[1.1]">
                  {t('home.phi.title')}
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <ExpandableText maxLines={5} className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed font-light">
                  {t('home.phi.desc1')}
                </ExpandableText>
                <ExpandableText maxLines={4} className="text-sm sm:text-base text-gray-500 mb-10 sm:mb-12 leading-relaxed">
                  {t('home.phi.desc2')}
                </ExpandableText>
              </FadeUp>
              
              <FadeUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-10 pb-4">
                  <div className="border-l-[3px] border-red-500 pl-5 py-2">
                    <div className="text-white font-black text-2xl mb-2">{t('home.phi.live')}</div>
                    <div className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-bold">{t('home.phi.live_desc')}</div>
                  </div>
                  <div className="border-l-[3px] border-red-500 pl-5 py-2">
                    <div className="text-white font-black text-2xl mb-2">{t('home.phi.transparency')}</div>
                    <div className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-bold">{t('home.phi.transparency_desc')}</div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ WHY CHOOSE US ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-[#161616]">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp className="text-center mb-16">
            <span className="section-label mb-4 inline-flex">
              <Star className="w-3.5 h-3.5" />
              {t('home.why.label')}
            </span>
            <h2 className="section-title mb-4">
              {t('home.why.title')}
            </h2>
            <p className="section-subtitle mx-auto">
              {t('home.why.subtitle')}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FadeUp key={feature.title} delay={i * 0.1}>
                <div className="group p-7 rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-500/15 transition-all duration-500 h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 text-red-400"
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.12)',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ FINAL CTA BANNER ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <section className="py-40 relative overflow-hidden bg-[#050505] border-t border-white/[0.05]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#000000] z-10 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-black/80 to-[#0a0a0a] z-10 opacity-90" />
          <img 
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop" 
            alt="Sports car abstract"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-red-500 to-transparent z-20 opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[200px] bg-red-500/20 blur-[100px] pointer-events-none z-10" />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs tracking-[0.25em] uppercase font-bold mb-10 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              {t('home.cta.label')}
            </span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-6 tracking-tighter leading-[1.05]" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
              {t('home.cta.title1')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">{t('home.cta.title2')}</span>
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('home.cta.desc')}
            </p>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/fahrzeuge"
                className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full font-bold text-white transition-all duration-500 text-lg hover:pr-8"
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  boxShadow: '0 0 40px rgba(239,68,68,0.3)',
                }}
              >
                <div className="absolute inset-0 rounded-full border border-white/20" />
                <span>{t('home.cta.button')}</span>
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500 group-hover:text-red-600">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
