/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss/plugin')} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            quicksand: ["Quicksand", "sans-serif"],
        },
        extend: {
            colors : {
                "form-background-primary" : "var(--form-background-primary-color)",
                "form-background-lighter" : "var(--form-background-lighter-color)",
            },
            backgroundImage: {
                "form-background-gradient":
                    // "linear-gradient(90deg, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.1) 100%);",
                    "linear-gradient(90deg, rgba(0,0,0,1) 10%,rgba(0,0,0,0.5) 100%, rgba(0,0,0,0.5) 100%);",
            },
        },
    },
    plugins: [
        plugin(function ({ matchVariant }) {
            matchVariant("min", (value) => `@media (min-width: ${value})`, {
                sort(a, z) {
                    return parseInt(a) - parseInt(z);
                },
            });
            matchVariant("max", (value) => `@media (max-width: ${value})`, {
                sort(a, z) {
                    return parseInt(a) - parseInt(z);
                },
            });
        }),
    ],
};
