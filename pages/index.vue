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
                <vue-good-table v-if="!loading" :columns="tableContent.columns" :rows="tableContent.rows"></vue-good-table>
                <UIBaseLoadingSpinner v-if="loading" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            tableContent: {
                columns: [
                    {
                        field: "homeTeam",
                        label: "ΟΜΑΔΑ ΕΝΤΟΣ",
                    },
                    {
                        field: "awayTeam",
                        label: "ΟΜΑΔΑ ΕΚΤΟΣ",
                    },
                    {
                        field: "result",
                        label: "ΑΠΟΤΕΛΕΣΜΑ",
                    },
                ],
                rows: [],
            },
        };
    },
    methods: {
        async getGames() {
            await $fetch(`${this.baseUrl}/api/games`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element) => {
                    this.tableContent.rows.push({
                        homeTeam: element.team_a.name,
                        awayTeam: element.team_b.name,
                        result: `${element.team_a_goals} - ${element.team_b_goals}`,
                    });
                });
                this.games = response;
                this.loading = false;
            });
        },
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getGames();
    },
};
</script>
