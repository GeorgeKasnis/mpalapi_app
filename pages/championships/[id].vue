<template>
    <div>
      
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">{{ championship.title }}</h1>
        <h2 class="text-2xl text-center mb-8 font-bold text-primary">{{ championship.finished_at == null ? "" : `Closed at ${championship.finished_at}` }}</h2>
        <button v-if="championship.finished_at == null" @click="closeChampionship(championship.id)" class="text-primary mx-auto mb-8 bg-secondary grid place-items-center shadow-md shadow-gray-500">CLOSE CHAMPIONSHIP</button>
        <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(team, index) in championship.results" :key="index" :name="team.name" :number="team.points" :link="`/teams/${team.id}`"/>
            </div>
        </transition>
        <h1 class="mt-5 text-2xl text-center mb-8 font-bold text-primary">Games</h1>

        <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(game, index) in championship.games" :key="index" :link="`/games/${game.id}`" :name="`${game.team_a.name} ${game.team_a_goals} - ${game.team_b_goals} ${game.team_b.name}`" @delete="deleteGame(game.id)" deletable="true" />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            championship: {}
        };
    },
    mounted() {
        const route = useRoute();
        this.getChampionships(route.params.id);
    },
    methods: {
        async getChampionships(id) {
            await $fetch(`http://127.0.0.1:8000/api/championships/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                this.championship = response
            });
        },
        async closeChampionship(id) {
            await $fetch(`http://127.0.0.1:8000/api/championships/${id}/close`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                this.getChampionships(this.championship.id)
            });
        }
    }
};
</script>
