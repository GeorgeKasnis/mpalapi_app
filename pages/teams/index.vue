<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">Teams</h1>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <div class="grid grid-cols-2 gap-8 max-w-md mx-auto">
            <UIBaseContainer noPadding="true" class="text-xl text-primary">
                <nuxt-link to="#" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-40 after:transition-all">
                    <div class="text-center px-4 transition rounded-t-full py-2 block border-b border-dashed border-purple-200">Σπύρος</div>
                    <div class="text-center px-4 transition rounded-b-full py-2 block">Κασνής</div>
                </nuxt-link>
            </UIBaseContainer>
            <UIBaseContainer noPadding="true" class="text-xl text-primary">
                <nuxt-link to="#" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-40 after:transition-all">
                    <div class="text-center px-4 transition rounded-t-full py-2 block border-b border-dashed border-purple-200">Καλούκης</div>
                    <div class="text-center px-4 transition rounded-b-full py-2 block">Μπάμπης</div>
                </nuxt-link>
            </UIBaseContainer>
            <UIBaseContainer noPadding="true" class="text-xl text-primary">
                <nuxt-link to="#" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-40 after:transition-all">
                    <div class="text-center px-4 transition rounded-t-full py-2 block border-b border-dashed border-purple-200">Στάυρος</div>
                    <div class="text-center px-4 transition rounded-b-full py-2 block">Μάστορης</div>
                </nuxt-link>
            </UIBaseContainer>
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false"  v-click-outside="some">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Team</h2>
                <form @submit.prevent="addTeam" class="[&>*]:mb-4">
                    <div><input v-model="member1" class="border" type="text" /></div>
                    <div><input v-model="member2" class="border" type="text" /></div>
                    <ButtonsBaseBtn name="Add Team" />
                </form>
            </UIBaseModal>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            member1: "",
            member2: "",
            isOpen:false
        };
    },
    methods: {
        async addTeam() {
            $fetch("http://127.0.0.1:8000/api/teams", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: "aaa" }),
            }).then((response) => console.log(JSON.stringify(response)));
        },
        some(){
            alert()
        }
    },
};
</script>
