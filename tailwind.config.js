/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#f6f7f9',
        primary: '#ffe14c',
        'dark-blue-gray': '#2a3751',
        'blue-gray': '#30405f',
        'light-blue-gray': '#3e5279',
      },
      backgroundImage: {
        'login-bg': "url('/src/assets/images/login.jpg')",
      },
      maxWidth: {
        '3/4': '75%',
      },
      minWidth: {
        '1/2': '50%',
        '3/4': '75%',
        '2/5': '40%',
      },
    },
  },
  plugins: [],
};
