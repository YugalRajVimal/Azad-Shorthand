import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: { brand: '#5BC8F8' },
        azure: { brand: '#4DA6FA' },
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-devanagari)', 'system-ui', 'sans-serif'],
        display: ['var(--font-ubuntu)', 'var(--font-devanagari)', 'system-ui', 'sans-serif'],
        hindi: ['var(--font-devanagari)', 'var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #5BC8F8 0%, #4DA6FA 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(91,200,248,.18) 0%, rgba(77,166,250,.18) 100%)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(77,166,250,.55)',
        glass: '0 8px 32px rgba(31,64,120,.12)',
      },
      animation: {
        'wave-slow': 'wave 14s linear infinite',
        'wave-fast': 'wave 9s linear infinite reverse',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        caret: 'caret 1s steps(1) infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-ring': 'pulseRing 1.6s ease-out infinite',
      },
      keyframes: {
        wave: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,20px) scale(.95)' },
        },
        caret: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '.6' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
      },
    },
  },
  plugins: [],
};

export default config;
