/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      minWidth: {
        4: '1rem',
        36: '9rem',
      },
      position: {
        webstick: '-webkit-sticky;',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
