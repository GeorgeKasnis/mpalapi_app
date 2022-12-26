import { defineStore } from "pinia";

export const useGamesStore = defineStore("games", {
    state: () => ({
        tableContent: {
            columns: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "team_a",
                    label: "ΟΜΑΔΑ ΕΝΤΟΣ",
                },
                {
                    field: "team_b",
                    label: "ΟΜΑΔΑ ΕΚΤΟΣ",
                },
                {
                    field: "result",
                    label: "ΒΑΘΜΟΙ",
                },
                {
                    field: "delete",
                },
            ],
            rows: [],
        },
        teams: {},
        teamOptions: [],
        championshipsOptions: [],
        championships: {},
        game: {
            teamA: null,
            teamB: null,
            goalsA: null,
            goalsB: null,
            championshipId: null,
        },
        games: {},
        itemForDelete: null,
    }),
    actions: {
        async getGames() {
            const config = useRuntimeConfig();
            this.tableContent.rows = [];
            await $fetch(`${config.BASE_URL}/api/games`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element) => {
                    this.tableContent.rows.push({
                        id: element.id,
                        team_a: element.team_a.name,
                        team_b: element.team_b.name,
                        result: `${element.team_a_goals} - ${element.team_b_goals}`,
                    });
                });
                console.log("table", this.tableContent);
                console.log("loading", this.loading);
                this.loading = false;
                console.log("loading", this.loading);
            });
        },
        async getTeams() {
            const config = useRuntimeConfig();
            await $fetch(`${config.BASE_URL}/api/teams`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element) => {
                    this.teamOptions.push({
                        id: element.id,
                        name: element.name,
                    });
                });
                this.teams = response;
                this.loading = false;
            });
        },
        async getChampionships() {
            this.championships = [];
            this.championshipsOptions = [];
            const config = useRuntimeConfig();
            await $fetch(`${config.BASE_URL}/api/championships?status=open`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element) => {
                    this.championshipsOptions.push({
                        id: element.id,
                        name: element.title,
                    });
                });
                this.championships = response;
                this.loading = false;
            });
        },
        buildGame() {
            let gamePayload = {
                team_a_id: this.game.teamA,
                team_b_id: this.game.teamB,
                team_a_goals: this.game.goalsA,
                team_b_goals: this.game.goalsB,
            };
            if (this.game.championshipId != null) {
                gamePayload.championship_id = this.game.championshipId;
            }
            return JSON.stringify(gamePayload);
        },
        async createGame() {
            const config = useRuntimeConfig();
            this.buildGame();
            await $fetch(`${config.BASE_URL}/api/games`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: this.buildGame(),
            }).then(() => {
                this.getGames();
                this.isOpen = false;
                this.game.teamA = null;
                this.game.teamB = null;
                this.game.goalsA = null;
                this.game.goalsB = null;
                this.game.championshipId = null;
            });
        },
        async deleteGame(id) {
            const config = useRuntimeConfig();
            await $fetch(`${config.BASE_URL}/api/games/${this.itemForDelete}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(() => {
                this.getGames();
            });
        },
        confirmDelete(id) {
            this.itemForDelete = id;
            console.log(this.itemForDelete);
        },
    },
});
