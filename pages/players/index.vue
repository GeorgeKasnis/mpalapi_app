<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">Players</h1>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <div class="grid grid-cols-2 gap-8 max-w-xl mx-auto">
            <UIBaseCard v-for="(player, index) in players" :key="index" :number="player.number" link="/players/player1" deletable="true" @delete="detachPlayer(player.id)" :name="player.name" />
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-4 text-center">Add Player</h2>
                <form @submit.prevent="addPlayer" class="[&>*]:mb-4">
                    <div>
                        <div class="mb-4"><input v-model="player.name" class="border" placeholder="Player name" type="text" /></div>
                        <div><input v-model="player.number" class="border" placeholder="Player number" type="text" /></div>
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
            players: {},
            player: {
                name: null,
                number: null,
            },
            isOpen: false,
            baseUrl: "",
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getPlayers();
    },
    methods: {
        async getPlayers() {
            await $fetch(`${this.baseUrl}/api/players`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => (this.players = response));

            console.log(this.players);
        },
        async addPlayer() {
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
                });
        },
        async detachPlayer(id) {
            await $fetch(`${this.baseUrl}/api/players/${id}`, {
                method: "DELETE",
            }).then(() => {
                this.getPlayers();
            });
        },
    },
};
</script>
