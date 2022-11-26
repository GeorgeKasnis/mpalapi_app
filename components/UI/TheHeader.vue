<template>
    <header class="h-16 sticky top-0 flex items-center bg-primary">
        <NuxtLink to="/" class="w-72 p-4 flex"><img class="h-full object-contain" src="~/assets/images/Ballapi_Logo.svg" alt="" /></NuxtLink>
        <div class="flex items-center justify-between flex-1 h-full">
            <nuxt-link class="text-lg" to="/">Αρχική</nuxt-link>
            <div class="flex gap-8 items-center h-full">
                <div>23/11/2022 Τετάρτη</div>
                <nuxt-link to="#" class="text-center hover:bg-[#9A9A9A]/40 bg-[#9A9A9A]/20 px-4 h-full flex flex-col items-center justify-center transition-all duration-200">
                    <div><font-awesome-icon class="!text-secondary text-sm" icon="fa-solid fa-right-from-bracket" /></div>
                    <div class="text-sm">Έξοδος</div>
                </nuxt-link>
            </div>
        </div>
    </header>
</template>
