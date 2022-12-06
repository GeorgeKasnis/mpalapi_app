<template>
    <button class="bg-white/20 hover:bg-white/40 flex items-center hover:bg-third transition px-4 py-2 rounded-full">
        {{ name }}
        <div class="ml-4">
            <slot></slot>
        </div>
    </button>
</template>

<script>
export default {
    props: ["name"],
};
</script>
