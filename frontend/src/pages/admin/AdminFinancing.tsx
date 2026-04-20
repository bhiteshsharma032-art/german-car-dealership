import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { adminService } from '../../services/adminService';
import { Loader2, Search, RefreshCw, Mail, Phone, Euro, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate, formatPrice } from '../../utils/format';

export interface FinancingInquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  vehicle_price: string;
  down_payment: string;
  term: string;
  message: string;
}

export default function AdminFinancing() {
  const [inquiries, setInquiries] = useState<FinancingInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await adminService.getFinancingSubmissions();
      setInquiries(data);
    } catch (error) {
      console.error('Error loading financing inquiries:', error);
      toast.error('Fehler beim Laden der Finanzierungsanfragen');
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter((i) => {
    return (
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Helmet>
        <title>Finanzierungsanfragen - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Finanzierungsanfragen</h1>
          <button
            onClick={loadInquiries}
            className="inline-flex items-center px-4 py-2 bg-[#2b2b36] text-gray-300 rounded-lg hover:bg-zinc-900 border border-zinc-800 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Aktualisieren
          </button>
        </div>

        <div className="bg-[#2b2b36] p-6 rounded-lg shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Name oder E-Mail suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredInquiries.length === 0 ? (
              <div className="bg-[#2b2b36] p-12 text-center text-gray-500 rounded-lg">
                Keine Anfragen gefunden.
              </div>
            ) : (
              filteredInquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-[#2b2b36] rounded-lg shadow-sm border border-zinc-800 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="space-y-4 flex-grow">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {formatDate(inquiry.created_at)}
                          </span>
                          <h3 className="text-xl font-bold text-white">{inquiry.name}</h3>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <a href={`mailto:${inquiry.email}`} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4" />
                              {inquiry.email}
                            </a>
                            <a href={`tel:${inquiry.phone}`} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4" />
                              {inquiry.phone}
                            </a>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                              <Euro className="h-3 w-3" />
                              Fahrzeugpreis
                            </div>
                            <div className="text-lg font-bold text-white">
                              {formatPrice(Number(inquiry.vehicle_price))}
                            </div>
                          </div>
                          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                              <Euro className="h-3 w-3" />
                              Anzahlung
                            </div>
                            <div className="text-lg font-bold text-amber-600">
                              {formatPrice(Number(inquiry.down_payment))}
                            </div>
                          </div>
                          <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Laufzeit
                            </div>
                            <div className="text-lg font-bold text-white">
                              {inquiry.term} Monate
                            </div>
                          </div>
                        </div>

                        {inquiry.message && (
                          <div className="text-sm text-gray-400 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                            <span className="text-xs font-semibold block mb-1">Nachricht:</span>
                            {inquiry.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
