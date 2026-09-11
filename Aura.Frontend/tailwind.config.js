/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        aura: {
          bg: '#0a0612',
          panel: '#120b1f',
          card: '#160f26',
          border: 'rgba(255,255,255,0.08)',
          pink: '#ec4899',
          fuchsia: '#c026d3',
          purple: '#8b5cf6',
        },
      },
      backgroundImage: {
        'aura-gradient': 'linear-gradient(135deg, #ec4899 0%, #a855f7 55%, #7c3aed 100%)',
        'aura-radial': 'radial-gradient(circle at 20% 20%, rgba(236,72,153,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.18), transparent 40%), radial-gradient(circle at 50% 100%, rgba(192,38,211,0.12), transparent 45%)',
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(236,72,153,0.45)',
        'glow-sm': '0 0 25px -8px rgba(236,72,153,0.5)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        pulseSlow: 'pulseSlow 2.4s ease-in-out infinite',
        floatY: 'floatY 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
