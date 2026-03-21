# Frontend Setup Documentation

## Technology Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **clsx + tailwind-merge** - Conditional class names

### State Management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling

### HTTP & API
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Toast notifications

### SEO & Meta
- **React Helmet Async** - Document head management

### Icons
- **Lucide React** - Icon library

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── PublicLayout.tsx
│   │       └── AdminLayout.tsx
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.tsx
│   │   │   ├── CarList.tsx
│   │   │   ├── CarDetail.tsx
│   │   │   ├── ExclusiveDeals.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminCarList.tsx
│   │       ├── AdminCarAdd.tsx
│   │       └── AdminCarEdit.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── carService.ts
│   │   └── adminService.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   └── format.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .env
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Routes

### Public Routes
- `/` - Home/Landing page
- `/fahrzeuge` - All cars listing with filters
- `/fahrzeug/:id` - Car detail page
- `/exklusive-angebote` - Exclusive deals
- `/uber-uns` - About us
- `/kontakt` - Contact form

### Admin Routes (Protected)
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard with statistics
- `/admin/fahrzeuge` - Car inventory management
- `/admin/fahrzeuge/neu` - Add new car
- `/admin/fahrzeuge/:id/bearbeiten` - Edit car

---

## Key Features

### 1. Layout System
- **PublicLayout**: Header + Content + Footer
- **AdminLayout**: Sidebar + Top bar + Content
- Responsive navigation with mobile menu
- Sticky header

### 2. Authentication
- Zustand store for auth state
- JWT token storage in localStorage
- Axios interceptors for automatic token injection
- Protected admin routes with redirect
- Auto-logout on 401 responses

### 3. API Integration
- Centralized axios instance
- Request/response interceptors
- Automatic error handling with toast notifications
- Type-safe service methods

### 4. State Management
- **authStore**: User authentication state
- Zustand for lightweight, hook-based state
- No prop drilling needed

### 5. Form Handling
- React Hook Form for validation
- German error messages
- Accessible form inputs
- Loading states

### 6. Styling System
- Tailwind CSS utility classes
- Custom component classes (btn, input, card)
- Responsive design (mobile-first)
- Primary color theme (blue)
- German locale formatting

### 7. SEO
- React Helmet Async for meta tags
- Page-specific titles and descriptions
- German language meta tags

### 8. User Experience
- Loading states with spinners
- Toast notifications for feedback
- Pagination for car listings
- Similar cars recommendations
- Responsive images
- Accessible navigation

---

## Services

### carService
```typescript
- getAllCars(filters?) - Get paginated car list
- getExclusiveDeals() - Get exclusive cars
- getCarById(id) - Get single car
- getSimilarCars(id) - Get similar cars
- getBrandsWithCounts() - Get brands with counts
- getFilterOptions() - Get filter options
```

### adminService
```typescript
- login(credentials) - Admin login
- logout() - Clear token
- isAuthenticated() - Check auth status
- getAllCars() - Get all cars (admin)
- addCar(car) - Add new car
- updateCar(id, updates) - Update car
- deleteCar(id) - Delete car
- getStats() - Get dashboard statistics
```

---

## Styling

### Tailwind Configuration
- Primary color: Blue (#0284c7)
- Custom font: Inter
- Responsive breakpoints: sm, md, lg, xl
- Custom utility classes

### Custom CSS Classes
```css
.btn - Base button
.btn-primary - Primary button (blue)
.btn-secondary - Secondary button (gray)
.btn-outline - Outlined button
.input - Form input
.card - Card container
.container - Max-width container
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_LOCALE=de-DE
VITE_CURRENCY=EUR
```

---

## German Localization

### UI Text
- All navigation in German
- Form labels in German
- Error messages in German
- Success messages in German
- Page titles in German

### Formatting
- Currency: EUR (€)
- Number format: German (1.234,56)
- Date format: German (DD. MMMM YYYY)
- Distance: Kilometers (km)

---

## Installation

```bash
cd frontend
npm install
```

---

## Development

```bash
npm run dev
# Runs on http://localhost:5173
```

---

## Build

```bash
npm run build
# Output in dist/
```

---

## Dependencies

### Production
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "axios": "^1.6.5",
  "lucide-react": "^0.303.0",
  "react-helmet-async": "^2.0.4",
  "react-hot-toast": "^2.4.1",
  "zustand": "^4.4.7",
  "react-hook-form": "^7.49.3",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

### Development
```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "typescript": "^5.3.3",
  "vite": "^5.0.11",
  "tailwindcss": "^3.4.1",
  "postcss": "^8.4.33",
  "autoprefixer": "^10.4.16"
}
```

---

## Next Steps

1. Add image upload functionality
2. Implement advanced filters UI
3. Add car comparison feature
4. Implement search functionality
5. Add favorites/wishlist
6. Implement admin car form
7. Add image gallery for car details
8. Implement pagination controls
9. Add loading skeletons
10. Add error boundaries

---

## Best Practices

1. **Type Safety**: All API responses typed
2. **Error Handling**: Centralized error handling
3. **Loading States**: Show loading indicators
4. **Responsive**: Mobile-first design
5. **Accessibility**: Semantic HTML, ARIA labels
6. **SEO**: Meta tags on all pages
7. **Performance**: Code splitting, lazy loading
8. **Security**: Token-based auth, protected routes
9. **UX**: Toast notifications, form validation
10. **Maintainability**: Modular structure, reusable components
