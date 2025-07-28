/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Apple Color Palette
        apple: {
          blue: '#007AFF',
          'blue-dark': '#0056CC',
          green: '#34C759',
          orange: '#FF9500',
          red: '#FF3B30',
          purple: '#AF52DE',
          pink: '#FF2D92',
          yellow: '#FFCC02',
          gray: {
            50: '#F5F5F7',
            100: '#E5E5E7',
            200: '#D1D1D6',
            300: '#C7C7CC',
            400: '#AEAEB2',
            500: '#8E8E93',
            600: '#636366',
            700: '#48484A',
            800: '#3A3A3C',
            900: '#1C1C1E',
          },
        },
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 3px 6px rgba(0, 0, 0, 0.12), 0 3px 4px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 10px 15px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.08)',
        'apple-xl': '0 20px 25px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.1)',
        'apple-2xl': '0 25px 50px rgba(0, 0, 0, 0.25), 0 15px 15px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-apple': 'linear-gradient(135deg, #007AFF, #AF52DE)',
        'gradient-apple-blue': 'linear-gradient(135deg, #007AFF, #0056CC)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}; 