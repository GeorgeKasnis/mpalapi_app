<template>
    <div>
        <div class="flex">
            <UIBaseAdd @click="isOpen = true" class="" name="Add Game" />
        </div>

        <transition name="fade-in-out">
            <div class="relative h-full">
                <TablesBaseTable v-if="!loading" :table-content="tableContent" @delete-row="alert()" />
                <UIBaseLoadingSpinner v-if="loading" />
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="createGame" class="[&>*]:mb-4">
                    <v-select v-model="game.teamA" :items="teamOptions" item-title="name" item-value="id" label="Team A" single-line></v-select>
                    <v-select v-model="game.teamB" :items="teamOptions" item-title="name" item-value="id" label="Team B" single-line></v-select>
                    <v-text-field placeholder="Team A goals" v-model="game.goalsA" type="number"></v-text-field>
                    <v-text-field placeholder="Team B goals" v-model="game.goalsB" type="number"></v-text-field>
                    <v-select v-model="game.championshipId" :items="championshipsOptions" item-title="name" item-value="id" label="Championship" single-line></v-select>
                    <ButtonsBaseBtn name="Add Game" />
                </form>
            </UIBaseModal>
        </transition>
        <transition name="fade-in-out">
            <UIBaseConfirmationModal v-if="confirmationIsOpen" @delete-item="deleteGame(itemForDelete)" @close-modal="confirmationIsOpen = false" />
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            select: "",
            teamOptions: [],
            championshipsOptions: [],
            items: [],
            championships: {},
            teams: {},
            isOpen: false,
            loading: true,
            baseUrl: null,
            game: {
                teamA: null,
                teamB: null,
                goalsA: null,
                goalsB: null,
                championshipId: null,
            },
            games: {},
            confirmationIsOpen: false,
            itemForDelete: "",
            tableContent: {
                rows: ["ΟΜΑΔΑ ΕΝΤΟΣ", "ΟΜΑΔΑ ΕΚΤΟΣ", "ΑΠΟΤΕΛΕΣΜΑΤΑ"],
                columns: [],
            },
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getGames();
        this.getChampionships();
        this.getTeams();
    },
    methods: {
        async getChampionships() {
            await $fetch(`${this.baseUrl}/api/championships?status=open`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                console.log(response);
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
        async getTeams() {
            await $fetch(`${this.baseUrl}/api/teams`, {
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
                console.log(this.teamOptions);
            });
        },
        async getGames() {
            this.tableContent.columns = []
            await $fetch(`${this.baseUrl}/api/games`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element) => {
                    this.tableContent.columns.push({
                        team_a: element.team_a.name,
                        team_b: element.team_b.name,
                        result: `${element.team_a_goals} - ${element.team_b_goals}`,
                    });
                });
                this.games = response;
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
            this.buildGame();
            await $fetch(`${this.baseUrl}/api/games`, {
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
            await $fetch(`${this.baseUrl}/api/games/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(() => {
                this.getGames();
            });
            this.confirmationIsOpen = false;
        },
        confirmDelete(id) {
            this.confirmationIsOpen = true;
            this.itemForDelete = id;
        },
    },
};
</script>
