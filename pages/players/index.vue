<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">Players</h1>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <div class="grid grid-cols-2 gap-8 max-w-md mx-auto">

            <UIBaseContainer noPadding="true" class="text-xl text-primary" v-for="player,index in players" :key="index">
                <nuxt-link to="#" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-40 after:transition-all">
                    <div class="text-center px-4 transition rounded-t-full py-2 block border-b border-dashed border-purple-200">{{player.name}}</div>
                    <div class="text-center px-4 transition rounded-t-full py-2 block border-b border-dashed border-purple-200">{{player.number}}</div>
                </nuxt-link>
            </UIBaseContainer>
            
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false"  v-click-outside="some">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Player</h2>
                <form @submit.prevent="addPlayer" class="[&>*]:mb-4">
                    <div>
                        <input v-model="player.name" class="border" placeholder="Player name" type="text" />
                        <input v-model="player.number" class="border" placeholder="Player number" type="text" />
                    </div>
                    <ButtonsBaseBtn name="Add Player" />
                </form>
            </UIBaseModal>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            players : {},
            player: {
                name: null,
                number: null,
            },
            isOpen:false
        };
    },
    mounted() {
        this.getPlayers()     
    },
    methods: {
        async getPlayers(){
            $fetch("http://127.0.0.1:8000/api/players", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then((response) => this.players = response );
        },
        async addPlayer() {
            $fetch("http://127.0.0.1:8000/api/players", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.player),
            })
            .then((response) => console.log(JSON.stringify(response)))
            .then( () => this.getPlayers() )
            .then( () => {
                this.isOpen = false;
                this.player.name = "";
                this.player.number = "";
            });
        },
        some(){
            alert()
        }
    },
};
</script>
