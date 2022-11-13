// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss"],

    css: ["~/assets/css/index.css"],

    app: {
        head: {
            title: "Balapi",
            htmlAttrs: {
                lang: "en",
            },
            meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],
        },
    },
});
