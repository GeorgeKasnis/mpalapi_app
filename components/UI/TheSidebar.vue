<script setup>
import { useNavStore } from "~/stores/navigation";
const mmenu = useNavStore();
</script>
<template>
    <div class="relative sidebar tablet:fixed tablet:w-60 tablet:-translate-y-0 tablet:left-0 tablet:top-0 tablet:bottom-0 tablet:z-40 transition-all" :class="[!mmenu.isOpen && !$device.isDesktop ? '-translate-x-72 pointer-events-none' : 'pointer-events-auto']">
        <nav
            class="pt-16 after:content-[''] transition-all duration-200 after:inset-0 after:absolute after:bg-bolt-image after:opacity-50 after:bg-cover after:pointer-events-none after:-z-10 h-[calc(100vh-4rem)] fixed left-0 top-16 w-72 bg-no-repeat bg-contain"
            style="background: transparent linear-gradient(180deg, #4e0351 1%, #fc2c80 100%, #000000 100%) 0% 0% no-repeat padding-box">
            <NuxtLink class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/">Αρχική</NuxtLink>
            <ul class="my-16">
                <li><NuxtLink class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/results">Βαθμολογία</NuxtLink></li>
                <li><NuxtLink class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/games">Αγωνιστικές</NuxtLink></li>
                <!-- <li><NuxtLink class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/games">Αποτελέσματα</NuxtLink></li> -->
            </ul>
            <ul>
                <li><NuxtLink class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/players">Παίχτες</NuxtLink></li>
                <li><NuxtLink class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/teams">Ομάδες</NuxtLink></li>
                <li><NuxtLink class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/championships">Πρωταθλήματα</NuxtLink></li>
            </ul>
            <ul class="flex">
                <li class="flex-1"><nuxt-link class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/">Χορηγοί</nuxt-link></li>
                <li class="flex-1"><nuxt-link class="text-white opacity-50 hover:bg-second block p-4 hover:opacity-100 transition-all duration-200" to="/">Ball-ΕΠΟ</nuxt-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
// import { useNavStore } from "~/stores/navigation";
// const mmenu = useNavStore()
// export default {
//     setup() {
//         const mmenu = useNavStore();
//         return mmenu;
//     },
// };
</script>
