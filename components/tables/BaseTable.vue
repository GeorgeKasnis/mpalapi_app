<template>
    <div>
        <v-table class="text-white text-sm table w-full">
            <thead class="bg-[#39003B] text-white">
                <tr class="px-4">
                    <th v-for="(item, index) in tableContent.rows" :key="index" class="text-left text-xs">{{ item }}</th>
                </tr>
            </thead>
            <tbody class="">
                <tr class="odd:bg-[#4E0351] even:!bg-[#420544]" v-for="(item, index) in tableContent.columns" :key="index">
                    <td class="!py-6 border-y-4 border-[#39003B]" v-for="(i, index) in item" :key="index">{{ i }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
export default {
    props: ["tableContent"],
};
</script>
