/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e1e9ff',
          200: '#c6d6ff',
          300: '#a1bbff',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#1b2cd1',
          800: '#1725aa',
          900: '#192585',
          950: '#111750',
        },
        surface: {
          50: '#f5f6f8',
          100: '#e8ecf1',
          200: '#d1d8e2',
          300: '#b0bccd',
          400: '#899bb1',
          500: '#697d95',
          600: '#52637a',
          700: '#425063',
          800: '#384453',
          900: '#1c222b',
          950: '#1a1a1f',
        },
        gold: {
          400: '#f6df95',
          500: '#d7bc5a',
          600: '#b29842',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'premium': '24px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-blue': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d7bc5a 0%, #f6df95 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1a1a1f 0%, #22222a 100%)',
        'gradient-surface': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(72,104,255,0.2)',
        'glow-blue-lg': '0 0 50px rgba(72,104,255,0.3), 0 0 80px rgba(72,104,255,0.1)',
        'glow-gold': '0 0 30px rgba(215,188,90,0.2)',
        'premium': '0 20px 60px rgba(0,0,0,0.6)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(72,104,255,0.1)',
        'glass': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'subtleFloat 6s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.04' },
          '50%': { opacity: '0.1' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'gradient-x': {
          '0%, 100%': {
             'background-size': '200% 200%',
             'background-position': 'left center'
          },
          '50%': {
             'background-size': '200% 200%',
             'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}
