import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { adminService } from '../../services/adminService';
import { Car } from '../../services/carService';
import { formatPrice, formatDate } from '../../utils/format';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Search,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

export default function AdminCarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'exclusive' | 'standard'>('all');
  const [selectedCars, setSelectedCars] = useState<Set<string>>(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    filterCars();
  }, [cars, searchQuery, brandFilter, statusFilter]);

  const loadCars = async () => {
    try {
      const data = await adminService.getAllCars();
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCars = () => {
    let filtered = [...cars];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (brandFilter) {
      filtered = filtered.filter((car) => car.brand === brandFilter);
    }

    // Status filter
    if (statusFilter === 'exclusive') {
      filtered = filtered.filter((car) => car.isExclusive);
    } else if (statusFilter === 'standard') {
      filtered = filtered.filter((car) => !car.isExclusive);
    }

    setFilteredCars(filtered);
    setPage(1); // Reset to first page when filtering
  };

  const handleDelete = async (car: Car) => {
    setCarToDelete(car);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;

    try {
      await adminService.deleteCar(carToDelete.id);
      toast.success('Fahrzeug erfolgreich gelöscht');
      loadCars();
      setDeleteModalOpen(false);
      setCarToDelete(null);
    } catch (error) {
      // Error handled by interceptor
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCars.size === 0) return;

    if (!confirm(`Möchten Sie ${selectedCars.size} Fahrzeuge wirklich löschen?`)) {
      return;
    }

    try {
      await Promise.all(Array.from(selectedCars).map((id) => adminService.deleteCar(id)));
      toast.success(`${selectedCars.size} Fahrzeuge erfolgreich gelöscht`);
      setSelectedCars(new Set());
      loadCars();
    } catch (error) {
      // Error handled by interceptor
    }
  };

  const toggleSelectAll = () => {
    if (selectedCars.size === paginatedCars.length) {
      setSelectedCars(new Set());
    } else {
      setSelectedCars(new Set(paginatedCars.map((car) => car.id)));
    }
  };

  const toggleSelectCar = (id: string) => {
    const newSelected = new Set(selectedCars);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCars(newSelected);
  };

  const brands = Array.from(new Set(cars.map((car) => car.brand))).sort();
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Helmet>
        <title>Fahrzeugbestand - Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-white">Fahrzeugbestand</h1>
          <Link
            to="/admin/fahrzeuge/neu"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Neues Fahrzeug
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-sm p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Marke oder Modell suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* Brand Filter */}
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="input"
            >
              <option value="">Alle Marken</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#0a0a0a] text-gray-300 hover:bg-zinc-800'
                )}
              >
                Alle ({cars.length})
              </button>
              <button
                onClick={() => setStatusFilter('exclusive')}
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                  statusFilter === 'exclusive'
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#0a0a0a] text-gray-300 hover:bg-zinc-800'
                )}
              >
                Exklusiv ({cars.filter((c) => c.isExclusive).length})
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCars.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <span className="text-blue-900 font-medium">
              {selectedCars.size} ausgewählt
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Löschen
            </button>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-zinc-900 border border-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          paginatedCars.length > 0 &&
                          selectedCars.size === paginatedCars.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bild
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fahrzeug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zustand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exklusiv
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Erstellt
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#1a1a1a] divide-y divide-gray-200">
                  {paginatedCars.map((car) => (
                    <tr key={car.id} className="hover:bg-zinc-900 border border-zinc-800">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedCars.has(car.id)}
                          onChange={() => toggleSelectCar(car.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-12 w-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {car.brand} {car.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {car.year} • {car.fuelType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-white">
                          {formatPrice(car.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={cn(
                            'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                            car.condition === 'Neu'
                              ? 'bg-green-100 text-green-800'
                              : car.condition === 'Jahreswagen'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-[#0a0a0a] text-gray-200'
                          )}
                        >
                          {car.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {car.isExclusive && (
                          <Star className="h-5 w-5 text-amber-500 fill-current" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(car.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/fahrzeug/${car.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Ansehen"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/admin/fahrzeuge/${car.id}/bearbeiten`}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                            title="Bearbeiten"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(car)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Löschen"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 flex items-center justify-between border-t">
                <div className="text-sm text-gray-300">
                  {(page - 1) * itemsPerPage + 1}-
                  {Math.min(page * itemsPerPage, filteredCars.length)} von{' '}
                  {filteredCars.length} Fahrzeugen
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-lg border hover:bg-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-colors',
                        page === i + 1
                          ? 'bg-amber-600 text-white'
                          : 'border hover:bg-[#0a0a0a]'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border hover:bg-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && carToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setDeleteModalOpen(false)}
            />
            <div className="relative bg-[#1a1a1a] rounded-lg max-w-md w-full p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-red-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Fahrzeug löschen?
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Möchten Sie{' '}
                    <span className="font-semibold">
                      {carToDelete.brand} {carToDelete.model}
                    </span>{' '}
                    wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteModalOpen(false)}
                      className="flex-1 px-4 py-2 border rounded-lg hover:bg-zinc-900 border border-zinc-800 transition-colors"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-shrink-0 p-1 hover:bg-[#0a0a0a] rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
