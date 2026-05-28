import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { SearchParams } from '../../services/inventoryService';
import { useLanguage } from '../../contexts/LanguageContext';

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
  const { t } = useLanguage();
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
    { label: t('filter.price_up_to', { price: '20.000' }), min: 0, max: 20000 },
    { label: t('filter.price_range', { min: '20.000', max: '40.000' }), min: 20000, max: 40000 },
    { label: t('filter.price_range', { min: '40.000', max: '60.000' }), min: 40000, max: 60000 },
    { label: t('filter.price_range', { min: '60.000', max: '100.000' }), min: 60000, max: 100000 },
    { label: t('filter.price_over', { price: '100.000' }), min: 100000, max: 999999 },
  ];

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

  const inputClasses = "w-full px-4 py-3 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 hover:bg-white/[0.06] transition-all duration-300";

  return (
    <div className="bg-white/[0.02] backdrop-blur-3xl rounded-3xl border border-white/[0.08] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      {/* Decorative top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-red-500" />
          {t('filter.title')}
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-[#f87171] hover:text-red-300 font-medium transition-colors"
          >
            {t('filter.reset')}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Brand Filter */}
        <FilterSection
          title={t('filter.brand')}
          isExpanded={expandedSections.brand}
          onToggle={() => toggleSection('brand')}
          count={filterOptions.brands.length}
        >
          <select
            value={filters.make || ''}
            onChange={(e) => onFilterChange('make', e.target.value || undefined)}
            className={inputClasses}
          >
            <option value="">{t('filter.all_brands')}</option>
            {filterOptions.brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </FilterSection>

        {/* Price Filter */}
        <FilterSection
          title={t('filter.price')}
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('filter.from')}</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.priceFrom || ''}
                  onChange={(e) => onFilterChange('priceFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('filter.to')}</label>
                <input
                  type="number"
                  placeholder="200000"
                  value={filters.priceTo || ''}
                  onChange={(e) => onFilterChange('priceTo', e.target.value ? parseInt(e.target.value) : undefined)}
                  className={inputClasses}
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
                  className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-[#f87171] hover:bg-red-500/10 rounded-lg transition-all"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Year Filter */}
        <FilterSection
          title={t('filter.year')}
          isExpanded={expandedSections.year}
          onToggle={() => toggleSection('year')}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('filter.from')}</label>
              <input
                type="number"
                placeholder="2015"
                value={filters.yearFrom || ''}
                onChange={(e) => onFilterChange('yearFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('filter.to')}</label>
              <input
                type="number"
                placeholder="2024"
                value={filters.yearTo || ''}
                onChange={(e) => onFilterChange('yearTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className={inputClasses}
              />
            </div>
          </div>
        </FilterSection>

        {/* Mileage Filter */}
        <FilterSection
          title={t('filter.mileage')}
          isExpanded={expandedSections.mileage}
          onToggle={() => toggleSection('mileage')}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('filter.from')}</label>
              <input
                type="number"
                placeholder="0"
                value={filters.mileageFrom || ''}
                onChange={(e) => onFilterChange('mileageFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('filter.to')}</label>
              <input
                type="number"
                placeholder="200000"
                value={filters.mileageTo || ''}
                onChange={(e) => onFilterChange('mileageTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className={inputClasses}
              />
            </div>
          </div>
        </FilterSection>

        {/* Fuel Type Filter */}
        <FilterSection
          title={t('filter.fuel')}
          isExpanded={expandedSections.fuel}
          onToggle={() => toggleSection('fuel')}
        >
          <select
            value={filters.fuelType || ''}
            onChange={(e) => onFilterChange('fuelType', e.target.value || undefined)}
            className={inputClasses}
          >
            <option value="">{t('filter.all_fuel')}</option>
            {filterOptions.fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{t(`attr.fuel.${fuel}`)}</option>
            ))}
          </select>
        </FilterSection>

        {/* Transmission Filter */}
        <FilterSection
          title={t('filter.transmission')}
          isExpanded={expandedSections.transmission}
          onToggle={() => toggleSection('transmission')}
        >
          <select
            value={filters.transmission || ''}
            onChange={(e) => onFilterChange('transmission', e.target.value || undefined)}
            className={inputClasses}
          >
            <option value="">{t('filter.all_transmissions')}</option>
            {filterOptions.transmissions.map(trans => (
              <option key={trans} value={trans}>{t(`attr.trans.${trans}`)}</option>
            ))}
          </select>
        </FilterSection>

        {/* Body Type Filter */}
        <FilterSection
          title={t('filter.body')}
          isExpanded={expandedSections.body}
          onToggle={() => toggleSection('body')}
        >
          <select
            value={filters.bodyType || ''}
            onChange={(e) => onFilterChange('bodyType', e.target.value || undefined)}
            className={inputClasses}
          >
            <option value="">{t('filter.all_bodies')}</option>
            {filterOptions.bodyTypes.map(body => (
              <option key={body} value={body}>{t(`attr.body.${body}`)}</option>
            ))}
          </select>
        </FilterSection>

        {/* Power Filter */}
        <FilterSection
          title={t('filter.power')}
          isExpanded={expandedSections.power}
          onToggle={() => toggleSection('power')}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('filter.from')}</label>
              <input
                type="number"
                placeholder="0"
                value={filters.powerFrom || ''}
                onChange={(e) => onFilterChange('powerFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('filter.to')}</label>
              <input
                type="number"
                placeholder="500"
                value={filters.powerTo || ''}
                onChange={(e) => onFilterChange('powerTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className={inputClasses}
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
    <div className="border-b border-white/[0.06] pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-[#ef4444] rounded p-2 -m-2"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold text-gray-200">
          {title}
          {count !== undefined && count > 0 && (
            <span className="text-xs text-gray-500 font-normal ml-2">({count})</span>
          )}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
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
