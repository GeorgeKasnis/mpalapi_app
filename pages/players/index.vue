<template>
    <div>
        <div class="flex">
            <UIBaseAdd @click="openModal" class="" name="Add Player" />
        </div>

        <!-- <div class="grid grid-cols-1 gap-8 max-w-xl mx-auto">
            <UIBaseCard v-for="(player, index) in players" :key="index" :number="player.number" :link="`/players/${player.id}`" deletable="true" @delete="confirmDelete(player.id)" :name="player.name" />
        </div> -->

        <div class="grid grid-cols-4 mobile:grid-cols-2 gap-4 mt-8 relative">
            <div class="relative group" v-for="(player, index) in players" :key="index">
                <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" class="aspect-[1] object-cover" alt="" />
                <div class="bg-[#4E0351] p-3 text-center">
                    <div class="font-thin">
                        <span class="truncate block line-clamp-1 mx-auto">{{ player.name }}</span> {{ player.number }}
                    </div>
                </div>
                <div class="text-end mb-0">
                    <button @click="confirmDelete(player.id)" class="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 rotate-45 ml-auto absolute top-3 right-3 bg-white/20 hover:bg-white/40 w-8 h-8 rounded-full grid place-items-center transition-all duration-200">+</button>
                </div>
            </div>
            <UIBaseLoadingSpinner v-if="loading" />
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
import { mapState } from "pinia";
import { usePlayersStore } from "~/stores/players";
import { mapActions } from "pinia";
import { mapGetters } from "pinia";
export default {
    data() {
        return {
            // players: {},
            baseUrl: "",
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getPlayers();
    },
    methods: {
        ...mapActions(usePlayersStore, ["getPlayers"]),
        ...mapActions(usePlayersStore, ["detachPlayer"], ["id"]),
        ...mapActions(usePlayersStore, ["confirmDelete"], ["id"]),
        ...mapActions(usePlayersStore, ["addPlayer"]),
        ...mapGetters(usePlayersStore, ["openModal"]),
    },
    computed: {
        ...mapState(usePlayersStore, ["players"]),
        ...mapState(usePlayersStore, ["loading"]),
        ...mapState(usePlayersStore, ["confirmationIsOpen"]),
        ...mapState(usePlayersStore, ["itemForDelete"]),
        ...mapState(usePlayersStore, ["player"]),
        ...mapState(usePlayersStore, ["isOpen"]),
    },
};
</script>
