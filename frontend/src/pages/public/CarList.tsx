import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { X, Grid3x3, List, ChevronDown, SlidersHorizontal, Search, Car as CarIcon } from 'lucide-react';
import { carService, Car } from '../../services/carService';
import { SearchParams } from '../../services/inventoryService';
import VehicleCard from '../../components/inventory/VehicleCard';
import FilterSidebar from '../../components/inventory/FilterSidebar';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { cn } from '../../utils/cn';

export default function CarList() {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<SearchParams>({});
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
    applyFiltersAndSort();
  }, [vehicles, filters, sortBy, searchQuery]);

  const loadVehicles = async () => {
    setLoading(true);
    
    try {
      const response = await carService.getAllCars({ limit: 100 });
      
      if (response.success && response.data) {
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      } else {
        // Show empty state instead of error
        setVehicles([]);
        setFilteredVehicles([]);
      }
    } catch (err) {
      console.error('Error loading vehicles:', err);
      // Show empty state instead of error
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

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        `${car.brand} ${car.model}`.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.make) {
      result = result.filter(car => car.brand === filters.make);
    }

    if (filters.priceFrom) {
      result = result.filter(car => car.price >= filters.priceFrom!);
    }

    if (filters.priceTo) {
      result = result.filter(car => car.price <= filters.priceTo!);
    }

    if (filters.yearFrom) {
      result = result.filter(car => car.year >= filters.yearFrom!);
    }

    if (filters.yearTo) {
      result = result.filter(car => car.year <= filters.yearTo!);
    }

    if (filters.mileageFrom) {
      result = result.filter(car => car.mileage >= filters.mileageFrom!);
    }

    if (filters.mileageTo) {
      result = result.filter(car => car.mileage <= filters.mileageTo!);
    }

    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }

    if (filters.transmission) {
      result = result.filter(car => car.transmission === filters.transmission);
    }

    if (filters.bodyType) {
      result = result.filter(car => car.bodyType === filters.bodyType);
    }

    if (filters.powerFrom) {
      result = result.filter(car => car.horsePower >= filters.powerFrom!);
    }

    if (filters.powerTo) {
      result = result.filter(car => car.horsePower <= filters.powerTo!);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredVehicles(result);
  };

  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const removeFilter = (key: keyof SearchParams) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).filter(key => filters[key as keyof SearchParams] !== undefined).length;
  };

  const getActiveFilterChips = () => {
    const chips: { key: keyof SearchParams; label: string }[] = [];

    if (filters.make) chips.push({ key: 'make', label: `Marke: ${filters.make}` });
    if (filters.priceFrom || filters.priceTo) {
      chips.push({
        key: 'priceFrom',
        label: `Preis: ${filters.priceFrom || 0} - ${filters.priceTo || '∞'} €`,
      });
    }
    if (filters.yearFrom || filters.yearTo) {
      chips.push({
        key: 'yearFrom',
        label: `Jahr: ${filters.yearFrom || '0'} - ${filters.yearTo || 'heute'}`,
      });
    }
    if (filters.fuelType) chips.push({ key: 'fuelType', label: `Kraftstoff: ${filters.fuelType}` });
    if (filters.transmission) chips.push({ key: 'transmission', label: `Getriebe: ${filters.transmission}` });
    if (filters.bodyType) chips.push({ key: 'bodyType', label: `Typ: ${filters.bodyType}` });

    return chips;
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block">
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800">
                <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse mb-6"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="mb-6">
                    <div className="h-5 w-24 bg-zinc-800 rounded animate-pulse mb-3"></div>
                    <div className="h-10 w-full bg-zinc-800 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards Skeleton */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-zinc-800">
                    <div className="aspect-[4/3] bg-zinc-800 animate-pulse"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-6 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="h-8 w-32 bg-zinc-800 rounded animate-pulse"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-zinc-800 rounded animate-pulse"></div>
                        <div className="h-12 bg-zinc-800 rounded animate-pulse"></div>
                      </div>
                      <div className="h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
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
        <title>Fahrzeuge - Nordhessen Automobile</title>
        <meta name="description" content="Entdecken Sie unsere große Auswahl an Premium-Fahrzeugen" />
      </Helmet>

      <div className="min-h-screen bg-[#0f0f0f]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0f0f0f] pt-20 pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Unsere Fahrzeuge
              </h1>
              <p className="text-lg text-gray-400 mb-4">
                Entdecken Sie unsere große Auswahl an geprüften Premium-Fahrzeugen.
              </p>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Marke oder Modell suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#1a1a1a] border border-zinc-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
              </h2>
              <p className="text-gray-400">
                {getActiveFiltersCount() > 0 ? 'Gefilterte Ergebnisse' : 'Alle verfügbaren Fahrzeuge'}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#1a1a1a] border border-zinc-700 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-white hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="newest">Neueste zuerst</option>
                  <option value="price-low">Preis aufsteigend</option>
                  <option value="price-high">Preis absteigend</option>
                  <option value="mileage">Kilometerstand</option>
                  <option value="year">Baujahr</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-zinc-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2.5 rounded-md transition-all',
                    viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-zinc-800'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2.5 rounded-md transition-all',
                    viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-zinc-800'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] text-white rounded-lg hover:bg-zinc-800 transition-all font-medium text-sm border border-zinc-700"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {getActiveFilterChips().map((chip) => (
                <div
                  key={chip.key}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] text-gray-300 rounded-lg text-sm font-medium border border-zinc-700"
                >
                  <span>{chip.label}</span>
                  <button
                    onClick={() => removeFilter(chip.key)}
                    className="hover:text-white transition-colors"
                    aria-label={`Remove ${chip.label} filter`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-400 font-medium px-3 py-1.5 transition-colors"
              >
                Alle zurücksetzen
              </button>
            </div>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block sticky top-24 self-start">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                filterOptions={filterOptions}
              />
            </aside>

            {/* Vehicle Grid */}
            <div className="lg:col-span-3">
              {filteredVehicles.length === 0 ? (
                <EmptyState
                  icon={<CarIcon className="w-12 h-12" />}
                  title="Keine Fahrzeuge gefunden"
                  description="Versuchen Sie, Ihre Suchkriterien anzupassen oder alle Filter zurückzusetzen."
                  action={{
                    label: 'Filter zurücksetzen',
                    onClick: clearFilters,
                  }}
                />
              ) : (
                <div
                  className={cn(
                    'grid gap-6',
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      id={vehicle.id}
                      make={vehicle.brand}
                      model={vehicle.model}
                      title={`${vehicle.brand} ${vehicle.model}`}
                      price={{
                        amount: vehicle.price,
                        formatted: `${vehicle.price.toLocaleString('de-DE')} €`,
                      }}
                      mileage={{
                        formatted: `${vehicle.mileage.toLocaleString('de-DE')} km`,
                      }}
                      firstRegistration={`${vehicle.year}-01-01`}
                      power={{
                        formatted: `${vehicle.horsePower} PS`,
                      }}
                      fuelType={vehicle.fuelType}
                      transmission={vehicle.transmission}
                      image={vehicle.images[0]}
                      images={vehicle.images}
                      isNew={new Date(vehicle.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
                      isExclusive={vehicle.isExclusive}
                      hasFinancing={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="relative ml-auto w-full max-w-sm bg-[#171717] flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-red-500" />
                  Filter
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                  filterOptions={filterOptions}
                />
              </div>

              <div className="p-6 border-t border-zinc-800 flex gap-3">
                <Button variant="secondary" onClick={clearFilters} className="flex-1">
                  Zurücksetzen
                </Button>
                <Button onClick={() => setShowMobileFilters(false)} className="flex-1">
                  Anwenden
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
