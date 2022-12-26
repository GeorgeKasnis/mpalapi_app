<template>
    <div>
        <div class="flex">
            <UIBaseAdd @click="isOpen = true" class="" name="Add Team" />
        </div>

        <!-- <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(team, index) in teams" :key="index" :name="team.name" :link="'teams/' + team.id" @delete="confirmDelete(team.id)" deletable="true" />
            </div>
        </transition> -->

        <transition name="fade-in-out">
            <div class="relative h-full">
                <vue-good-table :columns="tableContent.columns" :rows="tableContent.rows">
                    <template #emptystate> <UISecondaryLoadingSpinner /> </template>
                    <template #table-row="props">
                        <span v-if="props.column.field == 'edit'">
                            <TablesShowChip :link="'teams/' + props.row.id" />
                        </span>
                        <span v-else-if="props.column.field == 'delete'">
                            <TablesDeleteChip
                                @click="
                                    confirmDelete(props.row.id);
                                    confirmationIsOpen = true;
                                " />
                        </span>
                        <span v-else-if="props.column.field == 'image'">
                            <img class="w-10 h-10 object-contain" :src="props.row.image" alt="" />
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="addTeam(nametwo) ; nametwo =''" class="[&>*]:mb-4">
                    <v-text-field placeholder="Team name" v-model="nametwo" type="text"></v-text-field>
                    <ButtonsBaseBtn @click="isOpen = false" name="Add Team" />
                </form>
            </UIBaseModal>
        </transition>

        <transition name="fade-in-out">
            <UIBaseConfirmationModal
                v-if="confirmationIsOpen"
                @delete-item="
                    deleteTeam(itemForDelete);
                    confirmationIsOpen = false;
                "
                @close-modal="confirmationIsOpen = false" />
        </transition>
    </div>
</template>

<script>
import { useTeamsStore } from "~/stores/teams";
import { mapActions } from "pinia";
import { mapState } from "pinia";
export default {
    data() {
        return {
            isOpen: false,
            confirmationIsOpen: false,
            nametwo: "",
        };
    },
    mounted() {
        this.getTeams();
    },
    methods: {
        ...mapActions(useTeamsStore, ["getTeams", "deleteTeam", "addTeam"]),
        ...mapActions(useTeamsStore, ["confirmDelete", ["id"]]),
        ...mapActions(useTeamsStore, ["addTeam", ["nametwo"]]),
    },
    computed: {
        ...mapState(useTeamsStore, ["tableContent", "name"]),
    },
};
</script>
