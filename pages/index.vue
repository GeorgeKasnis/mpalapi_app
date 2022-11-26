<template>
    <div class="grid grid-cols-12 gap-16">
        <div class="col-span-5">
            <div class="text-3xl font-bold mb-6">Επόμενα Παιχνίδια</div>
            <div class="allnotfirst:mt-8">
                <div class="flex items-center gap-8 bg-[#3E0440] rounded-md p-16 tablet:m-8">
                    <div><img src="~/assets/images/aetoi@2x.png" alt="" /></div>
                    <div class="text-8xl">vs</div>
                    <div><img src="~/assets/images/eyez@2x.png" alt="" /></div>
                </div>
                <div class="flex items-center gap-8 bg-[#3E0440] rounded-md p-16 tablet:m-8">
                    <div><img src="~/assets/images/aetoi@2x.png" alt="" /></div>
                    <div class="text-8xl">vs</div>
                    <div><img src="~/assets/images/eyez@2x.png" alt="" /></div>
                </div>
            </div>
        </div>
        <div class="col-span-7">
            <div class="text-3xl font-bold mb-6">Τελευταία Αποτελέσματα</div>
            <div>
                <TablesBaseTable :table-content="tableContent" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableContent: {
                rows:['ΟΜΑΔΑ ΕΝΤΟΣ','ΟΜΑΔΑ ΕΚΤΟΣ','ΑΠΟΤΕΛΕΣΜΑΤΑ'],
                columns: [
                    {
                        teamA: "AETOS TRAPEZOUNΤΑΣ F.C.",
                        teamB: "YOUR EYES F.C.",
                        result: "10-7",
                    },
                    {
                        teamA: "AETOS TRAPEZOUNΤΑΣ F.C.",
                        teamB: "YOUR EYES F.C.",
                        result: "10-7",
                    },
                    {
                        teamA: "AETOS TRAPEZOUNΤΑΣ F.C.",
                        teamB: "YOUR EYES F.C.",
                        result: "10-7",
                    },
                    {
                        teamA: "AETOS TRAPEZOUNΤΑΣ F.C.",
                        teamB: "YOUR EYES F.C.",
                        result: "10-7",
                    },
                    {
                        teamA: "AETOS TRAPEZOUNΤΑΣ F.C.",
                        teamB: "YOUR EYES F.C.",
                        result: "10-7",
                    },
                    {
                        teamA: "AETOS TRAPEZOUNΤΑΣ F.C.",
                        teamB: "YOUR EYES F.C.",
                        result: "10-7",
                    },
                ],
            },
        };
    },
};
</script>
