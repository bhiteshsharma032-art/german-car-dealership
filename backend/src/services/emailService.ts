import nodemailer from 'nodemailer';
import { TradeInRequest } from '../controllers/tradeInController';

// Check if email configuration is available
const hasEmailConfig = process.env.SMTP_USER && process.env.SMTP_PASS;

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: hasEmailConfig ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

// Verify transporter configuration only if config is available
if (hasEmailConfig) {
  transporter.verify((error: any, success: any) => {
    if (error) {
      console.warn('⚠️ Email transporter authentication failed:', error.message);
      console.warn('Backend will continue to run, but email sending will fail.');
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
} else {
  console.log('ℹ️ Email credentials not found. Email service will run in mock/log mode.');
}


interface ContactFormData {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  carReference?: string;
  message: string;
}

interface FinancingFormData {
  name: string;
  email: string;
  phone: string;
  vehiclePrice: string;
  downPayment: string;
  term: string;
  message: string;
}

const COMMON_STYLES = `
  body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
  .wrapper { background-color: #f4f4f4; padding: 40px 20px; }
  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #1a1a1a, #333333); color: white; padding: 40px 30px; text-align: center; }
  .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
  .header p { margin: 10px 0 0; opacity: 0.8; font-size: 14px; }
  .content { padding: 40px 30px; }
  .greeting { font-size: 18px; font-weight: 600; margin-bottom: 20px; color: #dc2626; }
  .message-box { background-color: #f8fafc; border-left: 4px solid #dc2626; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
  .details-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
  .details-table td { padding: 12px 0; border-bottom: 1px solid #edf2f7; }
  .label { font-weight: 600; color: #64748b; width: 40%; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
  .value { color: #1e293b; font-weight: 500; }
  .cta-section { text-align: center; margin-top: 40px; }
  .button { background-color: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; transition: background-color 0.3s; }
  .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #edf2f7; }
  .footer-links { margin-bottom: 15px; }
  .footer-links a { color: #64748b; text-decoration: none; margin: 0 10px; }
  .company-name { color: #1e293b; font-weight: 700; margin-bottom: 5px; }
`;

// Send contact form email
export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  const mailOptions = {
    from: `"Nordhessen Automobile Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'info@nordhessen-automobile.de',
    replyTo: data.email,
    subject: `Neue Kontaktanfrage: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #dc2626; }
          .value { margin-top: 5px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #dc2626; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">Neue Kontaktanfrage</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Anrede:</div>
              <div class="value">${data.salutation}</div>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.firstName} ${data.lastName}</div>
            </div>
            <div class="field">
              <div class="label">E-Mail:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Telefon:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Betreff:</div>
              <div class="value">${data.subject}</div>
            </div>
            ${data.carReference ? `
            <div class="field">
              <div class="label">Fahrzeug-Referenz:</div>
              <div class="value">${data.carReference}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Nachricht:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
              <p>Diese E-Mail wurde über das Kontaktformular auf nordhessen-automobile.de gesendet.</p>
              <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  if (!hasEmailConfig) {
    console.log('📝 Mock Email (Contact):', {
      to: process.env.CONTACT_EMAIL || 'info@nordhessen-automobile.de',
      subject: mailOptions.subject,
      data: data
    });
    return;
  }

  await transporter.sendMail(mailOptions);
};

// Send trade-in form email
export const sendTradeInEmail = async (data: TradeInRequest): Promise<void> => {
  const mailOptions = {
    from: `"Nordhessen Automobile Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'info@nordhessen-automobile.de',
    replyTo: data.email,
    subject: `Neue Inzahlungnahme-Anfrage: ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 18px; font-weight: bold; color: #dc2626; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #dc2626; }
          .field { margin-bottom: 12px; display: flex; }
          .label { font-weight: bold; min-width: 200px; color: #555; }
          .value { flex: 1; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #dc2626; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">Neue Inzahlungnahme-Anfrage</h2>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Kontaktdaten</div>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">E-Mail:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Adresse:</div>
                <div class="value">${data.address}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Fahrzeug-Grunddaten</div>
              <div class="field">
                <div class="label">Fahrgestellnummer (FIN):</div>
                <div class="value">${data.vin}</div>
              </div>
              <div class="field">
                <div class="label">Kennzeichen:</div>
                <div class="value">${data.licensePlate || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">Erstzulassung:</div>
                <div class="value">${data.firstRegistration}</div>
              </div>
              <div class="field">
                <div class="label">Kilometerstand:</div>
                <div class="value">${data.mileage || 'Nicht angegeben'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Zustand & Historie</div>
              <div class="field">
                <div class="label">Unfallfrei:</div>
                <div class="value">${data.accidentFree || 'Nicht angegeben'}</div>
              </div>
              ${data.accidentDamage ? `
              <div class="field">
                <div class="label">Unfallschaden:</div>
                <div class="value">${data.accidentDamage}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Vorbesitzer:</div>
                <div class="value">${data.previousOwners || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">Nachlackierungen:</div>
                <div class="value">${data.repainted || 'Nicht angegeben'}</div>
              </div>
              ${data.repaintedDetails ? `
              <div class="field">
                <div class="label">Nachlackierung Details:</div>
                <div class="value">${data.repaintedDetails}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Austauschmotor/-getriebe:</div>
                <div class="value">${data.replacedEngineOrGearbox || 'Nicht angegeben'}</div>
              </div>
              ${data.replacedEngineOrGearboxDetails ? `
              <div class="field">
                <div class="label">Austausch Details:</div>
                <div class="value">${data.replacedEngineOrGearboxDetails}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Scheckheftgepflegt:</div>
                <div class="value">${data.serviceHistory || 'Nicht angegeben'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Fahrzeugdetails</div>
              <div class="field">
                <div class="label">Außenfarbe:</div>
                <div class="value">${data.exteriorColor || 'Nicht angegeben'} ${data.isMetallic ? '(Metallic)' : ''}</div>
              </div>
              <div class="field">
                <div class="label">Innenfarbe:</div>
                <div class="value">${data.interiorColor || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">Polsterung:</div>
                <div class="value">${data.upholstery || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">Raucherfahrzeug:</div>
                <div class="value">${data.smokersCar || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">Reimport:</div>
                <div class="value">${data.reImport || 'Nicht angegeben'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Wartung & TÜV</div>
              <div class="field">
                <div class="label">Letzte Inspektion (km):</div>
                <div class="value">${data.lastInspectionKm || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">Letzte Inspektion (Datum):</div>
                <div class="value">${data.lastInspectionDate || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">TÜV gültig bis:</div>
                <div class="value">${data.tuvValidUntil || 'Nicht angegeben'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Finanzierung & Preis</div>
              <div class="field">
                <div class="label">Erwarteter Preis:</div>
                <div class="value">${data.expectedPrice || 'Nicht angegeben'}</div>
              </div>
              <div class="field">
                <div class="label">Finanzierung läuft:</div>
                <div class="value">${data.financing || 'Nicht angegeben'}</div>
              </div>
              ${data.financingDetails ? `
              <div class="field">
                <div class="label">Finanzierung Details:</div>
                <div class="value">${data.financingDetails}</div>
              </div>
              ` : ''}
            </div>

            ${data.message ? `
            <div class="section">
              <div class="section-title">Zusätzliche Nachricht</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}

            <div class="footer">
              <p>Diese E-Mail wurde über das Inzahlungnahme-Formular auf nordhessen-automobile.de gesendet.</p>
              <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
              <p>Anfrage-ID: ${data.id}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  if (!hasEmailConfig) {
    console.log('📝 Mock Email (Trade-In):', {
      to: process.env.CONTACT_EMAIL || 'info@nordhessen-automobile.de',
      subject: mailOptions.subject,
      data: { name: data.name, email: data.email, vin: data.vin }
    });
    return;
  }

  await transporter.sendMail(mailOptions);
};

// Send financing form email
export const sendFinancingEmail = async (data: FinancingFormData): Promise<void> => {
  const mailOptions = {
    from: `"Nordhessen Automobile Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'info@nordhessen-automobile.de',
    replyTo: data.email,
    subject: `Neue Finanzierungsanfrage: ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #dc2626; }
          .value { margin-top: 5px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #dc2626; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">Neue Finanzierungsanfrage</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">E-Mail:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Telefon:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Fahrzeugpreis:</div>
              <div class="value">${data.vehiclePrice} €</div>
            </div>
            <div class="field">
              <div class="label">Anzahlung:</div>
              <div class="value">${data.downPayment} €</div>
            </div>
            <div class="field">
              <div class="label">Laufzeit:</div>
              <div class="value">${data.term} Monate</div>
            </div>
            ${data.message ? `
            <div class="field">
              <div class="label">Nachricht:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            <div class="footer">
              <p>Diese E-Mail wurde über das Finanzierungsformular auf nordhessen-automobile.de gesendet.</p>
              <p>Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  if (!hasEmailConfig) {
    console.log('📝 Mock Email (Financing):', {
      to: process.env.CONTACT_EMAIL || 'info@nordhessen-automobile.de',
      subject: mailOptions.subject,
      data: data
    });
    return;
  }

  await transporter.sendMail(mailOptions);
};

// Send contact form confirmation email to client
export const sendContactConfirmationEmail = async (data: ContactFormData): Promise<void> => {
  const mailOptions = {
    from: `"Nordhessen Automobile" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Vielen Dank für Ihre Anfrage - Nordhessen Automobile`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${COMMON_STYLES}</style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Nordhessen Automobile</h1>
              <p>Ihr Partner für exklusive Fahrzeuge</p>
            </div>
            <div class="content">
              <div class="greeting">Hallo ${data.salutation} ${data.lastName},</div>
              <p>vielen Dank für Ihr Interesse an Nordhessen Automobile. Wir haben Ihre Kontaktanfrage erhalten und freuen uns über Ihr Vertrauen.</p>
              
              <p>Unser Team prüft Ihr Anliegen bereits und wird sich innerhalb der nächsten 24 Stunden per E-Mail oder Telefon bei Ihnen melden.</p>
              
              <div class="message-box">
                <strong>Ihre Nachricht:</strong><br>
                ${data.message.replace(/\n/g, '<br>')}
              </div>

              <table class="details-table">
                <tr>
                  <td class="label">Name</td>
                  <td class="value">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                  <td class="label">E-Mail</td>
                  <td class="value">${data.email}</td>
                </tr>
                <tr>
                  <td class="label">Telefon</td>
                  <td class="value">${data.phone}</td>
                </tr>
                <tr>
                  <td class="label">Betreff</td>
                  <td class="value">${data.subject}</td>
                </tr>
                ${data.carReference ? `
                <tr>
                  <td class="label">Referenz</td>
                  <td class="value">${data.carReference}</td>
                </tr>
                ` : ''}
              </table>

              <div class="cta-section">
                <a href="https://nordhessen-automobile.de/bestand" class="button">Unseren Bestand ansehen</a>
              </div>
            </div>
            <div class="footer">
              <div class="company-name">Nordhessen Automobile GmbH</div>
              <p>Leipziger Str. 123, 34123 Kassel</p>
              <div class="footer-links">
                <a href="https://nordhessen-automobile.de/impressum">Impressum</a> | 
                <a href="https://nordhessen-automobile.de/datenschutz">Datenschutz</a>
              </div>
              <p>© ${new Date().getFullYear()} Nordhessen Automobile. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  if (!hasEmailConfig) {
    console.log('📝 Mock Client Confirmation (Contact):', data.email);
    return;
  }

  await transporter.sendMail(mailOptions);
};

// Send trade-in form confirmation email to client
export const sendTradeInConfirmationEmail = async (data: TradeInRequest): Promise<void> => {
  const mailOptions = {
    from: `"Nordhessen Automobile" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Eingangsbestätigung: Inzahlungnahme-Anfrage - Nordhessen Automobile`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${COMMON_STYLES}</style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Inzahlungnahme-Service</h1>
              <p>Bewertung Ihres Fahrzeugs</p>
            </div>
            <div class="content">
              <div class="greeting">Sehr geehrte(r) ${data.name.split(' ')[0]},</div>
              <p>vielen Dank für die Übermittlung Ihrer Fahrzeugdaten zur Inzahlungnahme. Wir haben Ihre Anfrage erfolgreich erhalten.</p>
              
              <p>Unsere Experten werden Ihr Fahrzeug basierend auf Ihren Angaben bewerten. Wir melden uns zeitnah mit einem ersten unverbindlichen Angebot bei Ihnen.</p>
              
              <h3 style="color: #dc2626; border-bottom: 2px solid #edf2f7; padding-bottom: 10px; margin-top: 30px;">Zusammenfassung Ihrer Angaben</h3>
              
              <table class="details-table">
                <tr><td colspan="2" style="background-color: #f8fafc; padding: 10px; font-weight: bold;">Fahrzeugdaten</td></tr>
                <tr>
                  <td class="label">Fahrgestellnr.</td>
                  <td class="value">${data.vin}</td>
                </tr>
                <tr>
                  <td class="label">Erstzulassung</td>
                  <td class="value">${data.firstRegistration}</td>
                </tr>
                <tr>
                  <td class="label">Kilometerstand</td>
                  <td class="value">${data.mileage} km</td>
                </tr>
                <tr>
                  <td class="label">Kennzeichen</td>
                  <td class="value">${data.licensePlate || 'Nicht angegeben'}</td>
                </tr>
                
                <tr><td colspan="2" style="background-color: #f8fafc; padding: 10px; font-weight: bold;">Zustand & Historie</td></tr>
                <tr>
                  <td class="label">Unfallfrei</td>
                  <td class="value">${data.accidentFree || 'Nicht angegeben'}</td>
                </tr>
                ${data.accidentDamage ? `
                <tr>
                  <td class="label">Unfallschaden</td>
                  <td class="value">${data.accidentDamage}</td>
                </tr>
                ` : ''}
                <tr>
                  <td class="label">Vorbesitzer</td>
                  <td class="value">${data.previousOwners || 'Nicht angegeben'}</td>
                </tr>
                <tr>
                  <td class="label">Nachlackierungen</td>
                  <td class="value">${data.repainted || 'Nicht angegeben'}</td>
                </tr>
                ${data.repaintedDetails ? `<tr><td class="label">Details Lack</td><td class="value">${data.repaintedDetails}</td></tr>` : ''}
                <tr>
                  <td class="label">Austauschmotor/-getriebe</td>
                  <td class="value">${data.replacedEngineOrGearbox || 'Nicht angegeben'}</td>
                </tr>
                ${data.replacedEngineOrGearboxDetails ? `<tr><td class="label">Details Austausch</td><td class="value">${data.replacedEngineOrGearboxDetails}</td></tr>` : ''}
                <tr>
                  <td class="label">Scheckheftgepflegt</td>
                  <td class="value">${data.serviceHistory || 'Nicht angegeben'}</td>
                </tr>
                
                <tr><td colspan="2" style="background-color: #f8fafc; padding: 10px; font-weight: bold;">Wartung & Technik</td></tr>
                <tr>
                  <td class="label">Letzte Insp. (km)</td>
                  <td class="value">${data.lastInspectionKm || 'Nicht angegeben'}</td>
                </tr>
                <tr>
                  <td class="label">Letzte Insp. (Datum)</td>
                  <td class="value">${data.lastInspectionDate || 'Nicht angegeben'}</td>
                </tr>
                <tr>
                  <td class="label">TÜV gültig bis</td>
                  <td class="value">${data.tuvValidUntil || 'Nicht angegeben'}</td>
                </tr>
                <tr>
                  <td class="label">Reimport</td>
                  <td class="value">${data.reImport || 'Nicht angegeben'}</td>
                </tr>
                
                <tr><td colspan="2" style="background-color: #f8fafc; padding: 10px; font-weight: bold;">Ausstattung & Optik</td></tr>
                <tr>
                  <td class="label">Farbe</td>
                  <td class="value">${data.exteriorColor || 'Nicht angegeben'} ${data.isMetallic ? '(Metallic)' : ''}</td>
                </tr>
                <tr>
                  <td class="label">Innenfarbe</td>
                  <td class="value">${data.interiorColor || 'Nicht angegeben'}</td>
                </tr>
                <tr>
                  <td class="label">Polsterung</td>
                  <td class="value">${data.upholstery || 'Nicht angegeben'}</td>
                </tr>
                <tr>
                  <td class="label">Raucherfahrzeug</td>
                  <td class="value">${data.smokersCar || 'Nicht angegeben'}</td>
                </tr>
                
                <tr><td colspan="2" style="background-color: #f8fafc; padding: 10px; font-weight: bold;">Finanzielles & Kontakt</td></tr>
                <tr>
                  <td class="label">Preisvorstellung</td>
                  <td class="value">${data.expectedPrice}</td>
                </tr>
                <tr>
                  <td class="label">Finanzierung läuft</td>
                  <td class="value">${data.financing || 'Nicht angegeben'}</td>
                </tr>
                ${data.financingDetails ? `<tr><td class="label">Details Finanz.</td><td class="value">${data.financingDetails}</td></tr>` : ''}
                <tr>
                  <td class="label">Ihre Adresse</td>
                  <td class="value">${data.address}</td>
                </tr>
              </table>

              ${data.message ? `
              <div class="message-box">
                <strong>Ihre Anmerkung:</strong><br>
                ${data.message.replace(/\n/g, '<br>')}
              </div>
              ` : ''}

              <div class="cta-section">
                <p>Haben Sie noch Fragen? Rufen Sie uns direkt an:</p>
                <a href="tel:+49123456789" class="button">Jetzt anrufen</a>
              </div>
            </div>
            <div class="footer">
              <div class="company-name">Nordhessen Automobile GmbH</div>
              <p>Leipziger Str. 123, 34123 Kassel</p>
              <p>© ${new Date().getFullYear()} Nordhessen Automobile. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  if (!hasEmailConfig) {
    console.log('📝 Mock Client Confirmation (Trade-In):', data.email);
    return;
  }

  await transporter.sendMail(mailOptions);
};

// Send financing form confirmation email to client
export const sendFinancingConfirmationEmail = async (data: FinancingFormData): Promise<void> => {
  const mailOptions = {
    from: `"Nordhessen Automobile" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Ihre Finanzierungsanfrage bei Nordhessen Automobile`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${COMMON_STYLES}</style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Finanzierungs-Service</h1>
              <p>Einfach und Transparent</p>
            </div>
            <div class="content">
              <div class="greeting">Hallo ${data.name.split(' ')[0]},</div>
              <p>vielen Dank für Ihre Finanzierungsanfrage. Wir freuen uns, Ihnen dabei zu helfen, Ihr Traumauto zu finanzieren.</p>
              
              <p>Ein Finanzierungsberater wird Ihre Anfrage prüfen und sich mit einem individuellen Angebot bei Ihnen melden.</p>
              
              <table class="details-table">
                <tr>
                  <td class="label">Name</td>
                  <td class="value">${data.name}</td>
                </tr>
                <tr>
                  <td class="label">E-Mail</td>
                  <td class="value">${data.email}</td>
                </tr>
                <tr>
                  <td class="label">Telefon</td>
                  <td class="value">${data.phone}</td>
                </tr>
                <tr>
                  <td class="label">Fahrzeugpreis</td>
                  <td class="value">${data.vehiclePrice} €</td>
                </tr>
                <tr>
                  <td class="label">Anzahlung</td>
                  <td class="value">${data.downPayment} €</td>
                </tr>
                <tr>
                  <td class="label">Laufzeit</td>
                  <td class="value">${data.term} Monate</td>
                </tr>
              </table>

              ${data.message ? `
              <div class="message-box">
                <strong>Ihre Nachricht:</strong><br>
                ${data.message.replace(/\n/g, '<br>')}
              </div>
              ` : ''}

              <div class="cta-section">
                <a href="https://nordhessen-automobile.de/kontakt" class="button">Frage stellen</a>
              </div>
            </div>
            <div class="footer">
              <div class="company-name">Nordhessen Automobile GmbH</div>
              <p>Leipziger Str. 123, 34123 Kassel</p>
              <p>© ${new Date().getFullYear()} Nordhessen Automobile. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  if (!hasEmailConfig) {
    console.log('📝 Mock Client Confirmation (Financing):', data.email);
    return;
  }

  await transporter.sendMail(mailOptions);
};

export default {
  sendContactEmail,
  sendTradeInEmail,
  sendFinancingEmail,
  sendContactConfirmationEmail,
  sendTradeInConfirmationEmail,
  sendFinancingConfirmationEmail,
};
