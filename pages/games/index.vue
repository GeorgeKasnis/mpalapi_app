<template>
    <div>
        <div class="flex">
            <UIBaseAdd @click="isOpen = true" class="" name="Add Game" />
        </div>

        <transition name="fade-in-out">
            <div class="relative h-full">
                <vue-good-table v-if="!loading" :columns="tableContent.columns" :rows="tableContent.rows">
                    <template #table-row="props">
                        <span v-if="props.column.field == 'delete'">
                            <TablesDeleteChip
                                @click="
                                    confirmDelete(props.row.id);
                                    confirmationIsOpen = true;
                                " />
                        </span>
                    </template>
                    <template #emptystate> <UISecondaryLoadingSpinner /> </template>
                </vue-good-table>
                <UISecondaryLoadingSpinner v-if="loading" />
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form
                    @submit.prevent="
                        createGame();
                        isOpen = false;
                    "
                    class="[&>*]:mb-4">
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
            <UIBaseConfirmationModal
                v-if="confirmationIsOpen"
                @delete-item="
                    deleteGame();
                    confirmationIsOpen = false;
                "
                @close-modal="confirmationIsOpen = false" />
        </transition>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import { useGamesStore } from "~/stores/games";
export default {
    data() {
        return {
            select: "",
            items: [],
            baseUrl: null,
            isOpen: false,
            confirmationIsOpen: false,
            itemForDelete: "",
        };
    },
    mounted() {
        this.getChampionships();
        this.getTeams();
        this.getGames();
    },
    methods: {
        ...mapActions(useGamesStore, ["getGames", "getTeams", "getChampionships", "createGame"]),
        ...mapActions(useGamesStore, ["deleteGame"]),
        ...mapActions(useGamesStore, ["confirmDelete", ["id"]]),
    },
    computed: {
        ...mapState(useGamesStore, ["tableContent", "loading", "teams", "teamOptions", "championshipsOptions", "championships", "games", "game"]),
    },
};
</script>
