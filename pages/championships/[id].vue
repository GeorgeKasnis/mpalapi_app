<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-main">{{ championship.title }}</h1>
        <h2 class="text-2xl text-center mb-8 font-bold text-main">{{ championship.finished_at == null ? "" : `Closed at ${championship.finished_at}` }}</h2>
        <ButtonsBaseBtn class="mx-auto block " v-if="championship.finished_at == null" @click="closeChampionship(championship.id)" name="Close Championship"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
</svg>
</ButtonsBaseBtn>
        <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(team, index) in championship.results" :key="index" :name="team.name" :number="team.points" :link="`/teams/${team.id}`" />
            </div>
        </transition>
        <h1 class="mt-5 text-2xl text-center mb-8 font-bold text-main">Games</h1>

        <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(game, index) in championship.games" :key="index" :link="`/games/${game.id}`" :name="`${game.team_a.name} ${game.team_a_goals} - ${game.team_b_goals} ${game.team_b.name}`" />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            championship: {},
            baseUrl: "",
        };
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getChampionship(route.params.id);
    },
    methods: {
        async getChampionship(id) {
            await $fetch(`${this.baseUrl}/api/championships/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                this.championship = response;
            });
        },
        async closeChampionship(id) {
            await $fetch(`${this.baseUrl}/api/championships/${id}/close`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(() => {
                this.getChampionship(this.championship.id);
            });
        },
    },
};
</script>
