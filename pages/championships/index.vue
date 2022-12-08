<template>
    <div>
        <div class="flex">
            <UIBaseAdd @click="isOpen = true" class="" name="Add League" />
        </div>

        <vue-good-table class="table-nohead" :columns="tableContent.columns" :rows="tableContent.rows">
            <template #table-row="props">
                <span v-if="props.column.field == 'edit'">
                    <TablesShowChip :link="'championships/'+props.row.id"/>
                </span>
                <span v-else-if="props.column.field == 'delete'">
                    <TablesDeleteChip @click="confirmDelete(props.row.id)" />
                </span>
            </template>
        </vue-good-table>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Championship</h2>
                <form @submit.prevent="addChampionship" class="[&>*]:mb-4">
                    <v-text-field placeholder="Title" v-model="championshipTitle" type="text"></v-text-field>
                    <ButtonsBaseBtn name="Add Championship" />
                </form>
            </UIBaseModal>
        </transition>
        <transition name="fade-in-out">
            <UIBaseConfirmationModal v-if="confirmationIsOpen" @delete-item="deleteChampionship(itemForDelete)" @close-modal="confirmationIsOpen = false" />
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            championships: {},
            championshipTitle: "",
            isOpen: false,
            loading: true,
            baseUrl: null,
            confirmationIsOpen: false,
            itemForDelete: "",
            tableContent: {
                columns: [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                        field: "title",
                        tdClass: "w-[95%]",
                    },
                    {
                        field: "edit",
                    },
                    {
                        field: "delete",
                    },
                ],
                rows: [],
            },
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getChampionships();
    },
    methods: {
        async getChampionships() {
            this.tableContent.rows = [];
            await $fetch(`${this.baseUrl}/api/championships`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                response.forEach((element) => {
                    this.tableContent.rows.push({
                        id: element.id,
                        title: element.title,
                    });
                });
                this.championships = response;
                this.loading = false;
            });
        },
        async addChampionship() {
            await $fetch(`${this.baseUrl}/api/championships`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: this.championshipTitle }),
            }).then((response) => {
                this.getChampionships();
                this.isOpen = false;
                this.championshipTitle = "";
            });
        },
        async deleteChampionship(id) {
            await $fetch(`${this.baseUrl}/api/championships/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(() => {
                this.getChampionships();
                this.isOpen = false;
                this.championshipTitle = "";
            });
            this.confirmationIsOpen = false;
        },
        confirmDelete(id) {
            this.confirmationIsOpen = true;
            this.itemForDelete = id;
        },
    },
};
</script>
