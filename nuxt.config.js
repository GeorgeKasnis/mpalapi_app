// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/device", "@pinia/nuxt"],
    device: {
        refreshOnResize: true,
    },

    css: ["@fortawesome/fontawesome-svg-core/styles.css", "vuetify/lib/styles/main.sass", "~/assets/css/index.css"],
    build: {
        transpile: ["vuetify"],
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },

    app: {
        head: {
            title: "Balapi",
            htmlAttrs: {
                lang: "en",
            },
            meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],
        },
    },

    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL || 'https://balaki.happyoffline.eu',
        },
    },

    vuetify: {
        treeShake: true,
    },
});
