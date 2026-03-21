import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { SearchParams } from '../../services/inventoryService';

interface FilterSidebarProps {
  filters: SearchParams;
  onFilterChange: (key: keyof SearchParams, value: any) => void;
  onClearFilters: () => void;
  filterOptions: {
    brands: string[];
    models: string[];
    fuelTypes: string[];
    transmissions: string[];
    bodyTypes: string[];
    colors: string[];
  };
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  filterOptions,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    year: false,
    mileage: false,
    fuel: false,
    transmission: false,
    body: false,
    power: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const priceRanges = [
    { label: 'Bis 20.000 €', min: 0, max: 20000 },
    { label: '20.000 - 40.000 €', min: 20000, max: 40000 },
    { label: '40.000 - 60.000 €', min: 40000, max: 60000 },
    { label: '60.000 - 100.000 €', min: 60000, max: 100000 },
    { label: 'Über 100.000 €', min: 100000, max: 999999 },
  ];

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-zinc-800/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-red-600" />
          Filter
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-red-600 hover:text-red-500 font-medium transition-colors"
          >
            Zurücksetzen
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Price Filter */}
        <FilterSection
          title="Preis"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Von</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.priceFrom || ''}
                  onChange={(e) => onFilterChange('priceFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Bis</label>
                <input
                  type="number"
                  placeholder="200000"
                  value={filters.priceTo || ''}
                  onChange={(e) => onFilterChange('priceTo', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <button
                  key={range.label}
                  onClick={() => {
                    onFilterChange('priceFrom', range.min);
                    onFilterChange('priceTo', range.max === 999999 ? undefined : range.max);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#0f0f0f] rounded-lg transition-all"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection
          title="Marke"
          isExpanded={expandedSections.brand}
          onToggle={() => toggleSection('brand')}
          count={filterOptions.brands.length}
        >
          <select
            value={filters.make || ''}
            onChange={(e) => onFilterChange('make', e.target.value || undefined)}
            className="w-full px-3 py-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
          >
            <option value="">Alle Marken</option>
            {filterOptions.brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </FilterSection>

        {/* Year Filter */}
        <FilterSection
          title="Erstzulassung"
          isExpanded={expandedSections.year}
          onToggle={() => toggleSection('year')}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Von</label>
              <input
                type="number"
                placeholder="2015"
                value={filters.yearFrom || ''}
                onChange={(e) => onFilterChange('yearFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Bis</label>
              <input
                type="number"
                placeholder="2024"
                value={filters.yearTo || ''}
                onChange={(e) => onFilterChange('yearTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </FilterSection>

        {/* Mileage Filter */}
        <FilterSection
          title="Kilometerstand"
          isExpanded={expandedSections.mileage}
          onToggle={() => toggleSection('mileage')}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Von</label>
              <input
                type="number"
                placeholder="0"
                value={filters.mileageFrom || ''}
                onChange={(e) => onFilterChange('mileageFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Bis</label>
              <input
                type="number"
                placeholder="200000"
                value={filters.mileageTo || ''}
                onChange={(e) => onFilterChange('mileageTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-zinc-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </FilterSection>

        {/* Fuel Type Filter */}
        <FilterSection
          title="Kraftstoffart"
          isExpanded={expandedSections.fuel}
          onToggle={() => toggleSection('fuel')}
        >
          <select
            value={filters.fuelType || ''}
            onChange={(e) => onFilterChange('fuelType', e.target.value || undefined)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Alle Kraftstoffarten</option>
            {filterOptions.fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </FilterSection>

        {/* Transmission Filter */}
        <FilterSection
          title="Getriebe"
          isExpanded={expandedSections.transmission}
          onToggle={() => toggleSection('transmission')}
        >
          <select
            value={filters.transmission || ''}
            onChange={(e) => onFilterChange('transmission', e.target.value || undefined)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Alle Getriebe</option>
            {filterOptions.transmissions.map(trans => (
              <option key={trans} value={trans}>{trans}</option>
            ))}
          </select>
        </FilterSection>

        {/* Body Type Filter */}
        <FilterSection
          title="Fahrzeugtyp"
          isExpanded={expandedSections.body}
          onToggle={() => toggleSection('body')}
        >
          <select
            value={filters.bodyType || ''}
            onChange={(e) => onFilterChange('bodyType', e.target.value || undefined)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Alle Fahrzeugtypen</option>
            {filterOptions.bodyTypes.map(body => (
              <option key={body} value={body}>{body}</option>
            ))}
          </select>
        </FilterSection>

        {/* Power Filter */}
        <FilterSection
          title="Leistung (PS)"
          isExpanded={expandedSections.power}
          onToggle={() => toggleSection('power')}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Von</label>
              <input
                type="number"
                placeholder="0"
                value={filters.powerFrom || ''}
                onChange={(e) => onFilterChange('powerFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Bis</label>
              <input
                type="number"
                placeholder="500"
                value={filters.powerTo || ''}
                onChange={(e) => onFilterChange('powerTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, count, children }: FilterSectionProps) {
  return (
    <div className="border-b border-zinc-800 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-2 -m-2"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold text-white">
          {title}
          {count !== undefined && count > 0 && (
            <span className="text-xs text-gray-400 font-normal ml-2">({count})</span>
          )}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}
