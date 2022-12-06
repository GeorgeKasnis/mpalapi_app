<template>
    <div>
        <div class="flex">
            <UIBaseAdd @click="isOpen = true" class="" name="Add Team" />
        </div>

        <!-- <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(team, index) in teams" :key="index" :name="team.name" :link="'teams/' + team.id" @delete="confirmDelete(team.id)" deletable="true" />
            </div>
        </transition> -->

        <transition name="fade-in-out">
            <div class="relative h-full">
                <TablesBaseTable v-if="!loading" :table-content="tableContent" />
                <UIBaseLoadingSpinner v-if="loading" />
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="addTeam" class="[&>*]:mb-4">
                    <v-text-field placeholder="Team name" v-model="name" type="text"></v-text-field>
                    <ButtonsBaseBtn name="Add Team" />
                </form>
            </UIBaseModal>
        </transition>

        <transition name="fade-in-out">
            <UIBaseConfirmationModal v-if="confirmationIsOpen" @delete-item="deleteTeam(itemForDelete)" @close-modal="confirmationIsOpen = false" />
        </transition>

    </div>
</template>

<script>
export default {
    data() {
        return {
            teams: {},
            name: "",
            isOpen: false,
            confirmationIsOpen: false,
            itemForDelete: "",
            loading: true,
            baseUrl: "",
            tableContent: {
                columns: [],
            },
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getTeams();
    },
    methods: {
        async getTeams() {
            this.tableContent.columns = []
            await $fetch(`${this.baseUrl}/api/teams`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    console.log(response);
                    
                    response.forEach((element) => {
                        this.tableContent.columns.push({
                            id: element.id,
                            name: element.name,
                        });
                    });
                    this.games = response;
                    this.loading = false;
                });
            console.log(this.teams);
        },
        async addTeam() {
            await $fetch(`${this.baseUrl}/api/teams`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: this.name }),
            })
                .then((response) => console.log(JSON.stringify(response)))
                .then(() => this.getTeams());

            this.isOpen = false;
            this.name = "";
        },
        async deleteTeam(id) {
            await $fetch(`${this.baseUrl}/api/teams/${id}`, {
                method: "DELETE",
            }).then(() => this.getTeams());

            this.isOpen = false;
            this.confirmationIsOpen = false;
            this.name = "";
        },
        confirmDelete(id) {
            this.confirmationIsOpen = true;
            this.itemForDelete = id;
        },
    },
};
</script>
