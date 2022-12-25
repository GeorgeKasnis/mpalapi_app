import { defineStore } from "pinia";

export const usePlayersStore = defineStore("players", {
    state: () => ({
        players: [],
        loading: true,
        confirmationIsOpen: false,
        itemForDelete: "",
        player: {
            name: "",
            number: "",
        },
    }),
    actions: {
        async getPlayers() {
            const config = useRuntimeConfig();
            this.baseUrl = config.BASE_URL;
            await $fetch(`${this.baseUrl}/api/players`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                this.players = response;
                this.loading = false;
            });
        },

        async addPlayer() {
            const config = useRuntimeConfig();
            this.baseUrl = config.BASE_URL;
            $fetch(`${this.baseUrl}/api/players`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.player),
            })
                .then((response) => console.log(JSON.stringify(response)))
                .then(() => this.getPlayers())
                .then(() => {
                    this.isOpen = false;
                    this.player.name = "";
                    this.player.number = "";
                    console.log("thisisopen",this.isOpen);
                });
        },
        async detachPlayer(id) {
            await $fetch(`${this.baseUrl}/api/players/${id}`, {
                method: "DELETE",
            }).then(() => {
                this.getPlayers();
            });
            this.confirmationIsOpen = false;
        },
        confirmDelete(id) {
            this.confirmationIsOpen = true;
            this.itemForDelete = id;
        },
    },
});
