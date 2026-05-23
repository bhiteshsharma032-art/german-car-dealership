import { Helmet } from 'react-helmet-async';
import { Building2, Mail, Phone, Scale, Printer } from 'lucide-react';
import Section, { SectionContent } from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

function ImpressumDE() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-gray-400 leading-relaxed">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">{t('legal.impressum.title')}</h1>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.company_info')}</h2>
              <div className="space-y-2 text-gray-400">
                <p className="font-semibold text-gray-100">Nordhessen-Automobile<br />Seidler und Osmikhovski GbR</p>
                <p>Sandershäuser Straße 87a</p>
                <p>34123 Kassel</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#2e2e38]">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{t('legal.impressum.contact')}</h3>
              <div className="space-y-2">
                <a href="tel:+4956198866911" className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>0561/98866911</span>
                </a>
                <div className="flex items-center gap-2 text-gray-400">
                  <Printer className="w-4 h-4" />
                  <span>{t('legal.impressum.fax')}: 0561 861 98 352</span>
                </div>
                <a href="mailto:info@nordhessen-automobile.de" className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@nordhessen-automobile.de</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{t('legal.impressum.represented_by')}</h3>
              <div className="space-y-1 text-gray-400">
                <p>Dimitri Osmikhovsky</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tax Information */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.vat_id')}</h2>
          <div className="text-gray-400 space-y-2">
            <p>{t('legal.impressum.vat_id_desc')}</p>
            <p className="font-mono text-gray-100">DE 278605165</p>
          </div>
        </Card>

        {/* Responsible for Content */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.responsible')}</h2>
          <div className="text-gray-400 space-y-2">
            <p className="font-semibold text-gray-100">Dimitri Osmikhovsky</p>
          </div>
        </Card>

        {/* Dispute Resolution */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.dispute_res_full')}</h2>
              <div className="text-gray-400 space-y-3 leading-relaxed">
                <p>{t('legal.impressum.dispute_res_desc')}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 pt-8 border-t border-[#2e2e38] text-center text-sm text-gray-500">
        <p>{t('legal.impressum.status')}</p>
        <p className="mt-2 text-xs opacity-50 text-gray-400">{t('legal.impressum.source')}</p>
      </div>
    </div>
  );
}

function ImpressumEN() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-gray-400 leading-relaxed">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">{t('legal.impressum.title')}</h1>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.company_info')}</h2>
              <div className="space-y-2 text-gray-400">
                <p className="font-semibold text-gray-100">Nordhessen-Automobile<br />Seidler und Osmikhovski GbR</p>
                <p>Sandershäuser Straße 87a</p>
                <p>34123 Kassel</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#2e2e38]">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{t('legal.impressum.contact')}</h3>
              <div className="space-y-2">
                <a href="tel:+4956198866911" className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>0561/98866911</span>
                </a>
                <div className="flex items-center gap-2 text-gray-400">
                  <Printer className="w-4 h-4" />
                  <span>{t('legal.impressum.fax')}: 0561 861 98 352</span>
                </div>
                <a href="mailto:info@nordhessen-automobile.de" className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@nordhessen-automobile.de</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{t('legal.impressum.represented_by')}</h3>
              <div className="space-y-1 text-gray-400">
                <p>Dimitri Osmikhovsky</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tax Information */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.vat_id')}</h2>
          <div className="text-gray-400 space-y-2">
            <p>{t('legal.impressum.vat_id_desc')}</p>
            <p className="font-mono text-gray-100">DE 278605165</p>
          </div>
        </Card>

        {/* Responsible for Content */}
        <Card variant="elevated" className="p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.responsible')}</h2>
          <div className="text-gray-400 space-y-2">
            <p className="font-semibold text-gray-100">Dimitri Osmikhovsky</p>
          </div>
        </Card>

        {/* Dispute Resolution */}
        <Card variant="elevated" className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-[#dc2626] to-[#ef4444] rounded-xl">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">{t('legal.impressum.dispute_res_full')}</h2>
              <div className="text-gray-400 space-y-3 leading-relaxed">
                <p>{t('legal.impressum.dispute_res_desc')}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 pt-8 border-t border-[#2e2e38] text-center text-sm text-gray-500">
        <p>{t('legal.impressum.status')}</p>
        <p className="mt-2 text-xs opacity-50 text-gray-400">{t('legal.impressum.source')}</p>
      </div>
    </div>
  );
}

export default function Impressum() {
  const { language, t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('legal.impressum.title')} - Nordhessen Automobile</title>
        <meta name="description" content="Impressum Nordhessen Automobile" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        <Section variant="default">
          <SectionContent>
            {language === 'en' ? <ImpressumEN /> : <ImpressumDE />}
          </SectionContent>
        </Section>
      </div>
    </>
  );
}
