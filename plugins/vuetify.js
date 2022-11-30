import { createVuetify } from "vuetify";
import { VTable } from "vuetify/components/VTable";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components: {
            VTable,
        },
    });
    nuxtApp.vueApp.use(vuetify);
});
