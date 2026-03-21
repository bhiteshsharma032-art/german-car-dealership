import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl">
        <Card variant="elevated" className="p-6 shadow-2xl border-2 border-zinc-700">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl flex-shrink-0">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Cookie-Einstellungen</h3>
              
              {!showSettings ? (
                <>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Wir verwenden Cookies, um Ihnen ein optimales Website-Erlebnis zu bieten. Dazu gehören Cookies, 
                    die für den Betrieb der Website notwendig sind, sowie solche, die zu Analysezwecken genutzt werden.
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Weitere Informationen finden Sie in unserer{' '}
                    <Link to="/datenschutz" className="text-red-500 hover:text-red-400 underline">
                      Datenschutzerklärung
                    </Link>
                    .
                  </p>
                </>
              ) : (
                <div className="space-y-4 mb-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Notwendige Cookies</h4>
                      <p className="text-sm text-gray-400">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="w-5 h-5 rounded border-zinc-600 bg-zinc-700 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Analyse-Cookies</h4>
                      <p className="text-sm text-gray-400">
                        Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="w-5 h-5 rounded border-zinc-600 bg-zinc-700 text-red-600 focus:ring-red-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Marketing-Cookies</h4>
                      <p className="text-sm text-gray-400">
                        Werden verwendet, um Besuchern relevante Werbung anzuzeigen.
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="w-5 h-5 rounded border-zinc-600 bg-zinc-700 text-red-600 focus:ring-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {!showSettings ? (
                  <>
                    <Button onClick={acceptAll} size="md">
                      Alle akzeptieren
                    </Button>
                    <Button onClick={() => setShowSettings(true)} variant="outline" size="md" leftIcon={<Settings className="w-4 h-4" />}>
                      Einstellungen
                    </Button>
                    <Button onClick={rejectAll} variant="ghost" size="md">
                      Nur notwendige
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={acceptSelected} size="md">
                      Auswahl speichern
                    </Button>
                    <Button onClick={() => setShowSettings(false)} variant="outline" size="md">
                      Zurück
                    </Button>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={rejectAll}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors flex-shrink-0"
              aria-label="Schließen"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
