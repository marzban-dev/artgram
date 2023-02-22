/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss/plugin')} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layouts/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            lato: ["Lato", "sans-serif"],
        },
        extend: {
            colors: {
                "form-background-primary": "var(--form-background-primary-color)",
                "form-background-lighter": "var(--form-background-lighter-color)",
                "art-primary": "var(--art-primary-color)",
                "art-lighter": "var(--art-lighter-color)",
                "profile-primary": "var(--profile-primary-color)",
                "profile-lighter": "var(--profile-lighter-color)",
            },
            backgroundImage: {
                "form-background-gradient":
                    "linear-gradient(90deg, rgba(0,0,0,1) 10%,rgba(0,0,0,0.5) 100%, rgba(0,0,0,0.5) 100%);",
                "profile-background-gradient": "linear-gradient(90deg, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0) 100%);",
                "art-post-background-gradient": "linear-gradient(0deg, rgba(0,0,0,1) 15%, rgba(0,0,0,0.8) 100%);",
                "art-like-button-gradient": "linear-gradient(-30deg, rgba(0,0,0,0.85) 2%, rgba(0,0,0,0) 50%);",
                "explore-search-gradient": "linear-gradient(0deg, rgba(0,0,0,0.8) 2%, rgba(0,0,0,0) 100%);",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        plugin(function ({ matchVariant }) {
            matchVariant("min", (value) => `@media (min-width: ${value})`, {
                sort(a, z) {
                    return parseInt(a) - parseInt(z);
                },
            });
        }),
        plugin(function ({ matchVariant }) {
            matchVariant("max", (value) => `@media (max-width: ${value})`, {
                sort(a, z) {
                    return parseInt(a) - parseInt(z);
                },
            });
        }),
    ],
};
