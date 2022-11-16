<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">Games</h1>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <transition name="fade-in-out">
            <div class="grid grid-cols-2 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <!-- <UIBaseCard v-for="(championship, index) in championships" :key="index" :name="championship.title" :link="`/championships/${championship.id}`" @delete="deleteChampionship(championship.id)" deletable="true" /> -->
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="createGame" class="[&>*]:mb-4">
                    <div>
                        <label
                            >Team A
                            <select placeholder="Team A" v-model="teamA" class="border w-full text-black">
                                <option :value="team.id" v-for="(team, index) in teams" :key="index">{{ team.name }}</option>
                            </select>
                        </label>
                    </div>
                          <div>
                        <label
                            >Team A
                            <select placeholder="Team A" v-model="teamB" class="border w-full text-black">
                                <option :value="team.id" v-for="(team, index) in teams" :key="index">{{ team.name }}</option>
                            </select>
                        </label>
                    </div>
                    <div><input v-model="teamAScore" class="border text-white" placeholder="Team A goals" type="number" /></div>
                    <div><input v-model="teamBScore" class="border text-white" placeholder="Team B goals" type="number" /></div>
                    <div>
                        <label
                            >Select Championship
                            <select placeholder="Championship" v-model="championshipName" class="border w-full text-black">
                                <option :value="champ.id" v-for="(champ, index) in championships" :key="index">{{ champ.title }}</option>
                            </select>
                        </label>
                    </div>
                    <ButtonsBaseBtn name="Add Game" />
                </form>
            </UIBaseModal>
        </transition>

        <UIBaseLoadingSpinner v-if="loading" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            championships: {},
            teams: "",
            championshipTitle: "",
            isOpen: false,
            loading: true,
            baseUrl: null,
            teamA: "",
            lol: "",
            teamAScore: "",
            teamBScore: "",
            championshipName: null,
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getChampionships();
        this.getTeams();
    },
    methods: {
        async getChampionships() {
            await $fetch(`${this.baseUrl}/api/championships`, {
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
            })
                .then((response) => (this.teams = response))
                .then(() => {
                    this.loading = false;
                });
        },
        async createGame() {
            console.log(this.teamA, this.teamB, this.teamAScore, this.teamBScore, this.championshipName);
            await $fetch(`${this.baseUrl}/api/games`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    team_a_id: this.teamA,
                    team_b_id: this.teamB,
                    team_a_goals: this.teamAScore,
                    team_b_goals: this.teamBScore,
                    championship_id: this.championshipName,
                }),
            })
                .then((response) => {
                    console.log(response);
                })
                .then(() => {
                    this.isOpen = false;
                    this.teamA = "";
                    this.teamB = "";
                    this.teamAScore = "";
                    this.teamBScore = "";
                    this.championshipName = "";
                });
        },
    },
};
</script>
