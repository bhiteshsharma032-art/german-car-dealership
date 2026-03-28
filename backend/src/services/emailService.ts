import nodemailer from 'nodemailer';
import { TradeInRequest } from '../controllers/tradeInController';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error: any, success: any) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

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

  await transporter.sendMail(mailOptions);
};

export default {
  sendContactEmail,
  sendTradeInEmail,
  sendFinancingEmail,
};
