<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">Teams</h1>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(team, index) in teams" :key="index" :name="team.name" :link="'teams/' + team.id" @delete="deleteTeam(team.id)" deletable="true" />
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="addTeam" class="[&>*]:mb-4">
                    <div><input v-model="name" class="border text-white" placeholder="Team name" type="text" /></div>
                    <ButtonsBaseBtn name="Add Team" />
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
            teams: {},
            name: "",
            isOpen: false,
            loading: true,
            baseUrl: "",
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getTeams();
    },
    methods: {
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
                console.log(this.teams);
        },
        async addTeam() {
            await $fetch(`${this.baseUrl}/api/teams`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: this.name }),
            })
                .then((response) => console.log(JSON.stringify(response)))
                .then(() => this.getTeams());

            this.isOpen = false;
            this.name = "";
        },
        async deleteTeam(id) {
            await $fetch(`${this.baseUrl}/api/teams/${id}`, {
                method: "DELETE",
            }).then(() => this.getTeams());

            this.isOpen = false;
            this.name = "";
        },
    },
};
</script>
