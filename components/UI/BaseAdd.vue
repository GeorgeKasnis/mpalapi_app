<template>
    <div class="flex ml-auto items-center mb-4 cursor-pointer" @click="isOpen = true">
        <ButtonsAddBtn class="mr-3"  />
        <div>{{ name }}</div>
    </div>
</template>

<script>
export default {
    props: ["name"],
};
</script>
