<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">{{ game.team_a.id }} - {{ game.team_b.id }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            game: {}
        };
    },
    mounted() {
        const route = useRoute();
        this.getGame(route.params.id);
    },
    methods: {
        async getGame(id) {
            await $fetch(`http://127.0.0.1:8000/api/games/${id}`, {
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
