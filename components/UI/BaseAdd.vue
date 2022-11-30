<template>
    <div class="text-end mb-4">
        <div class="inline-flex items-center">
            <ButtonsAddBtn class="mr-2" @click="isOpen = true" />
            <div>{{name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:['name']
}
</script>
