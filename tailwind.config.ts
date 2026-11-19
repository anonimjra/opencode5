import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'helios-bg': '#0e0c12',
        'helios-card': '#15121b',
        'helios-card-hover': '#1c1824',
        'helios-pill': '#2b2338',
        'helios-mauve': '#c084fc',
        'helios-violet': '#a855f7',
        'helios-pink': '#f472b6',
        'helios-gain': '#34d399',
        'helios-loss': '#f87171',
        'helios-border': 'rgba(255, 255, 255, 0.06)',
        'helios-text': '#ffffff',
        'helios-text-secondary': '#a19fad',
        'helios-text-muted': '#6b667b',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'helios-glow': '0 0 25px rgba(168, 85, 247, 0.25)',
        'helios-pill': '0 0 15px rgba(168, 85, 247, 0.15)',
        'helios-card': '0 10px 30px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'helios-aurora':
          'radial-gradient(circle at 20% 0%, rgba(168, 85, 247, 0.12), transparent 45%), radial-gradient(circle at 80% 100%, rgba(244, 114, 182, 0.08), transparent 50%)',
        'helios-cta':
          'linear-gradient(90deg, rgba(232, 121, 249, 0.85) 0%, rgba(192, 132, 252, 0.85) 100%)',
        'helios-pill-active':
          'linear-gradient(90deg, rgba(147, 51, 234, 0.35) 0%, rgba(192, 132, 252, 0.2) 100%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(1.35)' },
        },
        'flash-up': {
          '0%': { backgroundColor: 'rgba(52, 211, 153, 0.18)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'flash-down': {
          '0%': { backgroundColor: 'rgba(248, 113, 113, 0.18)' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'flash-up': 'flash-up 600ms ease-out',
        'flash-down': 'flash-down 600ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
