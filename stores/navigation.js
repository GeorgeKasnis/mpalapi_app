import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", {
    state: () => ({
        isOpen: false,
    }),
    actions: {
        closeNav() {
            this.isOpen = false;
        },
        openNav() {
            this.isOpen = true;
        },
    },
});
