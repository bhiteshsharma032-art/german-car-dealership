import { Helmet } from 'react-helmet-async';
import Section, { SectionContent } from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

function DatenschutzDE() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-gray-400 leading-relaxed">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">Datenschutzerklärung</h1>
      </div>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">1. Datenschutz auf einen Blick</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Allgemeine Hinweise</h3>
        <p className="mb-4">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Datenerfassung auf dieser Website</h3>
        <p className="font-semibold text-gray-100 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
        <p className="mb-4">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.</p>

        <p className="font-semibold text-gray-100 mb-2">Wie erfassen wir Ihre Daten?</p>
        <p className="mb-4">Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>

        <p className="font-semibold text-gray-100 mb-2">Wofür nutzen wir Ihre Daten?</p>
        <p className="mb-4">Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.</p>

        <p className="font-semibold text-gray-100 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
        <p className="mb-4">Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Analyse-Tools und Tools von Drittanbietern</h3>
        <p className="mb-4">Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">2. Hosting</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Strato</h3>
        <p className="mb-4">Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Anbieter ist die Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin (nachfolgend „Strato“). Wenn Sie unsere Website besuchen, erfasst Strato verschiedene Logfiles inklusive Ihrer IP-Adressen. Weitere Informationen entnehmen Sie der Datenschutzerklärung von Strato: https://www.strato.de/datenschutz/.</p>
        <p className="mb-4">Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Datenschutz</h3>
        <p className="mb-4">Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
        <p className="mb-4">Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Hinweis zur verantwortlichen Stelle</h3>
        <p className="mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <div className="bg-[#2a2a34] p-4 rounded-lg text-gray-400 mb-4">
          <p>Dimitri Osmikhovsky</p>
          <p>Nordhessen-Automobile Seidler & Osmikhovsky GbR</p>
          <p>Sandershäuser Straße 87a</p>
          <p>34123 Kassel</p>
          <p className="mt-2">Telefon: 0561 930 04 649</p>
          <p>E-Mail: info@nordhessen-automobile.de</p>
        </div>
        <p className="mb-4">Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Speicherdauer</h3>
        <p className="mb-4">Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
        <p className="mb-4">Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Empfänger von personenbezogenen Daten</h3>
        <p className="mb-4">Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p className="mb-4">Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
        <p className="mb-4 uppercase text-sm leading-relaxed">WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
        <p className="mb-4 uppercase text-sm leading-relaxed">WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
        <p className="mb-4">Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Recht auf Datenübertragbarkeit</h3>
        <p className="mb-4">Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Auskunft, Berichtigung und Löschung</h3>
        <p className="mb-4">Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Recht auf Einschränkung der Verarbeitung</h3>
        <p className="mb-4">Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
          <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
          <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
          <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        </ul>
        <p className="mb-4">Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
        <p className="mb-4">Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">4. Datenerfassung auf dieser Website</h2>
        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Server-Log-Dateien</h3>
        <p className="mb-4">Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind (z.B. Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse). Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
        <p className="mb-4">Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Kontaktformular</h3>
        <p className="mb-4">Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern.</p>
        
        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Einsatz von KI auf der Website</h3>
        <p className="mb-4">Wir nutzen KI-gestützte Dienste und / oder Anwendungen auf unserer Website. Wir setzen Künstliche Intelligenz (KI) auf unserer Website wie folgt ein: Wir setzen auf unserer Website einen KI-gestützten Chatbot ein, der Besuchern automatisiert Fragen zu unseren Produkten und Dienstleistungen beantwortet und bei der Kontaktaufnahme unterstützt.</p>
        <p className="mb-4">Die Nutzung dieser KI-gestützten Funktionen erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>
        
        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Anfrage per E-Mail, Telefon oder Telefax</h3>
        <p className="mb-4">Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Einsatz von Chatbots</h3>
        <p className="mb-4">Wir setzen Chatbots ein, um mit Ihnen zu kommunizieren. Chatbots sind in der Lage, ohne menschliche Hilfe auf Ihre Fragen und sonstigen Eingaben zu reagieren. Die erfassten Daten können außerdem dazu genutzt werden, um unsere Chatbots und ihr Antwortverhalten zu verbessern (maschinelles Lernen). Rechtsgrundlage für den Einsatz von Chatbots ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Einsatz von KI-Anwendungen im Rahmen der Chatbot-Kommunikation</h3>
        <p className="mb-4">Unsere Chatbots verwenden Künstliche Intelligenz (KI) im Rahmen der Kundenkommunikation. Wir binden folgende KI-Anwendungen in unsere Chatbots ein:</p>
        <p className="mb-4"><strong>ChatGPT</strong><br/>Unsere Chatbots nutzen ChatGPT für unsere Kundenkommunikation. Anbieter ist die OpenAI, 3180 18th St, San Francisco, CA 94110, USA. Wir haben ChatGPT so eingestellt, dass die von uns an ChatGPT weitergeleiteten Daten nicht zum Trainieren des ChatGPT-Algorithmus eingesetzt werden.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">5. Soziale Medien</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Instagram</h3>
        <p className="mb-4">Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Meta Platforms Ireland Limited. Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem Instagram-Server hergestellt. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">6. Plugins und Tools</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Google Fonts</h3>
        <p className="mb-4">Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in ihren Browsercache. Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">7. eCommerce und Zahlungsanbieter</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Verarbeiten von Kunden- und Vertragsdaten</h3>
        <p className="mb-4">Wir erheben, verarbeiten und nutzen personenbezogene Kunden- und Vertragsdaten zur Begründung, inhaltlichen Ausgestaltung und Änderung unserer Vertragsbeziehungen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO. Die erhobenen Kundendaten werden nach Abschluss des Auftrags oder Beendigung der Geschäftsbeziehung gelöscht.</p>
      </Card>

      <div className="mt-8 pt-8 border-t border-[#2e2e38] text-center text-sm text-gray-500 pb-20">
        <p>Stand: März 2026</p>
        <p className="mt-2 text-xs opacity-50 text-gray-400">Diese Datenschutzerklärung wurde mit Hilfe des eRecht24 Datenschutz-Generators erstellt.</p>
      </div>
    </div>
  );
}

