/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        turquoise: {
          primary: '#06b6d4',
          dark: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans, "Geist Sans")', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono, "Geist Mono")', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        heading: ['var(--font-geist-sans, "Geist Sans")', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        fade: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'slide-up-fade': 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUpFade: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
