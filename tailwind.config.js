/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [],
    theme: {
        extend: {
            colors: {
                main: "#4E0351",
                second: "#FC2C80",
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
    plugins: [
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
            addVariant("allnotfirst", "& > *+*");
        },
        require("tailwind-scrollbar"),
        require("@tailwindcss/line-clamp"),
    ],
};
