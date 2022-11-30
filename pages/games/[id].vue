<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-main">{{ game.team_a.id }} - {{ game.team_b.id }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            game: {},
            baseUrl: ""
        };
    },
    mounted() {
        const route = useRoute();
        this.getGame(route.params.id);
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
    },
    methods: {
        async getGame(id) {
            await $fetch(`${this.baseUrl}/api/games/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                this.game = response
            });
        }
    }
};
</script>
