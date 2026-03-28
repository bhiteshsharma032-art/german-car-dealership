# Email Configuration Guide

This guide explains how to set up email functionality for the contact forms on your website.

## Overview

The application uses Nodemailer to send emails when users submit:
- Contact form
- Trade-in (Inzahlungnahme) form
- Financing (Finanzierung) form

## Environment Variables

Add these variables to your `.env` file:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@nordhessen-automobile.de
```

## Setup Options

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Configure .env**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_EMAIL=info@nordhessen-automobile.de
```

### Option 2: Professional Email Provider

#### Using 1&1 IONOS / Strato / Other German Providers

```env
SMTP_HOST=smtp.ionos.de  # or smtp.strato.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@nordhessen-automobile.de
SMTP_PASS=your-email-password
CONTACT_EMAIL=info@nordhessen-automobile.de
```

#### Using Microsoft 365 / Outlook

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@nordhessen-automobile.de
SMTP_PASS=your-email-password
CONTACT_EMAIL=info@nordhessen-automobile.de
```

### Option 3: Transactional Email Service (Recommended for Production)

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
CONTACT_EMAIL=info@nordhessen-automobile.de
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
CONTACT_EMAIL=info@nordhessen-automobile.de
```

## Testing

1. Start your backend server:
```bash
cd backend
npm run dev
```

2. Submit a test form from the frontend
3. Check the backend console for email status
4. Check your inbox at the `CONTACT_EMAIL` address

## Troubleshooting

### "Invalid login" error
- Double-check your SMTP credentials
- For Gmail, ensure you're using an App Password, not your regular password
- Verify 2FA is enabled for Gmail

### "Connection timeout" error
- Check your firewall settings
- Try port 465 with `SMTP_SECURE=true`
- Verify your hosting provider allows SMTP connections

### Emails not arriving
- Check spam/junk folder
- Verify `CONTACT_EMAIL` is correct
- Check email provider's sending limits
- Review backend console logs for errors

## Production Deployment

### Vercel Environment Variables

Add these to your Vercel project settings:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add each variable:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_EMAIL`

### Security Best Practices

1. **Never commit** `.env` files to Git
2. Use **App Passwords** instead of regular passwords
3. Consider using a **dedicated email** for form submissions
4. Enable **rate limiting** to prevent spam
5. Use **transactional email services** for production (SendGrid, Mailgun, etc.)

## Email Templates

The email service includes professionally formatted HTML templates for:

- **Contact Form**: Basic contact inquiries
- **Trade-in Form**: Detailed vehicle trade-in requests with all vehicle information
- **Financing Form**: Financing inquiries with calculation details

All templates include:
- Branded header with gradient
- Organized field layout
- Clickable email/phone links
- Timestamp and reference information
- Professional styling

## API Endpoints

- `POST /api/contact` - Contact form submission
- `POST /api/contact/financing` - Financing form submission
- `POST /api/trade-ins` - Trade-in form submission (already sends email)

## Support

For issues or questions, check:
- Backend console logs
- Email provider documentation
- Nodemailer documentation: https://nodemailer.com/
