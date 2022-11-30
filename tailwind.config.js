/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        'screen-nav': 'calc(100vh - 68px)',
        'screen-chat': 'calc(100vh - 64px)',
        'screen-chat-input': 'calc(100vh - 112px)',
        'screen-chat-wide': 'calc(100vh - 48px)',
        'screen-user-search': 'calc(100vh - 40px)',
        'screen-user-wide': 'calc(100vh - 122px)',
      },
      minHeight: {
        'screen-nav': 'calc(100vh - 64px)',
        'screen-user': 'calc(100vh - 186px)',
        'screen-user-nav': 'calc(100vh - 122px)',
        'screen-chat': 'calc(100vh - 112px)',
        'screen-chat-wide': 'calc(100vh - 48px)',
      },
      maxHeight: {
        'screen-user-search': 'calc(100vh - 40px)',
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
