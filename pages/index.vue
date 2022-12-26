<template>
    <div class="grid grid-cols-12 tablet:flex tablet:flex-col-reverse gap-16">
        <div class="col-span-5">
            <div class="text-3xl font-bold mb-6">Επόμενα Παιχνίδια</div>

            <div class="allnotfirst:mt-8">
                <div class="flex items-center gap-8 bg-[#3E0440] rounded-md p-16 tablet:m-8">
                    <div><img src="~/assets/images/aetoi@2x.png" alt="" /></div>
                    <div class="text-8xl">vs</div>
                    <div><img src="~/assets/images/eyez@2x.png" alt="" /></div>
                </div>
                <div class="flex items-center gap-8 bg-[#3E0440] rounded-md p-16 tablet:m-8">
                    <div><img src="~/assets/images/aetoi@2x.png" alt="" /></div>
                    <div class="text-8xl">vs</div>
                    <div><img src="~/assets/images/eyez@2x.png" alt="" /></div>
                </div>
            </div>
        </div>
        <div class="col-span-7">
            <div class="text-3xl font-bold mb-6">Τελευταία Αποτελέσματα</div>
            <div class="relative h-full">
                <vue-good-table :columns="tableContent.columns" :rows="tableContent.rows">
                    <template #emptystate> <UISecondaryLoadingSpinner /> </template>
                </vue-good-table>
                <UIBaseLoadingSpinner v-if="loading" />
            </div>
        </div>
    </div>
</template>

<script>
import { useGamesStore } from "~/stores/games";
import { mapActions } from "pinia";
import { mapState } from "pinia";

export default {
    methods: {
        ...mapActions(useGamesStore, ["getGames"]),
    },
    mounted() {
        this.getGames();
    },
    computed: {
        ...mapState(useGamesStore, ["tableContent"]),
    },
};
</script>
