<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">Results</h1>

        <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(team, index) in results" :key="index" :name="team.name" :number="team.points" :link="`/teams/${team.id}`"/>
            </div>
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
            })
                .then((response) => {
                    this.results = response;
                    this.loading = false;
                });
                
        }
    },
};
</script>
