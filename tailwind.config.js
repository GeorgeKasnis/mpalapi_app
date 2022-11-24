/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [],
    theme: {
        extend: {
            colors: {
                primary: "#4E0351",
                secondary: "#FC2C80",
                dark: "#39003B",
            },
            screens: {
                mobile: { max: "575px" },
                tablet: { max: "991px" },
            },
            backgroundImage: {
                "bolt-image": "url('~/assets/images/stripes.svg')",
            },
        },
    },
    plugins: [],
};
