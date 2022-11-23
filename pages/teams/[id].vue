<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">{{ team.name }}</h1>

        <h2 class="text-2xl text-center mb-8 font-bold text-primary">Team Players</h2>

        <ButtonsAddBtn  v-if="team.players" @click="isOpen = true" />

        <div class="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div v-for="(player, index) in team.players" :key="index">
                <UIBaseCard :number="player.number" deletable="true" @delete="detatchPlayer(player.id)" :link="`/players/${player.id}`" :name="player.name" />
            </div>
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Player to this team</h2>
                <form @submit.prevent="attachPlayer" class="[&>*]:mb-4">
                    <div>
                        <select v-model="playerId" class="border w-full text-black">
                            <option :value="player.id" v-for="(player, index) in allPlayers" :key="index">{{ player.name }}</option>
                        </select>
                    </div>
                    <ButtonsBaseBtn name="Add Player" />
                </form>
            </UIBaseModal>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            team: {},
            allPlayers: {},
            isOpen: false,
            playerId: null,
            baseUrl: null,
        };
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getTeam(route.params.id);
        this.getAllPlayers();
    },
    methods: {
        async getTeam(id) {
            await $fetch(`${this.baseUrl}/api/teams/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => (this.team = response));
        },
        async attachPlayer() {
            $fetch(`${this.baseUrl}/api/teams/${this.team.id}/players`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: {
                    player_id: this.playerId,
                },
            }).then((response) => {
                console.log(response);
                this.playerId = null;
                this.isOpen = false;
                this.getTeam(this.team.id);
            });
        },
        async detatchPlayer(id) {
            $fetch(`${this.baseUrl}/api/teams/${this.team.id}/players/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(() => this.getTeam(this.team.id));
        },
        async getAllPlayers() {
            $fetch(`${this.baseUrl}/api/players`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => (this.allPlayers = response));
        },
    },
};
</script>