function DatenschutzEN() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-gray-400 leading-relaxed">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">Privacy Policy</h1>
      </div>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">1. An overview of data protection</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">General information</h3>
        <p className="mb-4">The following information will provide you with an easy to navigate overview of what will happen with your personal data when you visit this website. The term “personal data” comprises all data that can be used to personally identify you. For detailed information about the subject matter of data protection, please consult our Data Protection Declaration, which we have included beneath this copy.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Data recording on this website</h3>
        <p className="font-semibold text-gray-100 mb-2">Who is the responsible party for the recording of data on this website (i.e., the “controller”)?</p>
        <p className="mb-4">The data on this website is processed by the operator of the website, whose contact information is available under section “Information about the responsible party (referred to as the “controller” in the GDPR)” in this Privacy Policy.</p>

        <p className="font-semibold text-gray-100 mb-2">How do we record your data?</p>
        <p className="mb-4">We collect your data as a result of your sharing of your data with us. This may, for instance be information you enter into our contact form. Other data shall be recorded by our IT systems automatically or after you consent to its recording during your website visit. This data comprises primarily technical information (e.g., web browser, operating system, or time the site was accessed). This information is recorded automatically when you access this website.</p>

        <p className="font-semibold text-gray-100 mb-2">What are the purposes we use your data for?</p>
        <p className="mb-4">A portion of the information is generated to guarantee the error free provision of the website. Other data may be used to analyze your user patterns. If contracts can be concluded or initiated via the website, the transmitted data will also be processed for contract offers, orders or other order enquiries.</p>

        <p className="font-semibold text-gray-100 mb-2">What rights do you have as far as your information is concerned?</p>
        <p className="mb-4">You have the right to receive information about the source, recipients, and purposes of your archived personal data at any time without having to pay a fee for such disclosures. You also have the right to demand that your data are rectified or eradicated. If you have consented to data processing, you have the option to revoke this consent at any time, which shall affect all future data processing. Moreover, you have the right to demand that the processing of your data be restricted under certain circumstances. Furthermore, you have the right to log a complaint with the competent supervising agency. Please do not hesitate to contact us at any time if you have questions about this or any other data protection related issues.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Analysis tools and tools provided by third parties</h3>
        <p className="mb-4">There is a possibility that your browsing patterns will be statistically analyzed when your visit this website. Such analyses are performed primarily with what we refer to as analysis programs. For detailed information about these analysis programs please consult our Data Protection Declaration below.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">2. Hosting</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Strato</h3>
        <p className="mb-4">We are hosting the content of our website at the following provider: The provider is Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin (hereinafter referred to as “Strato”). When you visit our website, Strato records various logfiles, including your IP addresses. For more information, please consult the Strato Data Privacy Policy: https://www.strato.de/datenschutz/.</p>
        <p className="mb-4">Strato is used on the basis of Art. 6(1)(f) GDPR. We have a legitimate interest in a depiction of our website that is as reliable as possible. If appropriate consent has been obtained, the processing is carried out exclusively on the basis of Art. 6(1)(a) GDPR and § 25 (1) TDDDG, insofar the consent includes the storage of cookies or the access to information in the user’s end device (e.g., device fingerprinting) within the meaning of the TDDDG. This consent can be revoked at any time.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">3. General information and mandatory information</h2>
        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Data protection</h3>
        <p className="mb-4">The operators of this website and its pages take the protection of your personal data very seriously. Hence, we handle your personal data as confidential information and in compliance with the statutory data protection regulations and this Data Protection Declaration. Whenever you use this website, a variety of personal information will be collected. Personal data comprises data that can be used to personally identify you. This Data Protection Declaration explains which data we collect as well as the purposes we use this data for. It also explains how, and for which purpose the information is collected.</p>
        <p className="mb-4">We herewith advise you that the transmission of data via the Internet (i.e., through e-mail communications) may be prone to security gaps. It is not possible to completely protect data against third-party access.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Information about the responsible party (Controller)</h3>
        <p className="mb-2">The data processing controller on this website is:</p>
        <div className="bg-[#2a2a34] p-4 rounded-lg text-gray-400 mb-4">
          <p>Dimitri Osmikhovsky</p>
          <p>Nordhessen-Automobile Seidler & Osmikhovsky GbR</p>
          <p>Sandershäuser Straße 87a</p>
          <p>34123 Kassel</p>
          <p className="mt-2">Phone: 0561 930 04 649</p>
          <p>E-mail: info@nordhessen-automobile.de</p>
        </div>
        <p className="mb-4">The controller is the natural person or legal entity that single-handedly or jointly with others makes decisions as to the purposes of and resources for the processing of personal data (e.g., names, e-mail addresses, etc.).</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Storage duration</h3>
        <p className="mb-4">Unless a more specific storage period has been specified in this privacy policy, your personal data will remain with us until the purpose for which it was collected no longer applies. If you assert a justified request for deletion or revoke your consent to data processing, your data will be deleted, unless we have other legally permissible reasons for storing your personal data (e.g., tax or commercial law retention periods); in the latter case, the deletion will take place after these reasons cease to apply.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">General information on the legal basis for the data processing on this website</h3>
        <p className="mb-4">If you have consented to data processing, we process your personal data on the basis of Art. 6(1)(a) GDPR or Art. 9 (2)(a) GDPR, if special categories of data are processed according to Art. 9 (1) DSGVO. In the case of explicit consent to the transfer of personal data to third countries, the data processing is also based on Art. 49 (1)(a) GDPR. If you have consented to the storage of cookies or to the access to information in your end device (e.g., via device fingerprinting), the data processing is additionally based on § 25 (1) TDDDG. The consent can be revoked at any time. If your data is required for the fulfillment of a contract or for the implementation of pre-contractual measures, we process your data on the basis of Art. 6(1)(b) GDPR. Furthermore, if your data is required for the fulfillment of a legal obligation, we process it on the basis of Art. 6(1)(c) GDPR. Furthermore, the data processing may be carried out on the basis of our legitimate interest according to Art. 6(1)(f) GDPR. Information on the relevant legal basis in each individual case is provided in the following paragraphs of this privacy policy.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Recipients of personal data</h3>
        <p className="mb-4">In the scope of our business activities, we cooperate with various external parties. In some cases, this also requires the transfer of personal data to these external parties. We only disclose personal data to external parties if this is required as part of the fulfillment of a contract, if we are legally obligated to do so (e.g., disclosure of data to tax authorities), if we have a legitimate interest in the disclosure pursuant to Art. 6 (1)(f) GDPR, or if another legal basis permits the disclosure of this data. When using processors, we only disclose personal data of our customers on the basis of a valid contract on data processing. In the case of joint processing, a joint processing agreement is concluded.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Revocation of your consent to the processing of data</h3>
        <p className="mb-4">A wide range of data processing transactions are possible only subject to your express consent. You can also revoke at any time any consent you have already given us. This shall be without prejudice to the lawfulness of any data collection that occurred prior to your revocation.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Right to object to the collection of data in special cases; right to object to direct advertising (Art. 21 GDPR)</h3>
        <p className="mb-4 uppercase text-sm leading-relaxed">IN THE EVENT THAT DATA ARE PROCESSED ON THE BASIS OF ART. 6(1)(E) OR (F) GDPR, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA BASED ON GROUNDS ARISING FROM YOUR UNIQUE SITUATION. THIS ALSO APPLIES TO ANY PROFILING BASED ON THESE PROVISIONS. TO DETERMINE THE LEGAL BASIS, ON WHICH ANY PROCESSING OF DATA IS BASED, PLEASE CONSULT THIS DATA PROTECTION DECLARATION. IF YOU LOG AN OBJECTION, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA, UNLESS WE ARE IN A POSITION TO PRESENT COMPELLING PROTECTION WORTHY GROUNDS FOR THE PROCESSING OF YOUR DATA, THAT OUTWEIGH YOUR INTERESTS, RIGHTS AND FREEDOMS OR IF THE PURPOSE OF THE PROCESSING IS THE CLAIMING, EXERCISING OR DEFENCE OF LEGAL ENTITLEMENTS (OBJECTION PURSUANT TO ART. 21(1) GDPR).</p>
        <p className="mb-4 uppercase text-sm leading-relaxed">IF YOUR PERSONAL DATA IS BEING PROCESSED IN order TO ENGAGE IN DIRECT ADVERTISING, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR AFFECTED PERSONAL DATA FOR THE PURPOSES OF SUCH ADVERTISING AT ANY TIME. THIS ALSO APPLIES TO PROFILING TO THE EXTENT THAT IT IS AFFILIATED WITH SUCH DIRECT ADVERTISING. IF YOU OBJECT, YOUR PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR DIRECT ADVERTISING PURPOSES (OBJECTION PURSUANT TO ART. 21(2) GDPR).</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Right to log a complaint with the competent supervisory agency</h3>
        <p className="mb-4">In the event of violations of the GDPR, data subjects are entitled to log a complaint with a supervisory agency, in particular in the member state where they usually maintain their domicile, place of work or at the place where the alleged violation occurred. The right to log a complaint is in effect regardless of any other administrative or court proceedings available as legal recourses.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Right to data portability</h3>
        <p className="mb-4">You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you should demand the direct transfer of the data to another controller, this will be done only if it is technically feasible.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Information about, rectification and eradication of data</h3>
        <p className="mb-4">Within the scope of the applicable statutory provisions, you have the right to demand information about your archived personal data, their source and recipients as well as the purpose of the processing of your data at any time. You may also have a right to have your data rectified or eradicated. If you have questions about this subject matter or any other questions about personal data, please do not hesitate to contact us at any time.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Right to demand processing restrictions</h3>
        <p className="mb-4">You have the right to demand the imposition of restrictions as far as the processing of your personal data is concerned. To do so, you may contact us at any time. The right to demand restriction of processing applies in the following cases:</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>In the event that you should dispute the correctness of your data archived by us, we will usually need some time to verify this claim. During the time that this investigation is ongoing, you have the right to demand that we restrict the processing of your personal data.</li>
          <li>If the processing of your personal data was/is conducted in an unlawful manner, you have the option to demand the restriction of the processing of your data instead of demanding the eradication of this data.</li>
          <li>If we do not need your personal data any longer and you need it to exercise, defend or claim legal entitlements, you have the right to demand the restriction of the processing of your personal data instead of its eradication.</li>
          <li>If you have raised an objection pursuant to Art. 21(1) GDPR, your rights and our rights will have to be weighed against each other. As long as it has not been determined whose interests prevail, you have the right to demand a restriction of the processing of your personal data.</li>
        </ul>
        <p className="mb-4">If you have restricted the processing of your personal data, these data – with the exception of their archiving – may be processed only subject to your consent or to claim, exercise or defend legal entitlements or to protect the rights of other natural persons or legal entities or for important public interest reasons cited by the European Union or a member state of the EU.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">SSL and/or TLS encryption</h3>
        <p className="mb-4">For security reasons and to protect the transmission of confidential content, such as purchase orders or inquiries you submit to us as the website operator, this website uses either an SSL or a TLS encryption program. You can recognize an encrypted connection by checking whether the address line of the browser switches from “http://” to “https://” and also by the appearance of the lock icon in the browser line. If the SSL or TLS encryption is activated, data you transmit to us cannot be read by third parties.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">4. Recording of data on this website</h2>
        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Server log files</h3>
        <p className="mb-4">The provider of this website and its pages automatically collects and stores information in so-called server log files, which your browser communicates to us automatically. The information comprises (e.g., The type and version of browser used, The used operating system, Referrer URL, The hostname of the accessing computer, The time of the server inquiry, The IP address). This data is not merged with other data sources.</p>
        <p className="mb-4">This data is recorded on the basis of Art. 6(1)(f) GDPR. The operator of the website has a legitimate interest in the technically error free depiction and the optimization of the operator’s website. In order to achieve this, server log files must be recorded.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Contact form</h3>
        <p className="mb-4">If you submit inquiries to us via our contact form, the information provided in the contact form as well as any contact information provided therein will be stored by us in order to handle your inquiry and in the event that we have further questions. We will not share this information without your consent. The processing of these data is based on Art. 6(1)(b) GDPR. The information you have entered into the contact form shall remain with us until you ask us to eradicate the data.</p>
        
        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Use of AI on the website</h3>
        <p className="mb-4">We use AI-supported services and/or applications on our website. We use artificial intelligence (AI) on our website as follows: We use an AI-supported chatbot on our website, which automatically answers visitors' questions about our products and services and supports them in contacting us.</p>
        <p className="mb-4">The use of these AI-supported functions is based on Art. 6(1)(f) GDPR.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Request by e-mail, telephone, or fax</h3>
        <p className="mb-4">If you contact us by e-mail, telephone or fax, your request, including all resulting personal data (name, request) will be stored and processed by us for the purpose of processing your request.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Use of Chatbots</h3>
        <p className="mb-4">We use chatbots to communicate with you. Chatbots have the capability to respond to your questions and other entries without the assistance of humans. The recorded data can also be used to improve our chatbots and their response patterns (machine learning). The legal basis for the use of chatbots is Art. 6(1)(b) or (f) GDPR.</p>

        <h3 className="text-lg font-bold text-gray-100 mt-6 mb-2">Use of AI applications in the context of chatbot communication</h3>
        <p className="mb-4">Our chatbots use artificial intelligence (AI) for customer communication. We integrate the following AI applications into our chatbots:</p>
        <p className="mb-4"><strong>ChatGPT</strong><br/>Our chatbots use ChatGPT for our customer communication. The provider is OpenAI, 3180 18th St, San Francisco, CA 94110, USA. We have configured ChatGPT so that the data we forward to ChatGPT is not used to train the ChatGPT algorithm.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">5. Social media</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Instagram</h3>
        <p className="mb-4">We have integrated functions of the public media platform Instagram into this website. These functions are being offered by Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland. If the social media element has been activated, a direct connection between your device and Instagram’s server will be established. The use of this service is based on your consent in accordance with Art. 6 (1)(a) GDPR and § 25 (1) TDDDG.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">6. Plug-ins and Tools</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Google Fonts</h3>
        <p className="mb-4">To ensure that fonts used on this website are uniform, this website uses so-called Google Fonts provided by Google. When you access a page on our website, your browser will load the required fonts into your browser cache to correctly display text and fonts. The use of Google Fonts is based on Art. 6(1)(f) GDPR.</p>
      </Card>

      <Card variant="elevated" className="p-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">7. eCommerce and payment service providers</h2>
        <h3 className="text-lg font-bold text-gray-100 mb-2">Processing of Customer and Contract Data</h3>
        <p className="mb-4">We collect, process, and use personal customer and contract data for the establishment, content arrangement and modification of our contractual relationships. The legal basis for these processes is Art. 6(1)(b) GDPR. The collected customer data shall be deleted upon completion of the order or termination of the business relationship.</p>
      </Card>

      <div className="mt-8 pt-8 border-t border-[#2e2e38] text-center text-sm text-gray-500 pb-20">
        <p>As of: March 2026</p>
        <p className="mt-2 text-xs opacity-50 text-gray-400">This privacy policy was created with the help of the eRecht24 Privacy Policy Generator.</p>
      </div>
    </div>
  );
}

export default function Datenschutz() {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Privacy Policy' : 'Datenschutzerklärung'} - Nordhessen Automobile</title>
        <meta name="description" content={language === 'en' ? 'Privacy Policy of Nordhessen Automobile' : 'Datenschutzerklärung von Nordhessen Automobile'} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1f] pt-20">
        <Section variant="default">
          <SectionContent>
            {language === 'en' ? <DatenschutzEN /> : <DatenschutzDE />}
          </SectionContent>
        </Section>
      </div>
    </>
  );
}
