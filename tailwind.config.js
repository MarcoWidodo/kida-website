/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Stanford Primary
        cardinal: {
          DEFAULT: '#8C1515',
          light: '#B83A4B',
          dark: '#820000'
        },
        // Stanford Black
        stanford: {
          black: '#2E2D29',
          charcoal: '#1A1A1E'
        },
        // Branch Colors (Stanford Accents)
        comms: {
          DEFAULT: '#E98300', // Poppy
          light: '#F9A44A',
          dark: '#D1660F'
        },
        events: {
          DEFAULT: '#E04F39', // Spirited
          light: '#F4795B',
          dark: '#C74632'
        },
        research: {
          DEFAULT: '#007C92', // Lagunita
          light: '#009AB4',
          dark: '#006B81'
        },
        innovation: {
          DEFAULT: '#279989', // Palo Verde
          light: '#59B3A9',
          dark: '#017E7C'
        },
        // Neutrals
        fog: {
          DEFAULT: '#DAD7CB',
          light: '#F4F4F4',
          dark: '#B6B1A9'
        },
        stone: {
          DEFAULT: '#7F7776',
          light: '#D4D1D1',
          dark: '#544948'
        },
        cool: {
          grey: '#53565A'
        }
      },
      fontFamily: {
         display: ['Inter', 'system-ui', 'sans-serif'],
         body: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundSize: {
        '300%': '300% 300%',
      }
    },
  },
  plugins: [],
}
