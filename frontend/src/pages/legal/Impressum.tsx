import { Helmet } from 'react-helmet-async';
import { Building2, Mail, Phone, Scale, Printer } from 'lucide-react';
import Section, { SectionContent } from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

function ImpressumDE() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-gray-300 leading-relaxed">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Impressum</h1>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Firmeninformationen</h2>
              <div className="space-y-2 text-gray-300">
                <p className="font-semibold text-white">Nordhessen-Automobile Seidler & Osmikhovsky GbR</p>
                <p>Sandershäuser Straße 87a</p>
                <p>34123 Kassel</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Kontakt</h3>
              <div className="space-y-2">
                <a href="tel:+4956193004649" className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>0561 930 04 649</span>
                </a>
                <div className="flex items-center gap-2 text-gray-300">
                  <Printer className="w-4 h-4" />
                  <span>Telefax: 0561 861 98 352</span>
                </div>
                <a href="mailto:info@nordhessen-automobile.de" className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@nordhessen-automobile.de</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Vertreten durch</h3>
              <div className="space-y-1 text-gray-300">
                <p>Dimitri Osmikhovsky</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tax Information */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Umsatzsteuer-ID</h2>
          <div className="text-gray-300 space-y-2">
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
            <p className="font-mono text-white">DE 278605165</p>
          </div>
        </Card>

        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <div className="text-gray-300 space-y-2">
            <p>Berufsbezeichnung: anderer Beruf</p>
          </div>
        </Card>

        {/* Responsible for Content */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Redaktionell verantwortlich</h2>
          <div className="text-gray-300 space-y-2">
            <p className="font-semibold text-white">Dimitri Osmikhovsky</p>
          </div>
        </Card>

        {/* Dispute Resolution */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <div className="text-gray-300 space-y-3 leading-relaxed">
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-sm text-gray-500">
        <p>Stand: März 2026</p>
        <p className="mt-2 text-xs opacity-50 text-gray-400">Quelle: eRecht24</p>
      </div>
    </div>
  );
}

function ImpressumEN() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-gray-300 leading-relaxed">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Site Notice</h1>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
              <div className="space-y-2 text-gray-300">
                <p className="font-semibold text-white">Nordhessen-Automobile Seidler & Osmikhovsky GbR</p>
                <p>Sandershäuser Straße 87a</p>
                <p>34123 Kassel</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Contact</h3>
              <div className="space-y-2">
                <a href="tel:+4956193004649" className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>0561 930 04 649</span>
                </a>
                <div className="flex items-center gap-2 text-gray-300">
                  <Printer className="w-4 h-4" />
                  <span>Fax: 0561 861 98 352</span>
                </div>
                <a href="mailto:info@nordhessen-automobile.de" className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@nordhessen-automobile.de</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Represented by</h3>
              <div className="space-y-1 text-gray-300">
                <p>Dimitri Osmikhovsky</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tax Information */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">VAT ID</h2>
          <div className="text-gray-300 space-y-2">
            <p>Sales tax identification number according to Sect. 27 a of the Sales Tax Law:</p>
            <p className="font-mono text-white">DE 278605165</p>
          </div>
        </Card>

        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Job title and professional regulations</h2>
          <div className="text-gray-300 space-y-2">
            <p>Job title: other profession</p>
          </div>
        </Card>

        {/* Responsible for Content */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Person responsible for editorial</h2>
          <div className="text-gray-300 space-y-2">
            <p className="font-semibold text-white">Dimitri Osmikhovsky</p>
          </div>
        </Card>

        {/* Dispute Resolution */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Dispute resolution proceedings in front of a consumer arbitration board</h2>
              <div className="text-gray-300 space-y-3 leading-relaxed">
                <p>
                  We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-sm text-gray-500">
        <p>As of: March 2026</p>
        <p className="mt-2 text-xs opacity-50 text-gray-400">Source: eRecht24</p>
      </div>
    </div>
  );
}

export default function Impressum() {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Site Notice' : 'Impressum'} - Nordhessen Automobile</title>
        <meta name="description" content={language === 'en' ? 'Site Notice of Nordhessen Automobile' : 'Impressum und rechtliche Informationen von Nordhessen Automobile'} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#171717] pt-20">
        <Section variant="default">
          <SectionContent>
            {language === 'en' ? <ImpressumEN /> : <ImpressumDE />}
          </SectionContent>
        </Section>
      </div>
    </>
  );
}
