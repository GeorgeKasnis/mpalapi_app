<template>
    <div class="min-h-[20rem]">
        <transition name="fade-in-out">
            <TablesBaseTable v-if="!loading" :table-content="tableContent" />
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
                rows: ["ΘΕΣΗ", "ΟΜΑΔΑ", "ΒΑΘΜΟΙ"],
                columns: [],
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
                response.forEach((element,index) => {
                    this.tableContent.columns.push({
                        position: index+1,
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
