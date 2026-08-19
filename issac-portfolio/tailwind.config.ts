import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0b12',
        ink: '#eef0f6',
        dim: '#8a90a8',
        dimmer: '#565c72',
        card: '#12141f',
        cardline: '#232637',
        teal: '#2bd4b8',
        violet: '#7c7bff',
        amber: '#f0b860',
        lgbg: '#f5f5f5',
        lgblue: { top: '#468ccf', bot: '#2d6ca2' },
        lgnav: '#222222',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        legacy: ['Dotum', 'Gulim', '"Apple SD Gothic Neo"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
