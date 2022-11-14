<template>
    <div>
        <h1 class="text-2xl text-center mb-8 font-bold text-primary">{{team.name}}</h1>

        <h2 class="text-2xl text-center mb-8 font-bold text-primary">Team Players</h2>

        <button @click="isOpen = true" class="text-primary mx-auto mb-8 bg-secondary w-12 h-12 rounded-full grid place-items-center text-4xl shadow-md shadow-gray-500">+</button>

        <div class="grid grid-cols-2 gap-8 max-w-md mx-auto">

            <UIBaseContainer noPadding="true" class="text-xl text-primary" v-for="player,index in team.players" :key="index">
                <nuxt-link to="#" class="relative after:grid after:place-items-center after:text-3xl after:content-['👁'] after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:bg-black after:opacity-0 hover:after:opacity-40 after:transition-all">
                    <div class="text-center px-4 transition rounded-t-full py-2 block border-b border-dashed border-purple-200">{{player.name}}</div>
                    <div class="text-center px-4 transition rounded-t-full py-2 block border-b border-dashed border-purple-200">{{player.number}}</div>
                </nuxt-link>
                <button>delete</button>
            </UIBaseContainer>
            
        </div>

        <transition name="fade-in-out">
            <UIBaseModal v-if="isOpen" @close-modal="isOpen = false"  v-click-outside="some">
                <h2 class="text-xl mx-auto mb-2 text-center">Add Player to this team</h2>
                <form @submit.prevent="attachPlayer" class="[&>*]:mb-4">
                    <div>
                        <select v-model="player.name" class="border">
                            <option value="{{player.id}}" v-for="player,index in allPlayers" :key="index">{{player.name}}</option>    
                        </select>

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
            team : {},
            allPlayers : {},
            isOpen : false
        };
    },
    mounted() {
        const route = useRoute();
        this.getTeam(route.params.id);
        this.getAllPlayers();    
    },
    methods: {
        async getTeam(id){
            $fetch("http://127.0.0.1:8000/api/teams/"+id, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then((response) => this.team = response );
        },
        async attachPlayer(){
            $fetch(`http://127.0.0.1:8000/api/teams/${this.team.id}/players`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: {
                    player_id : 1
                },
            })
            .then((response) => { 
                //notify
            } )
            .then( () => {
                this.isOpen = false;
            } )
            .then((response) => this.team = response );
        },
        async detatchPlayer(){
            $fetch(`http://127.0.0.1:8000/api/teams/${this.team.id}/players`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then(() => this.team = this.getTeam(this.team.id) );
        },
        async getAllPlayers(){
            $fetch(`http://127.0.0.1:8000/api/players/`, {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then((response) => this.allPlayers = response );
        }
        
    },
};
</script>
