/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: '#3ba7a6',
                secondary: '#026968',
                'text-primary': '#f9fafb',
                'text-secondary': '#9ca3af',
            },
        },
    },
    plugins: [],
}