/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#f6f7f9',
        primary: '#ffe14c',
        'dark-gray': '#2a3751',
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
