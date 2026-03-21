import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';
import { Loader2, Search, Trash2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/format';

export interface TradeIn {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'completed';
  
  // Personal Data
  name: string;
  address: string;
  phone: string;
  email: string;
  
  // Vehicle Data
  vin: string;
  licensePlate: string;
  firstRegistration: string;
  
  accidentFree: string;
  accidentDamage: string;
  
  previousOwners: string;
  
  repainted: string;
  repaintedDetails: string;
  
  replacedEngineOrGearbox: string;
  replacedEngineOrGearboxDetails: string;
  
  exteriorColor: string;
  isMetallic: boolean;
  
  interiorColor: string;
  
  serviceHistory: string;
  
  lastInspectionKm: string;
  lastInspectionDate: string;
  
  tuvValidUntil: string;
  mileage: string;
  
  upholstery: string;
  expectedPrice: string;
  
  financing: string;
  financingDetails: string;
  
  smokersCar: string;
  reImport: string;

  make?: string;
  model?: string;
  year?: string;
  fuelType?: string;
  transmission?: string;
  condition?: string;
  desiredPrice?: string;
  message?: string;
}

export default function AdminTradeIns() {
  const [tradeIns, setTradeIns] = useState<TradeIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTradeIn, setSelectedTradeIn] = useState<TradeIn | null>(null);

  useEffect(() => {
    loadTradeIns();
  }, []);

  const loadTradeIns = async () => {
    try {
      setLoading(true);
      const res = await api.get('/trade-ins');
      setTradeIns(res.data.data || []);
    } catch (error) {
      console.error('Error loading trade-ins:', error);
      toast.error('Fehler beim Laden der Inzahlungnahmen');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/trade-ins/${id}/status`, { status: newStatus });
      toast.success('Status aktualisiert');
      loadTradeIns();
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Möchten Sie diese Anfrage wirklich löschen?')) return;
    try {
      await api.delete(`/trade-ins/${id}`);
      toast.success('Anfrage gelöscht');
      loadTradeIns();
    } catch (error) {
      toast.error('Fehler beim Löschen');
    }
  };

  const filteredTradeIns = tradeIns.filter((t) => {
    const matchesSearch = (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.make || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.model || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.vin || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Neu</span>;
      case 'reviewed':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">Geprüft</span>;
      case 'contacted':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Kontaktiert</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Abgeschlossen</span>;
      default:
        return <span className="px-2 py-1 bg-[#0a0a0a] text-gray-200 text-xs rounded-full font-medium">{status}</span>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Inzahlungnahmen - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-white">Inzahlungnahmen</h1>
          <button
            onClick={loadTradeIns}
            className="inline-flex items-center justify-center px-4 py-2 bg-[#1a1a1a] border text-gray-300 rounded-lg hover:bg-zinc-900 border border-zinc-800 transition-colors shadow-sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Aktualisieren
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-sm p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Name, E-Mail, Marke, FIN suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="all">Alle Status</option>
              <option value="new">Neu</option>
              <option value="reviewed">Geprüft</option>
              <option value="contacted">Kontaktiert</option>
              <option value="completed">Abgeschlossen</option>
            </select>
          </div>
        </div>

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fahrzeug</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="bg-[#1a1a1a] divide-y divide-gray-200">
                  {filteredTradeIns.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        Keine Ergebnisse gefunden.
                      </td>
                    </tr>
                  ) : (
                    filteredTradeIns.map((t) => (
                      <tr key={t.id} className="hover:bg-zinc-900 border border-zinc-800 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {formatDate(t.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">{t.name}</div>
                          <div className="text-sm text-gray-500">{t.email}</div>
                          <div className="text-sm text-gray-500">{t.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-white">
                            {t.make || t.vin ? `${t.make || 'FIN:'} ${t.model || t.vin}` : 'Keine Angaben'}
                          </div>
                          {(t.mileage || t.firstRegistration) && (
                            <div className="text-sm text-gray-500">
                              {t.mileage} km • {t.firstRegistration || t.year}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(t.status)}
                          <select
                            className="ml-2 text-xs border rounded p-1 text-gray-400 bg-zinc-900 border border-zinc-800 mt-1 cursor-pointer"
                            value={t.status}
                            onChange={(e) => handleStatusChange(t.id, e.target.value)}
                          >
                            <option value="new">Neu</option>
                            <option value="reviewed">Geprüft</option>
                            <option value="contacted">Kontaktiert</option>
                            <option value="completed">Abgeschlossen</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedTradeIn(t);
                                setViewModalOpen(true);
                              }}
                              className="px-3 py-1.5 bg-[#0a0a0a] text-gray-300 hover:bg-zinc-800 rounded transition-colors text-sm font-medium"
                            >
                              Ansehen
                            </button>
                            <button
                              onClick={() => handleDelete(t.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                              title="Löschen"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewModalOpen && selectedTradeIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-[#1a1a1a] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col my-8">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-[#1a1a1a] rounded-t-xl z-10">
              <h2 className="text-2xl font-bold text-white">
                Inzahlungnahme Details
              </h2>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-400 bg-[#0a0a0a] hover:bg-zinc-800 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Kundendaten */}
                <div>
                  <h3 className="text-lg font-bold text-white border-b pb-2 mb-4">Kundendaten</h3>
                  <div className="space-y-3 shrink-0">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Name:</span>
                      <p className="font-medium text-white">{selectedTradeIn.name || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Adresse:</span>
                      <p className="font-medium text-white">{selectedTradeIn.address || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Telefon:</span>
                      <p className="font-medium text-white">{selectedTradeIn.phone || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">E-Mail:</span>
                      <p className="font-medium text-white">{selectedTradeIn.email || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Fahrzeug Grunddaten */}
                <div>
                  <h3 className="text-lg font-bold text-white border-b pb-2 mb-4">Fahrzeug Grunddaten</h3>
                  <div className="space-y-3 shrink-0">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Marke / Modell:</span>
                      <p className="font-medium text-white">{selectedTradeIn.make} {selectedTradeIn.model}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Fahrgestellnummer:</span>
                      <p className="font-medium text-white">{selectedTradeIn.vin || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Kennzeichen:</span>
                      <p className="font-medium text-white">{selectedTradeIn.licensePlate || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Erstzulassung:</span>
                      <p className="font-medium text-white">{selectedTradeIn.firstRegistration || selectedTradeIn.year || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Kilometerstand:</span>
                      <p className="font-medium text-white">{selectedTradeIn.mileage ? `${selectedTradeIn.mileage} km` : '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Zustand & Historie */}
                <div>
                  <h3 className="text-lg font-bold text-white border-b pb-2 mb-4">Zustand & Historie</h3>
                  <div className="space-y-3 shrink-0">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Unfallfrei:</span>
                      <p className="font-medium text-white">{selectedTradeIn.accidentFree || '-'}</p>
                      {selectedTradeIn.accidentDamage && <p className="text-sm text-red-600 mt-1">Schaden: {selectedTradeIn.accidentDamage}</p>}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Vorbesitzer:</span>
                      <p className="font-medium text-white">{selectedTradeIn.previousOwners || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Nachlackierungen:</span>
                      <p className="font-medium text-white">{selectedTradeIn.repainted || '-'}</p>
                      {selectedTradeIn.repaintedDetails && <p className="text-sm text-gray-400 mt-1">{selectedTradeIn.repaintedDetails}</p>}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Austauschmotor/-getriebe:</span>
                      <p className="font-medium text-white">{selectedTradeIn.replacedEngineOrGearbox || '-'}</p>
                      {selectedTradeIn.replacedEngineOrGearboxDetails && <p className="text-sm text-gray-400 mt-1">{selectedTradeIn.replacedEngineOrGearboxDetails}</p>}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Scheckheftgepflegt:</span>
                      <p className="font-medium text-white">{selectedTradeIn.serviceHistory || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Letzte Inspektion:</span>
                      <p className="font-medium text-white">{selectedTradeIn.lastInspectionKm} km / {selectedTradeIn.lastInspectionDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">TÜV/AU gültig bis:</span>
                      <p className="font-medium text-white">{selectedTradeIn.tuvValidUntil || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Ausstattung & Sonstiges */}
                <div>
                  <h3 className="text-lg font-bold text-white border-b pb-2 mb-4">Ausstattung & Sonstiges</h3>
                  <div className="space-y-3 shrink-0">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Außenfarbe:</span>
                      <p className="font-medium text-white">{selectedTradeIn.exteriorColor || '-'} {selectedTradeIn.isMetallic && '(Metallic)'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Innenfarbe:</span>
                      <p className="font-medium text-white">{selectedTradeIn.interiorColor || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Polster innen:</span>
                      <p className="font-medium text-white">{selectedTradeIn.upholstery || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Raucherwagen:</span>
                      <p className="font-medium text-white">{selectedTradeIn.smokersCar || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Re-Import:</span>
                      <p className="font-medium text-white">{selectedTradeIn.reImport || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Finanzierung:</span>
                      <p className="font-medium text-white">{selectedTradeIn.financing || '-'}</p>
                      {selectedTradeIn.financingDetails && <p className="text-sm text-gray-400 mt-1">{selectedTradeIn.financingDetails}</p>}
                    </div>
                    <div className="mt-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                      <span className="text-sm font-semibold text-gray-500 block mb-1">Preisvorstellung:</span>
                      <p className="text-2xl font-bold text-amber-600">{selectedTradeIn.expectedPrice || selectedTradeIn.desiredPrice ? `${selectedTradeIn.expectedPrice || selectedTradeIn.desiredPrice} €` : '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTradeIn.message && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-white border-b pb-2 mb-4">Zusätzliche Nachricht</h3>
                  <p className="text-gray-300 bg-zinc-900 border border-zinc-800 p-4 rounded-lg whitespace-pre-wrap">
                    {selectedTradeIn.message}
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t bg-zinc-900 border border-zinc-800 rounded-b-xl flex justify-end shrink-0">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-6 py-2 bg-zinc-800 hover:bg-gray-300 text-gray-200 rounded-lg font-medium transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
