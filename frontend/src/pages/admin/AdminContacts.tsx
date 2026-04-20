import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { adminService } from '../../services/adminService';
import { Loader2, Search, RefreshCw, Mail, Phone, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/format';

export interface ContactInquiry {
  id: string;
  created_at: string;
  salutation: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  car_reference?: string;
  message: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await adminService.getContactSubmissions();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
      toast.error('Fehler beim Laden der Kontaktanfragen');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter((c) => {
    return (
      (c.first_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.last_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.subject || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Helmet>
        <title>Kontaktanfragen - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Kontaktanfragen</h1>
          <button
            onClick={loadContacts}
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
              placeholder="Name, E-Mail oder Betreff suchen..."
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
          <div className="space-y-4">
            {filteredContacts.length === 0 ? (
              <div className="bg-[#2b2b36] p-12 text-center text-gray-500 rounded-lg">
                Keine Anfragen gefunden.
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-[#2b2b36] rounded-lg shadow-sm border border-zinc-800 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {formatDate(contact.created_at)}
                          </span>
                          {contact.car_reference && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                              Fahrzeug: {contact.car_reference}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {contact.salutation} {contact.first_name} {contact.last_name}
                        </h3>
                        <p className="text-amber-600 font-semibold">{contact.subject}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4" />
                          {contact.email}
                        </a>
                        <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                    <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
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
