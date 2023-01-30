import { defineNuxtPlugin } from "#app";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3EasyDataTable);
});
