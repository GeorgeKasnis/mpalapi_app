/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [],
    theme: {
        extend: {
            colors: {
                primary: "#9656B3",
                secondary: "#B98ECC",
                third: "#a979bd",
            },
            screens: {
                mobile: { max: "575px" },
                tablet: { max: "991px" },
            },
        },
    },
    plugins: [],
};
