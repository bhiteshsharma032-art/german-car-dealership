# Vercel Deployment Guide - Nordhessen Automobile

## 🚀 Quick Deployment Steps

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ installed locally

### Step 1: Prepare Your Repository

Your project is already configured! Just make sure all changes are committed:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect the configuration from `vercel.json`
4. Click "Deploy"

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

### Step 3: Configure Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

#### Required Variables:
```env
# Mobile.de API Credentials
MOBILEDE_API_USERNAME=dlr_dimitriosmikhovsky
MOBILEDE_API_PASSWORD=kovoExT0mG3Y
MOBILEDE_CUSTOMER_ID=712285
MOBILEDE_TIMEOUT=15000

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=dealer2024

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@nordhessen-automobile.de

# Environment
NODE_ENV=production
```

#### Optional Variables:
```env
# CORS (Vercel will auto-configure this)
CORS_ORIGIN=https://your-domain.vercel.app

# Frontend URL
FRONTEND_URL=https://your-domain.vercel.app
```

---

## 📁 Project Structure

Your project is configured as a monorepo:

```
.
├── frontend/          # React + Vite frontend
├── backend/           # Express backend (not used in Vercel)
├── api/              # Vercel Serverless Functions
│   └── index.ts      # Main API handler
├── vercel.json       # Vercel configuration
└── package.json      # Root package.json
```

---

## ⚙️ Configuration Files

### `vercel.json` (Already Configured)

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install",
  "functions": {
    "api/index.ts": {
      "memory": 512,
      "maxDuration": 30
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.ts" },
    { "source": "/((?!api).*)", "destination": "/index.html" }
  ]
}
```

### `package.json` Scripts (Already Configured)

```json
{
  "scripts": {
    "build": "npm run build:frontend",
    "build:frontend": "cd frontend && npm install && npm run build",
    "vercel-build": "cd frontend && npm install && npm run build"
  }
}
```

---

## 🔧 How It Works

### Frontend
- Built with Vite
- Deployed as static files from `frontend/dist`
- All routes handled by React Router

### Backend API
- Runs as Vercel Serverless Functions
- Located in `api/index.ts`
- Handles all `/api/*` routes
- Connects to Mobile.de API for vehicle data

### Routing
- `/` → Frontend (React app)
- `/fahrzeuge` → Frontend
- `/api/*` → Serverless function

---

## 🌐 Custom Domain Setup

### Add Custom Domain

1. Go to your Vercel project
2. Settings → Domains
3. Add your domain (e.g., `nordhessen-automobile.de`)
4. Follow DNS configuration instructions

### DNS Configuration

Add these records to your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Change `ADMIN_PASSWORD` to a strong password
- [ ] Use Gmail App Password (not regular password) for SMTP
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Review CORS settings
- [ ] Keep Mobile.de credentials secure

---

## 📊 Monitoring & Logs

### View Deployment Logs
1. Go to your Vercel project
2. Click on a deployment
3. View "Build Logs" and "Function Logs"

### Real-time Logs
```bash
vercel logs --follow
```

### Check Deployment Status
```bash
vercel ls
```

---

## 🐛 Troubleshooting

### Build Fails

**Problem**: Build command fails
**Solution**: Check build logs in Vercel dashboard

```bash
# Test build locally
cd frontend
npm install
npm run build
```

### API Not Working

**Problem**: `/api/*` routes return 404
**Solution**: 
1. Check `vercel.json` rewrites configuration
2. Verify `api/index.ts` exists
3. Check function logs in Vercel dashboard

### Environment Variables Not Working

**Problem**: API credentials not working
**Solution**:
1. Go to Settings → Environment Variables
2. Make sure variables are set for "Production"
3. Redeploy after adding variables

### Mobile.de API Connection Issues

**Problem**: Vehicles not loading
**Solution**:
1. Verify Mobile.de credentials in environment variables
2. Check API logs: `vercel logs`
3. Test connection: `https://your-domain.vercel.app/api/mobilede/test-connection`

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your Git repository:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

### Disable Auto-Deploy

If you want manual control:
1. Settings → Git
2. Disable "Production Branch"

---

## 📈 Performance Optimization

### Already Implemented:
- ✅ Static asset optimization
- ✅ Image optimization (Vercel automatic)
- ✅ Serverless functions for API
- ✅ CDN distribution (Vercel Edge Network)
- ✅ Automatic HTTPS
- ✅ Gzip compression

### Recommended:
- Enable Vercel Analytics (Settings → Analytics)
- Enable Vercel Speed Insights
- Monitor function execution times
- Optimize images (use WebP format)

---

## 💰 Pricing

### Vercel Free Tier Includes:
- Unlimited deployments
- 100 GB bandwidth/month
- 100 GB-hours serverless function execution
- Automatic HTTPS
- Preview deployments

### When to Upgrade:
- High traffic (>100 GB/month)
- Need more function execution time
- Want advanced analytics
- Need team collaboration features

---

## 🚀 Post-Deployment Checklist

- [ ] Verify homepage loads correctly
- [ ] Test vehicle listing page
- [ ] Test contact form submission
- [ ] Test trade-in form
- [ ] Test financing form
- [ ] Verify Mobile.de integration
- [ ] Test admin login
- [ ] Check all images load
- [ ] Test on mobile devices
- [ ] Verify all translations work
- [ ] Test language switcher
- [ ] Check SEO meta tags
- [ ] Verify Google Analytics (if configured)

---

## 📞 Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: support@vercel.com

### Project Issues
- Check deployment logs
- Review function logs
- Test API endpoints
- Verify environment variables

---

## 🎉 Success!

Your website should now be live at:
- **Production**: `https://your-project.vercel.app`
- **Custom Domain**: `https://nordhessen-automobile.de` (after DNS setup)

### Next Steps:
1. Configure custom domain
2. Set up email notifications
3. Monitor analytics
4. Optimize performance
5. Add more vehicles on Mobile.de

---

**Deployment Date**: 2026-03-28
**Version**: 1.0.0
**Status**: Production Ready ✅
