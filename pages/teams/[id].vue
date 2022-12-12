<template>
    <div>
        <h1 class="text-2xl text-end mb-8 font-bold text-main">{{ team.name }}</h1>

        <div class="flex">
            <UIBaseAdd @click="isOpen = true" class="mb-8" name="Add Player" />
        </div>

        <div class="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div class="relative group" v-for="(player, index) in team.players" :key="index">
                <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" class="aspect-[1] object-cover" alt="" />
                <div class="bg-[#4E0351] p-3 text-center">
                    <div class="font-thin">{{ player.name }} {{ player.number }}</div>
                    <div>Your eyes fc</div>
                </div>
                <div class="text-end mb-0">
                    <button @click="confirmDelete(player.id)" class="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 rotate-45 ml-auto absolute top-3 right-3 bg-white/20 hover:bg-white/40 w-8 h-8 rounded-full grid place-items-center transition-all duration-200">+</button>
                </div>
            </div>
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Player to this team</h2>
                <form @submit.prevent="attachPlayer" class="[&>*]:mb-4">
                    <div>
                        <v-select v-model="playerId" :items="allPlayers" item-title="name" item-value="id" label="Select Player" single-line></v-select>
                    </div>
                    <ButtonsBaseBtn name="Add Player" />
                </form>
            </UIBaseModal>
        </transition>
        <transition name="fade-in-out">
            <UIBaseConfirmationModal v-if="confirmationIsOpen" @delete-item="detachPlayer(itemForDelete)" @close-modal="confirmationIsOpen = false" />
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
            confirmationIsOpen: false,
            itemForDelete: "",
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
        async detachPlayer(id) {
            $fetch(`${this.baseUrl}/api/teams/${this.team.id}/players/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(() => this.getTeam(this.team.id));
            this.confirmationIsOpen = false;
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
        confirmDelete(id) {
            this.confirmationIsOpen = true;
            this.itemForDelete = id;
        },
    },
};
</script>
