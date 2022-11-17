<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">Championships</h1>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <transition name="fade-in-out">
            <div class="grid grid-cols-1 gap-8 max-w-2xl mx-auto" v-if="!loading">
                <UIBaseCard v-for="(championship, index) in championships" :key="index" :name="championship.title" :link="`/championships/${championship.id}`" @delete="deleteChampionship(championship.id)" deletable="true" />
            </div>
        </transition>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="addChampionship" class="[&>*]:mb-4">
                    <div><input v-model="championshipTitle" class="border text-white" placeholder="Title" type="text" /></div>
                    <ButtonsBaseBtn name="Add Championship" />
                </form>
            </UIBaseModal>
        </transition>

        <UIBaseLoadingSpinner v-if="loading" />
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
        };
    },
    mounted() {
        const config = useRuntimeConfig();
        this.baseUrl = config.BASE_URL;
        this.getChampionships();
    },
    methods: {
        async getChampionships() {
            await $fetch(`${this.baseUrl}/api/championships`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
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
                })
                .then((response) => {
                   this.getChampionships()
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

            
        },
    },
};
</script>
