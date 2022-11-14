<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">{{ team.name }}</h1>

        <h2 class="text-2xl text-center mb-8 font-bold text-primary">Team Players</h2>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <div class="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <!-- <div noPadding="true" class="text-xl text-primary bg-secondary relative py-8" v-for="(player, index) in team.players" :key="index">
                <nuxt-link to="#" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0  after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-40 after:transition-all">
                    <div class="text-center px-4 transition rounded-t-full py-2 block ">{{ player.name }}</div>
                    <div class="text-center px-4 transition rounded-t-full py-2 block ">{{ player.number }}</div>
                </nuxt-link>
                <button class="absolute right-2 top-2 w-8 h-8 rotate-45 text-red-800 bg-white/10 rounded-full grid place-items-center">+</button>
            </div> -->
            <UIBaseCard img-src ="https://media.fast4foos.org/photos/players/84000895.jpg" number="7" link="/players/player1" deletable="true" @delete="detatchPlayer" name="George" />
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Player to this team</h2>
                <form @submit.prevent="attachPlayer" class="[&>*]:mb-4">
                    <div>
                        <select v-model="player.name" class="border w-full text-black">
                            <option value="{{player.id}}" v-for="(player, index) in allPlayers" :key="index">{{ player.name }}</option>
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
            player: {
                name: "",
            },
        };
    },
    mounted() {
        const route = useRoute();
        this.getTeam(route.params.id);
        this.getAllPlayers();
    },
    methods: {
        async getTeam(id) {
            await $fetch("http://127.0.0.1:8000/api/teams/" + id, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => (this.team = response));
        },
        async attachPlayer() {
            $fetch(`http://127.0.0.1:8000/api/teams/${this.team.id}/players`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: {
                    player_id: 1,
                },
            })
                .then((response) => {
                    //notify
                })
                .then(() => {
                    this.isOpen = false;
                })
                .then((response) => (this.team = response));
        },
        async detatchPlayer() {
            $fetch(`http://127.0.0.1:8000/api/teams/${this.team.id}/players`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(() => (this.team = this.getTeam(this.team.id)));
        },
        async getAllPlayers() {
            $fetch(`http://127.0.0.1:8000/api/players/`, {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => (this.allPlayers = response));
        },
    },
};
</script>
