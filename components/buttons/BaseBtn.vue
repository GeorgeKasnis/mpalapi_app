<template>
    <button class="bg-secondary flex items-center hover:bg-third transition px-4 py-2 rounded-full">
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
