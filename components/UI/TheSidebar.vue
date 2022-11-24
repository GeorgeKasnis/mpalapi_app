<template>
    <div class="relative">
        <nav class= " pt-16 after:content-[''] after:inset-0 after:absolute after:bg-bolt-image after:opacity-50 after:pointer-events-none after:-z-10 h-[calc(100vh-4rem)] fixed left-0 top-16 w-72  bg-no-repeat bg-contain" style="background: transparent linear-gradient(180deg, #4E0351 1%, #FC2C80 100%, #000000 100%) 0% 0% no-repeat padding-box;">
            <NuxtLink class="text-white opacity-50 hover:bg-secondary block p-4 hover:opacity-100 transition-all duration-200" to="/home">Αρχική</NuxtLink>
            <ul class="my-16">
                <li><NuxtLink class="text-white opacity-50 hover:bg-secondary block p-4 hover:opacity-100 transition-all duration-200" to="/home">Βαθμολογία</NuxtLink></li>
                <li><NuxtLink class="text-white opacity-50 hover:bg-secondary block p-4 hover:opacity-100 transition-all duration-200" to="/home">Αγωνιστικές</NuxtLink></li>
                <li><NuxtLink class="text-white opacity-50 hover:bg-secondary block p-4 hover:opacity-100 transition-all duration-200" to="/home">Αγωνιστικές</NuxtLink></li>
            </ul>
            <ul>
                <li><NuxtLink class="text-white opacity-50 hover:bg-secondary block p-4 hover:opacity-100 transition-all duration-200" to="/home">Παίχτες</NuxtLink></li>
                <li><NuxtLink class="text-white opacity-50 hover:bg-secondary block p-4 hover:opacity-100 transition-all duration-200" to="/home">Ομάδες</NuxtLink></li>
                <li><NuxtLink class="text-white opacity-50 hover:bg-secondary block p-4 hover:opacity-100 transition-all duration-200" to="/home">Πρωταθλήματα</NuxtLink></li>
            </ul>
        </nav>
    </div>
</template>
