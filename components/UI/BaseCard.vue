<template>
    <div class="text-xl text-main bg-secondary rounded-lg shadow-sm shadow-black relative z-10">
        <nuxt-link :to="link" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-white after:opacity-0 hover:after:opacity-70 after:transition-all">
            <div class="text-center truncate transition px-12 py-4 block">{{ name }}</div>
        </nuxt-link>
        <button v-if="deletable" @click="$emit('delete')" class="absolute  text-base right-2  top-1/2  -translate-y-1/2 w-6 h-6 rotate-45 text-red-800 bg-white/40 hover:bg-white/80 rounded-full grid place-items-center">+</button>
        <div v-if="number" class="absolute text-base left-2 top-1/2  -translate-y-1/2 w-6 h-6 text-main bg-white rounded-full grid place-items-center">{{number}}</div>
    </div>
</template>

<script>
export default {
    props: ["link", "name","deletable","number"],
};
</script>
