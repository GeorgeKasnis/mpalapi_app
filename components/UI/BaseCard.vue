<template>
    <div noPadding="true" class="text-xl text-primary bg-secondary rounded-lg shadow-md shadow-gray-500">
        <nuxt-link :to="link" class="relative after:grid after:place-items-center after:text-5xl after:content-['👁'] after:absolute after:inset-0 after:rounded-lg after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-80 after:transition-all">
            <img :src="imgSrc" class="w-full aspect-square object-cover rounded-t-lg" alt="" />
            <div class="text-center px-4 transition py-2 block">{{ name }}</div>
        </nuxt-link>
    </div>
</template>


<script>
export default {
    props:['link','imgSrc',"name"]
}
</script>
