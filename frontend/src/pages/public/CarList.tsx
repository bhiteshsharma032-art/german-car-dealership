import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { X, Grid3x3, List, ChevronDown, SlidersHorizontal, Search, Car as CarIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { carService, Car } from '../../services/carService';
import { SearchParams } from '../../services/inventoryService';
import VehicleCard from '../../components/inventory/VehicleCard';
import FilterSidebar from '../../components/inventory/FilterSidebar';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { cn } from '../../utils/cn';

export default function CarList() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get('brand');

  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;
  
  const [filters, setFilters] = useState<SearchParams>({ make: initialBrand || undefined });
  const [filterOptions, setFilterOptions] = useState({
    brands: [] as string[],
    models: [] as string[],
    fuelTypes: ['Benzin', 'Diesel', 'Elektro', 'Hybrid', 'Plug-in-Hybrid'],
    transmissions: ['Automatik', 'Manuell', 'Halbautomatik'],
    bodyTypes: ['Limousine', 'Kombi', 'SUV', 'Coupé', 'Cabrio', 'Van', 'Kleinwagen'],
    colors: ['Schwarz', 'Weiß', 'Grau', 'Silber', 'Blau', 'Rot', 'Grün', 'Braun'],
  });

  useEffect(() => {
    loadVehicles();
    loadFilterOptions();
  }, []);

  useEffect(() => {
    const brand = searchParams.get('brand');
    if (brand) {
      setFilters(prev => ({ ...prev, make: brand }));
    } else {
      setFilters(prev => { const n = { ...prev }; delete n.make; return n; });
    }
  }, [searchParams]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [vehicles, filters, sortBy, searchQuery]);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const response = await carService.getAllCars({ limit: 1000 });
      if (response.success && response.data) {
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      } else {
        setVehicles([]);
        setFilteredVehicles([]);
      }
    } catch (err) {
      console.error('Error loading vehicles:', err);
      setVehicles([]);
      setFilteredVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const options = await carService.getFilterOptions();
      setFilterOptions(prev => ({
        ...prev,
        brands: options.brands as string[],
      }));
    } catch (err) {
      console.error('Error loading filter options:', err);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...vehicles];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        `${car.brand} ${car.model}`.toLowerCase().includes(query)
      );
    }
    if (filters.make) result = result.filter(car => car.brand === filters.make);
    if (filters.priceFrom) result = result.filter(car => car.price >= filters.priceFrom!);
    if (filters.priceTo) result = result.filter(car => car.price <= filters.priceTo!);
    if (filters.yearFrom) result = result.filter(car => car.year >= filters.yearFrom!);
    if (filters.yearTo) result = result.filter(car => car.year <= filters.yearTo!);
    if (filters.mileageFrom) result = result.filter(car => car.mileage >= filters.mileageFrom!);
    if (filters.mileageTo) result = result.filter(car => car.mileage <= filters.mileageTo!);
    if (filters.fuelType) result = result.filter(car => car.fuelType === filters.fuelType);
    if (filters.transmission) result = result.filter(car => car.transmission === filters.transmission);
    if (filters.bodyType) result = result.filter(car => car.bodyType === filters.bodyType);
    if (filters.powerFrom) result = result.filter(car => car.horsePower >= filters.powerFrom!);
    if (filters.powerTo) result = result.filter(car => car.horsePower <= filters.powerTo!);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'mileage': result.sort((a, b) => a.mileage - b.mileage); break;
      case 'year': result.sort((a, b) => b.year - a.year); break;
      case 'newest':
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    setFilteredVehicles(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Sort: cars with images first, then without
  const sortedForDisplay = [...filteredVehicles].sort((a, b) => {
    const aHasImg = a.images && a.images.length > 0 && a.images[0] ? 1 : 0;
    const bHasImg = b.images && b.images.length > 0 && b.images[0] ? 1 : 0;
    return bHasImg - aHasImg;
  });

  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => { setFilters({}); setSearchQuery(''); };

  const removeFilter = (key: keyof SearchParams) => {
    setFilters(prev => { const n = { ...prev }; delete n[key]; return n; });
  };

  const getActiveFiltersCount = () => Object.keys(filters).filter(key => filters[key as keyof SearchParams] !== undefined).length;

  const getActiveFilterChips = () => {
    const chips: { key: keyof SearchParams; label: string }[] = [];
    if (filters.make) chips.push({ key: 'make', label: `${t('inv.chip.make')}: ${filters.make}` });
    if (filters.priceFrom || filters.priceTo) chips.push({ key: 'priceFrom', label: `${t('inv.chip.price')}: ${filters.priceFrom || 0} - ${filters.priceTo || '∞'} €` });
    if (filters.yearFrom || filters.yearTo) chips.push({ key: 'yearFrom', label: `${t('inv.chip.year')}: ${filters.yearFrom || '0'} - ${filters.yearTo || t('inv.chip.today')}` });
    if (filters.fuelType) chips.push({ key: 'fuelType', label: `${t('inv.chip.fuel')}: ${t(`attr.fuel.${filters.fuelType}`)}` });
    if (filters.transmission) chips.push({ key: 'transmission', label: `${t('inv.chip.gear')}: ${t(`attr.trans.${filters.transmission}`)}` });
    if (filters.bodyType) chips.push({ key: 'bodyType', label: `${t('inv.chip.type')}: ${t(`attr.body.${filters.bodyType}`)}` });
    return chips;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block">
              <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 border border-white/[0.06]">
                <div className="h-6 w-20 bg-white/[0.05] rounded animate-pulse mb-6"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="mb-6">
                    <div className="h-5 w-24 bg-white/[0.05] rounded animate-pulse mb-3"></div>
                    <div className="h-10 w-full bg-white/[0.05] rounded-xl animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/[0.02] backdrop-blur-md rounded-3xl overflow-hidden border border-white/[0.06]">
                    <div className="aspect-[4/3] bg-white/[0.05] animate-pulse"></div>
                    <div className="p-6 space-y-5">
                      <div className="h-6 bg-white/[0.05] rounded animate-pulse"></div>
                      <div className="h-8 w-32 bg-white/[0.05] rounded animate-pulse"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-white/[0.05] rounded-xl animate-pulse"></div>
                        <div className="h-12 bg-white/[0.05] rounded-xl animate-pulse"></div>
                      </div>
                      <div className="h-12 bg-white/[0.05] rounded-xl animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('nav.vehicles')} - Nordhessen Automobile</title>
        <meta name="description" content={t('inv.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f]">
        <section className="relative overflow-hidden bg-gradient-to-b from-[#22222a] to-[#1a1a1f] pt-24 pb-8 border-b border-white/[0.04]">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ef4444]/30 to-transparent" />
          <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl w-full">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-100 mb-4 tracking-tight">
                {t('inv.hero.title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] to-[#f87171]">{t('inv.hero.title_part2')}</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 font-light max-w-xl mx-auto">
                {t('inv.hero.subtitle')}
              </p>
              <div className="relative group text-left">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="text"
                  placeholder={t('inv.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50 focus:border-[#ef4444] transition-all focus:bg-white/[0.04] shadow-glass"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-display font-bold text-gray-100 mb-1">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? t('inv.car') : t('inv.cars')}
              </h2>
              <p className="text-sm text-gray-400 font-light">
                {getActiveFiltersCount() > 0 ? t('inv.filtered') : t('inv.all')}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-xl px-5 py-3 pr-10 text-sm font-medium text-gray-200 hover:border-white/[0.15] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50 cursor-pointer transition-all"
                >
                  <option value="newest" className="bg-[#22222a]">{t('inv.sort.newest')}</option>
                  <option value="price-low" className="bg-[#22222a]">{t('inv.sort.price_asc')}</option>
                  <option value="price-high" className="bg-[#22222a]">{t('inv.sort.price_desc')}</option>
                  <option value="mileage" className="bg-[#22222a]">{t('inv.sort.mileage')}</option>
                  <option value="year" className="bg-[#22222a]">{t('inv.sort.year')}</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              <div className="flex bg-white/[0.03] backdrop-blur-md rounded-xl p-1 border border-white/[0.08]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2.5 rounded-lg transition-all',
                    viewMode === 'grid' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2.5 rounded-lg transition-all',
                    viewMode === 'list' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-3 bg-white/[0.03] backdrop-blur-md text-gray-200 rounded-xl hover:bg-white/[0.06] transition-all font-medium text-sm border border-white/[0.08]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t('inv.filter')}
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </motion.div>
          </div>

          {getActiveFiltersCount() > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-2 mb-8">
              {getActiveFilterChips().map((chip) => (
                <div key={chip.key} className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-300 rounded-xl text-sm font-medium border border-[#ef4444]/30">
                  <span>{chip.label}</span>
                  <button onClick={() => removeFilter(chip.key)} className="hover:text-red-100 transition-colors bg-white/5 rounded-full p-0.5" aria-label={`Remove ${chip.label} filter`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-white font-medium px-4 py-2 transition-colors">
                {t('inv.reset')}
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8">
            <aside className="hidden lg:block lg:col-span-1 xl:col-span-1 sticky top-24 self-start">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                filterOptions={filterOptions}
              />
            </aside>

            <div className="lg:col-span-3 xl:col-span-4">
              {filteredVehicles.length === 0 ? (
                <EmptyState
                  icon={<CarIcon className="w-12 h-12" />}
                  title={t('inv.empty.title')}
                  description={t('inv.empty.desc')}
                  action={{ label: t('inv.empty.action'), onClick: clearFilters }}
                />
              ) : (
                <>
                <motion.div layout className={cn('grid gap-6', viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1')}>
                  <AnimatePresence mode="popLayout">
                    {sortedForDisplay.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((vehicle, index) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4, delay: index * 0.03 }}
                        key={vehicle.id}
                      >
                        <VehicleCard
                          id={vehicle.id}
                          make={vehicle.brand}
                          model={vehicle.model}
                          title={vehicle.title || `${vehicle.brand} ${vehicle.model}`}
                          price={{ amount: vehicle.price, formatted: vehicle.priceFormatted || `${vehicle.price.toLocaleString('de-DE')} €` }}
                          netPrice={vehicle.netPrice}
                          netPriceFormatted={vehicle.netPriceFormatted}
                          isVatable={vehicle.isVatable}
                          mileage={{ formatted: vehicle.mileageFormatted || `${vehicle.mileage.toLocaleString('de-DE')} km` }}
                          firstRegistration={`${vehicle.year}-01-01`}
                          power={{ formatted: vehicle.powerFormatted || `${vehicle.horsePower} PS` }}
                          fuelType={vehicle.fuelType}
                          transmission={vehicle.transmission}
                          image={vehicle.images[0]}
                          images={vehicle.images}
                          isNew={new Date(vehicle.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
                          isExclusive={vehicle.isExclusive}
                          hasFinancing={true}
                          viewMode={viewMode}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {filteredVehicles.length > ITEMS_PER_PAGE && (
                  <div className="flex items-center justify-center gap-3 mt-12">
                    <button
                      onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={currentPage === 1}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-gray-300 hover:bg-white/[0.06] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      ← Zurück
                    </button>
                    
                    {Array.from({ length: Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={cn(
                          'w-10 h-10 rounded-xl text-sm font-bold transition-all',
                          currentPage === page
                            ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                            : 'border border-white/[0.08] bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white'
                        )}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => { setCurrentPage(p => Math.min(Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE), p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={currentPage >= Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE)}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-gray-300 hover:bg-white/[0.06] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      Weiter →
                    </button>
                  </div>
                )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative ml-auto w-full max-w-sm bg-[#1a1a1f]/95 backdrop-blur-xl flex flex-col h-full border-l border-white/[0.08]">
              <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
                <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-red-500" />
                  {t('inv.filter')}
                </h2>
                <button onClick={() => setShowMobileFilters(false)} className="w-8 h-8 flex items-center justify-center bg-white/[0.05] rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.1] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} filterOptions={filterOptions} />
              </div>
              <div className="p-6 border-t border-white/[0.08] flex gap-3 bg-[#22222a]">
                <Button variant="secondary" onClick={clearFilters} className="flex-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1]">{t('inv.reset')}</Button>
                <Button onClick={() => setShowMobileFilters(false)} className="flex-1 rounded-xl bg-red-500 hover:bg-[#dc2626] text-white">{t('inv.apply')}</Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
