<template>
    <div class="min-h-[20rem]">
        <transition name="fade-in-out">
            <vue-good-table v-if="!loading" :columns="tableContent.columns" :rows="tableContent.rows"></vue-good-table>
        </transition>

        <UIBaseLoadingSpinner v-if="loading" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            results: {},
            loading: true,
            baseUrl: null,
            tableContent: {
                columns: [
                    {
                        field: "position",
                        label: "ΘΕΣΗ",
                    },
                    {
                        field: "team",
                        label: "ΟΜΑΔΑ",
                    },
                    {
                        field: "points",
                        label: "ΒΑΘΜΟΙ",
                    },
                ],
                rows: [],
            },
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getResults();
    },
    methods: {
        async getResults() {
            await $fetch(`${this.baseUrl}/api/results`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                this.results = response;
                response.forEach((element, index) => {
                    this.tableContent.rows.push({
                        position: index + 1,
                        team: element.name,
                        points: element.points,
                    });
                });
                this.loading = false;
                console.log(response);
            });
        },
    },
};
</script>
