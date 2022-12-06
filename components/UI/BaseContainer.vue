<template>
    <div class="bg-second rounded-full shadow-md shadow-gray-500" :class="[noPadding ? '' : ' px-8 py-4 ']">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["noPadding"],
};
</script>
