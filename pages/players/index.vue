<template>
    <div>
        <div class="flex">
            <UIBaseAdd @click="isOpen = true" class="" name="Add Player" />
        </div>

        <!-- <div class="grid grid-cols-1 gap-8 max-w-xl mx-auto">
            <UIBaseCard v-for="(player, index) in players" :key="index" :number="player.number" :link="`/players/${player.id}`" deletable="true" @delete="confirmDelete(player.id)" :name="player.name" />
        </div> -->

        <div class="grid grid-cols-4 gap-4 mt-8">
            <div class="relative group" v-for="(player, index) in players" :key="index">
                <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" class="aspect-[1] object-cover" alt="" />
                <div class="bg-[#4E0351] p-3 text-center">
                    <div class="font-thin">{{ player.name }} {{ player.number }}</div>
                    <div>Your eyes fc</div>
                </div>
                <div class="text-end mb-0"><button @click="confirmDelete(player.id)" class="opacity-0 translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 rotate-45 ml-auto absolute top-3 right-3 bg-white/20 hover:bg-white/40 w-8 h-8 rounded-full grid place-items-center transition-all duration-200">+</button></div>
            </div>
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-4 text-center">Add Player</h2>
                <form @submit.prevent="addPlayer" class="[&>*]:mb-4">
                    <div>
                        <v-text-field v-model="player.name" placeholder="Player name" type="text"></v-text-field>
                        <v-text-field v-model="player.number" placeholder="Player number" type="number"></v-text-field>
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
            players: {},
            player: {
                name: null,
                number: null,
            },
            isOpen: false,
            baseUrl: "",
            confirmationIsOpen: false,
            itemForDelete: "",
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
            this.confirmationIsOpen = false;
        },
        confirmDelete(id) {
            this.confirmationIsOpen = true;
            this.itemForDelete = id;
        },
    },
};
</script>
