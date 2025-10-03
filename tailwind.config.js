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
                // Exact colors from the design
                'strong-cyan': 'hsl(172, 67%, 45%)', // Bright green for selected tip and results
                'very-dark-cyan': 'hsl(183, 100%, 15%)', // Dark teal for buttons and results panel
                'dark-grayish-cyan': 'hsl(186, 14%, 43%)', // Text labels
                'grayish-cyan': 'hsl(184, 14%, 56%)', // Input placeholder
                'light-grayish-cyan': 'hsl(185, 41%, 84%)', // Background
                'very-light-grayish-cyan': 'hsl(189, 41%, 97%)', // Input background
                'white': 'hsl(0, 0%, 100%)', // Card background
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