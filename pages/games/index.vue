<template>
    <div>
        <UIBaseAdd @click="isOpen = true" class="" name="Add Game" />

        <transition name="fade-in-out">
            <div class="relative h-full">
                <TablesBaseTable v-if="!loading" :table-content="tableContent" />
                <UIBaseLoadingSpinner v-if="loading" />
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="createGame" class="[&>*]:mb-4">
                    <div>
                        <label
                            >Team A
                            <select placeholder="Team A" v-model="game.teamA" class="border w-full text-black">
                                <option :value="team.id" v-for="(team, index) in teams" :key="index">{{ team.name }}</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label
                            >Team B
                            <select placeholder="Team B" v-model="game.teamB" class="border w-full text-black">
                                <option :value="team.id" v-for="(team, index) in teams" :key="index">{{ team.name }}</option>
                            </select>
                        </label>
                    </div>
                    <div><input v-model="game.goalsA" class="border text-white" placeholder="Team A goals" type="number" /></div>
                    <div><input v-model="game.goalsB" class="border text-white" placeholder="Team B goals" type="number" /></div>
                    <div>
                        <label
                            >Select Championship
                            <select placeholder="Championship" v-model="game.championshipId" class="border w-full text-black">
                                <option :value="null">Friendly Match</option>
                                <option :value="championship.id" v-for="(championship, index) in championships" :key="index">{{ championship.title }}</option>
                            </select>
                        </label>
                    </div>
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
                this.teams = response;
                this.loading = false;
            });
        },
        async getGames() {
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
            }).then((response) => {
                console.log(response);
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
