/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00bf80',
          50: '#e6fff5',
          100: '#b3ffe0',
          200: '#80ffcc',
          300: '#4dffb8',
          400: '#1affa3',
          500: '#00bf80',
          600: '#009966',
          700: '#00734d',
          800: '#004d33',
          900: '#00261a',
        },
        navy: {
          DEFAULT: '#030233',
          50: '#e6e6f0',
          100: '#b3b3d1',
          200: '#8080b3',
          300: '#4d4d94',
          400: '#1a1a76',
          500: '#030233',
          600: '#02022a',
          700: '#020220',
          800: '#010117',
          900: '#01010d',
        },
        dark: {
          DEFAULT: '#0a1628',
          light: '#103047',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
