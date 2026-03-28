import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus as PlusIcon } from 'lucide-react';

export default function AdminCarAdd() {
  return (
    <>
      <Helmet>
        <title>Neues Fahrzeug - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/fahrzeuge"
            className="p-2 hover:bg-[#1a1a20] rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Neues Fahrzeug hinzufügen</h1>
        </div>

        <div className="bg-[#2b2b36] rounded-lg shadow-sm p-8">
          <div className="max-w-4xl mx-auto">
            {/* Section: Grundinformationen */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b">
                Grundinformationen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Marke *
                  </label>
                  <select className="input w-full">
                    <option value="">Bitte wählen</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Volkswagen">Volkswagen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Modell *
                  </label>
                  <input type="text" className="input w-full" placeholder="z.B. 3er" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Variante
                  </label>
                  <input type="text" className="input w-full" placeholder="z.B. 320d" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Baujahr *
                  </label>
                  <input type="number" className="input w-full" placeholder="2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preis (€) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      €
                    </span>
                    <input
                      type="number"
                      className="input w-full pl-8"
                      placeholder="45000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zustand *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="condition" value="Neu" />
                      <span>Neu</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="condition" value="Gebraucht" />
                      <span>Gebraucht</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="condition" value="Jahreswagen" />
                      <span>Jahreswagen</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Technische Daten */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b">
                Technische Daten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kilometerstand (km) *
                  </label>
                  <input type="number" className="input w-full" placeholder="15000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kraftstoff *
                  </label>
                  <select className="input w-full">
                    <option value="">Bitte wählen</option>
                    <option value="Benzin">Benzin</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elektro">Elektro</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Getriebe *
                  </label>
                  <select className="input w-full">
                    <option value="">Bitte wählen</option>
                    <option value="Automatik">Automatik</option>
                    <option value="Schaltgetriebe">Schaltgetriebe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Karosserie *
                  </label>
                  <select className="input w-full">
                    <option value="">Bitte wählen</option>
                    <option value="Limousine">Limousine</option>
                    <option value="SUV">SUV</option>
                    <option value="Kombi">Kombi</option>
                    <option value="Coupé">Coupé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Leistung (PS) *
                  </label>
                  <input type="number" className="input w-full" placeholder="190" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hubraum (L)
                  </label>
                  <input type="number" step="0.1" className="input w-full" placeholder="2.0" />
                </div>
              </div>
            </div>

            {/* Section: Beschreibung */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b">
                Beschreibung
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fahrzeugbeschreibung *
                </label>
                <textarea
                  rows={6}
                  className="input w-full"
                  placeholder="Detaillierte Beschreibung des Fahrzeugs..."
                />
              </div>
            </div>

            {/* Section: Einstellungen */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b">
                Einstellungen
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <div>
                    <span className="font-medium text-white">Exklusives Angebot</span>
                    <p className="text-sm text-gray-400">
                      Als exklusives Angebot auf der Startseite hervorheben
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button className="btn-primary px-8 py-3 flex items-center justify-center gap-2">
                <Save className="h-5 w-5" />
                Speichern
              </button>
              <button className="btn-outline px-8 py-3 flex items-center justify-center gap-2">
                <PlusIcon className="h-5 w-5" />
                Speichern und weiteres hinzufügen
              </button>
              <Link
                to="/admin/fahrzeuge"
                className="btn-secondary px-8 py-3 flex items-center justify-center"
              >
                Abbrechen
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Hinweis:</strong> Fahrzeuge werden direkt auf mobile.de verwaltet und 
            synchronisieren automatisch mit Ihrer Website. Änderungen an Fahrzeugen sollten 
            auf der mobile.de Plattform vorgenommen werden.
          </p>
        </div>
      </div>
    </>
  );
}
