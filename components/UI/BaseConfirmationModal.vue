<template>
    <!-- Main modal -->
    <div tabindex="" aria-hidden="true" class="h-screen bg-[#39003b]/70 overflow-y-auto grid place-content-center overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
        <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4  bottom-0 z-50 mb-4 mx-4 md:relative">
            <div class="md:flex items-center">
                <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                    <p class="font-bold">Delete this item</p>
                    <p class="text-sm text-gray-700 mt-1">This action cannot be undone.</p>
                </div>
            </div>
            <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                <button @click="deleteItem" class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-2 ml-2">Delete</button>
                <button @click="closeModal" class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
        deleteItem() {
            this.$emit("delete-item");
        },
    },
};
</script>
