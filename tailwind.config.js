/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: 'hsl(172, 67%, 45%)', // Green 400
        },
        neutral: {
          900: 'hsl(183, 100%, 15%)', // Green 900
          500: 'hsl(186, 14%, 43%)',  // Grey 500
          400: 'hsl(184, 14%, 56%)',  // Grey 400
          200: 'hsl(185, 41%, 84%)',  // Grey 200
          50: 'hsl(189, 47%, 97%)',   // Grey 50
        },
      },
      fontFamily: {
        'space-mono': ['Space Mono', 'monospace'],
      },
      fontSize: {
        'input': '24px',
      },
    },
  },
  plugins: [],
}