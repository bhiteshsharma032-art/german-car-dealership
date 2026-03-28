# Form Email Setup - Quick Start Guide

All forms on your website now send emails automatically when submitted!

## ✅ What's Been Implemented

### Forms That Send Emails:
1. **Contact Form** (`/kontakt`) - General inquiries
2. **Trade-in Form** (`/inzahlungnahme`) - Vehicle trade-in requests
3. **Financing Form** (`/finanzierung`) - Financing inquiries

### Email Features:
- ✉️ Professional HTML email templates
- 📧 All form data included in emails
- 🎨 Branded design with your colors
- 📱 Mobile-responsive emails
- 🔗 Clickable phone/email links
- ⏰ Timestamps on all submissions

## 🚀 Quick Setup (5 Minutes)

### Step 1: Configure Email Settings

Add these to your `backend/.env` file:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@nordhessen-automobile.de
```

### Step 2: Get Gmail App Password (If Using Gmail)

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password
6. Use it as `SMTP_PASS` in your .env

### Step 3: Test It!

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Submit a test form
4. Check your email at `CONTACT_EMAIL`

## 📧 Email Providers

### Gmail (Easy Setup)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 1&1 IONOS
```env
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_USER=info@nordhessen-automobile.de
SMTP_PASS=your-password
```

### Strato
```env
SMTP_HOST=smtp.strato.de
SMTP_PORT=587
SMTP_USER=info@nordhessen-automobile.de
SMTP_PASS=your-password
```

### Microsoft 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=info@nordhessen-automobile.de
SMTP_PASS=your-password
```

## 🌐 Production Deployment (Vercel)

Add environment variables in Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add each variable:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_EMAIL`
3. Redeploy your backend

## 📝 What Each Form Sends

### Contact Form Email Includes:
- Salutation (Herr/Frau/Divers)
- Full name
- Email & phone (clickable)
- Subject
- Car reference (if applicable)
- Message
- Timestamp

### Trade-in Form Email Includes:
- All contact details
- Complete vehicle information (VIN, registration, etc.)
- Condition details (accident-free, repainted, etc.)
- Service history
- Expected price
- Financing status
- All 20+ form fields organized in sections

### Financing Form Email Includes:
- Contact details
- Vehicle price
- Down payment
- Loan term
- Additional message
- Timestamp

## 🔧 Troubleshooting

### Emails not sending?
1. Check backend console for errors
2. Verify SMTP credentials
3. Check spam folder
4. Try different SMTP port (465 with SMTP_SECURE=true)

### "Invalid login" error?
- Gmail: Use App Password, not regular password
- Other providers: Check username format (might need full email)

### Connection timeout?
- Check firewall settings
- Verify hosting allows SMTP
- Try port 465 instead of 587

## 📚 Files Created/Modified

### Backend:
- ✅ `backend/src/services/emailService.ts` - Email sending logic
- ✅ `backend/src/controllers/contactController.ts` - Contact form handler
- ✅ `backend/src/controllers/tradeInController.ts` - Updated with email
- ✅ `backend/src/routes/contact.ts` - Contact routes
- ✅ `backend/src/server.ts` - Added contact routes
- ✅ `backend/.env.example` - Email config template
- ✅ `backend/package.json` - Added nodemailer

### Frontend:
- ✅ `frontend/src/pages/public/Contact.tsx` - Updated to use API

## 🎯 Next Steps

1. **Test all forms** to ensure emails arrive
2. **Check spam folder** for first emails
3. **Customize email templates** if needed (in `emailService.ts`)
4. **Set up email forwarding** if using multiple recipients
5. **Monitor email logs** in backend console

## 💡 Pro Tips

- Use a dedicated email for form submissions
- Set up email filters/labels for organization
- Consider transactional email service for high volume (SendGrid, Mailgun)
- Add rate limiting to prevent spam
- Keep SMTP credentials secure (never commit .env)

## 📞 Support

For detailed setup instructions, see `backend/EMAIL_SETUP.md`

---

**Ready to go!** Just add your SMTP credentials and start receiving form submissions via email. 🚀
