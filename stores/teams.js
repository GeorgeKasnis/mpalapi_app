import { defineStore } from "pinia";

export const useTeamsStore = defineStore("teams", {
    state: () => ({
        tableContent: {
            columns: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "image",
                    width: '5rem',
                },
                {
                    field: "name",
                    width: "85%"
                },
                {
                    field: "edit",
                },
                {
                    field: "delete",
                },
            ],
            rows: [],
        },
        itemForDelete: "",
        name: "",
    }),
    actions: {
        async getTeams() {
            const config = useRuntimeConfig();
            this.tableContent.rows = [];
            await $fetch(`${config.BASE_URL}/api/teams`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element) => {
                    this.tableContent.rows.push({
                        id: element.id,
                        image: "https://cdn.pixabay.com/photo/2016/12/26/18/33/logo-1932539__340.png",
                        name: element.name,
                    });
                });
            });
        },
        async addTeam(nametwo) {
            const config = useRuntimeConfig();
            await $fetch(`${config.BASE_URL}/api/teams`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: nametwo }),
            })
                .then((response) => console.log(JSON.stringify(response)))
                .then(() => this.getTeams());
                this.name = ""
        },
        async deleteTeam(id) {
            const config = useRuntimeConfig();
            await $fetch(`${config.BASE_URL}/api/teams/${this.itemForDelete}`, {
                method: "DELETE",
            }).then(() => this.getTeams());
            this.name = "";
        },
        confirmDelete(id) {
            this.itemForDelete = id;
        },
    },
});
