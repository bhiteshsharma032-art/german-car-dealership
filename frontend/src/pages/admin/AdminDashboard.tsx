import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { adminService, DashboardStats } from '../../services/adminService';
import { formatPrice, formatDate } from '../../utils/format';
import {
  Car,
  Star,
  Euro,
  Plus,
  TrendingUp,
  Edit,
  Trash2,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentCars, setRecentCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, carsData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAllCars(),
      ]);
      setStats(statsData);
      // Get 5 most recent cars
      const sorted = [...carsData].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRecentCars(sorted.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRecentlyAddedCount = () => {
    if (!recentCars.length) return 0;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return recentCars.filter((car) => new Date(car.createdAt) > oneWeekAgo).length;
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  const maxBrandCount = Math.max(...Object.values(stats.byBrand));

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Willkommen zurück, {user?.username || 'Admin'}
          </h1>
          <p className="text-amber-100 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#2b2b36] rounded-lg shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Car className="h-6 w-6 text-red-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-400 mb-1">Gesamte Fahrzeuge</p>
            <p className="text-3xl font-bold text-white">{stats.totalCars}</p>
          </div>

          <div className="bg-[#2b2b36] rounded-lg shadow-sm p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Exklusive Angebote</p>
            <p className="text-3xl font-bold text-white">{stats.exclusiveDeals}</p>
          </div>

          <div className="bg-[#2b2b36] rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Euro className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Durchschnittspreis</p>
            <p className="text-3xl font-bold text-white">{formatPrice(stats.avgPrice)}</p>
          </div>

          <div className="bg-[#2b2b36] rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Neuste hinzugefügt</p>
            <p className="text-3xl font-bold text-white">
              {getRecentlyAddedCount()}{' '}
              <span className="text-base font-normal text-gray-400">diese Woche</span>
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory by Brand */}
          <div className="bg-[#2b2b36] rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 text-white">Bestand nach Marke</h2>
            <div className="space-y-4">
              {Object.entries(stats.byBrand)
                .sort(([, a], [, b]) => b - a)
                .map(([brand, count]) => (
                  <div key={brand}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">{brand}</span>
                      <span className="text-sm font-bold text-white">{count}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(count / maxBrandCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Price Distribution */}
          <div className="bg-[#2b2b36] rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 text-white">Preisverteilung</h2>
            <div className="space-y-4">
              {Object.entries(stats.priceRanges).map(([range, count]) => {
                const labels: Record<string, string> = {
                  unter_30k: '< €30.000',
                  '30k_50k': '€30.000 - €50.000',
                  '50k_80k': '€50.000 - €80.000',
                  '80k_120k': '€80.000 - €120.000',
                  ueber_120k: '> €120.000',
                };
                const maxCount = Math.max(...Object.values(stats.priceRanges));
                return (
                  <div key={range}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">{labels[range]}</span>
                      <span className="text-sm font-bold text-white">{count}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#2b2b36] rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-white">Schnellaktionen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/fahrzeuge/neu"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-md"
            >
              <Plus className="h-5 w-5" />
              Neues Fahrzeug hinzufügen
            </Link>
            <Link
              to="/admin/fahrzeuge"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
            >
              <Car className="h-5 w-5" />
              Alle Fahrzeuge verwalten
            </Link>
            <Link
              to="/admin/fahrzeuge?exclusive=true"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
            >
              <Star className="h-5 w-5" />
              Exklusive Angebote
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#2b2b36] rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-white">Zuletzt hinzugefügt</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-zinc-900 border border-zinc-800">
                <tr>
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
                    Hinzugefügt
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#2b2b36] divide-y divide-gray-200">
                {recentCars.map((car) => (
                  <tr key={car.id} className="hover:bg-zinc-900 border border-zinc-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {car.brand} {car.model}
                      </div>
                      <div className="text-sm text-gray-500">{car.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-white">
                        {formatPrice(car.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {formatDate(car.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/fahrzeuge/${car.id}/bearbeiten`}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        <Edit className="h-5 w-5 inline" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Fehlende Bilder</h3>
                <p className="text-sm text-amber-800">
                  3 Fahrzeuge haben keine Bilder hochgeladen
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Lange im Bestand</h3>
                <p className="text-sm text-red-800">
                  2 Fahrzeuge sind über 1 Jahr im Bestand
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
