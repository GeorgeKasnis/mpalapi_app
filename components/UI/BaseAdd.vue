<template>
    <div class="flex ml-auto items-center mb-4">
        <ButtonsAddBtn class="mr-2" @click="isOpen = true" />
        <div>{{ name }}</div>
    </div>
</template>

<script>
export default {
    props: ["name"],
};
</script>
