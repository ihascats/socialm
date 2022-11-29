/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        'screen-nav': 'calc(100vh - 68px)',
        'screen-chat': 'calc(100vh - 112px)',
      },
      minHeight: {
        'screen-nav': 'calc(100vh - 64px)',
        'screen-user': 'calc(100vh - 186px)',
        'screen-chat': 'calc(100vh - 112px)',
      },
    },
  },
  plugins: [],
  'tailwindCSS.includeLanguages': {
    javascript: 'javascript',
    html: 'HTML',
  },
  'editor.quickSuggestions': {
    strings: true,
  },
};
