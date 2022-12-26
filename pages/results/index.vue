<template>
    <div class="min-h-[20rem]">
        <transition name="fade-in-out">
            <vue-good-table v-if="!loading" :columns="tableContent.columns" :rows="tableContent.rows">
                <template #emptystate> <UISecondaryLoadingSpinner /> </template
            ></vue-good-table>
        </transition>

        <UIBaseLoadingSpinner v-if="loading" />
    </div>
</template>

<script>
import { useResultsStore } from "~/stores/results";
import { mapActions } from "pinia";
import { mapState } from "pinia";

export default {
    methods: {
        ...mapActions(useResultsStore, ["getResults"]),
    },
    mounted() {
        this.getResults();
    },
    computed: {
        ...mapState(useResultsStore, ["tableContent"]),
    },
};
</script>
