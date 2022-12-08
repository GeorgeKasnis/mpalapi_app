import VueGoodTablePlugin from "vue-good-table-next";

// import the styles
import "vue-good-table-next/dist/vue-good-table-next.css";

// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.component("vue-good-table", VueGoodTablePlugin, {});
// });

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGoodTablePlugin);
});
