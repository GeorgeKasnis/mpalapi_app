<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">{{ player.name }}</h1>
        <h2 class="text-2xl text-center mb-8 font-bold text-primary">{{ player.number }}</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            player: {},
            baseUrl: "",
        };
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getPlayer(route.params.id);
    },
    methods: {
        async getPlayer(id) {
            await $fetch(`${this.baseUrl}/api/players/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => (this.player = response));
        }
    }
};
</script>
