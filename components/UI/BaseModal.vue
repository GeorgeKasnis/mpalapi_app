<template>
    <!-- Main modal -->
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="h-screen bg-[#39003b]/70 overflow-y-auto grid place-content-center overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
        <div class="relative p-4 min-w-[5rem]  w-[40vw] h-full max-h-[95vh] overflow-auto  scrollbar-thin scrollbar-track-white/40 scrollbar-thumb-main/70  md:h-auto backdrop-blur-md bg-main/90  text-white rounded-lg shadow-md shadow-purple-800/50">
            <div class="text-end mb-0"><button @click="closeModal" class="rotate-45 ml-auto bg-white/20 hover:bg-white/40 w-8 h-8 rounded-full grid place-items-center">+</button></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
   methods:{
    closeModal(){
        this.$emit('close-modal')
    }
   } 
}
</script>
