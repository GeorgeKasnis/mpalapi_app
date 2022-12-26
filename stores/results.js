import { defineStore } from "pinia";

export const useResultsStore = defineStore("results", {
    state: () => ({
        tableContent: {
            columns: [
                {
                    field: "position",
                    label: "ΘΕΣΗ",
                },
                {
                    field: "team",
                    label: "ΟΜΑΔΑ",
                },
                {
                    field: "points",
                    label: "ΒΑΘΜΟΙ",
                },
            ],
            rows: [],
        },
    }),
    actions: {
        async getResults() {
            this.tableContent.rows = []
            const config = useRuntimeConfig();
            await $fetch(`${config.BASE_URL}/api/results`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element, index) => {
                    this.tableContent.rows.push({
                        position: index + 1,
                        team: element.name,
                        points: element.points,
                    });
                });
            });
        },
    },
});
