<script setup>
import { useNavStore } from "~/stores/navigation";
const mmenu = useNavStore();
</script>

<template>
    <header class="h-16 sticky top-0 tablet:hidden flex items-center bg-main z-50" v-if="$device.isDesktop">
        <NuxtLink to="/" class="w-72 p-4"><img class="h-full object-contain" src="~/assets/images/Ballapi_Logo.svg" alt="" /></NuxtLink>
        <div class="flex items-center justify-between flex-1 h-full">
            <nuxt-link class="text-lg" to="/">Αρχική</nuxt-link>
            <div class="flex gap-8 items-center h-full">
                <div>23/11/2022 Τετάρτη</div>
                <nuxt-link to="/" class="text-center hover:bg-[#9A9A9A]/40 bg-[#9A9A9A]/20 px-4 h-full flex flex-col items-center justify-center transition-all duration-200">
                    <!-- <div><font-awesome-icon class="!text-secondary text-sm" icon="fa-solid fa-right-from-bracket" /></div> -->
                    <div class="text-sm">Έξοδος</div>
                </nuxt-link>
            </div>
        </div>
    </header>
    <header class="tablet:flex h-16 sticky top-0 items-center bg-main z-50" v-else>
        <div class="px-4 w-16 h-full grid place-items-center hover:bg-[#9A9A9A]/40 bg-[#9A9A9A]/20">
            <svg @click="mmenu.openNav()" v-if="!mmenu.isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg @click="mmenu.closeNav()" v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <NuxtLink to="/" class="p-4 flex-auto"><img class="w-44 mx-auto h-full object-contain" src="~/assets/images/Ballapi_Logo.svg" alt="" /></NuxtLink>

        <nuxt-link to="/" class="text-center w-16 hover:bg-[#9A9A9A]/40 bg-[#9A9A9A]/20 px-4 h-full flex flex-col items-center justify-center transition-all duration-200">
            <div><font-awesome-icon class="!text-secondary text-xs" icon="fa-solid fa-right-from-bracket" /></div>
            <div class="text-xs">Έξοδος</div>
        </nuxt-link>
    </header>
</template>

<script>
// import { mapActions } from "pinia";
// import { useNavStore } from "~/stores/navigation";
// export default {
//     setup() {
//         const mmenu = useNavStore();
//         return mmenu;
//     },
//     methods: {
//         ...mapActions(useNavStore, ["openNav", "closeNav"]),
//     },
// };
</script>
