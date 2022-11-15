<template>
    <div class="text-xl text-primary bg-secondary rounded-lg shadow-md shadow-gray-500 relative z-10">
        <nuxt-link :to="link" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-80 after:transition-all">
            <img v-if="imgSrc" :src="imgSrc" class="w-full aspect-square object-cover rounded-t-lg" alt="" />
            <div class="text-center truncate transition px-12 py-2 block">{{ name }}</div>
        </nuxt-link>
        <button v-if="deletable" @click="$emit('delete')" class="absolute  text-base right-2 top-2 w-6 h-6 rotate-45 text-red-800 bg-white/10 hover:bg-white/80 rounded-full grid place-items-center">+</button>
        <div v-if="number" class="absolute text-base left-2 top-2 w-6 h-6 text-primary bg-white rounded-full grid place-items-center">{{number}}</div>
    </div>
</template>

<script>
export default {
    props: ["link", "imgSrc", "name","deletable","number"],
};
</script>
