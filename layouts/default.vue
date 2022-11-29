<template>
    <div>
        <transition name="fade">
            <div class="bg-[#39003b] h-screen grid items-center z-[999] fixed top-0 left-0 w-screen" v-if="loading">
                <div>
                    <div class="sk-cube-grid [&>*]:bg-secondary">
                        <div class="sk-cube sk-cube1"></div>
                        <div class="sk-cube sk-cube2"></div>
                        <div class="sk-cube sk-cube3"></div>
                        <div class="sk-cube sk-cube4"></div>
                        <div class="sk-cube sk-cube5"></div>
                        <div class="sk-cube sk-cube6"></div>
                        <div class="sk-cube sk-cube7"></div>
                        <div class="sk-cube sk-cube8"></div>
                        <div class="sk-cube sk-cube9"></div>
                    </div>
                    <div class="text-secondary text-5xl mt-4 text-center">Balapi</div>
                    <div class="text-secondary text-2xl mt-4 text-center">"For those who are not afraid of shame"</div>
                </div>
            </div>
        </transition>
        <UITheHeader />
        <div class="flex pl-72">
            <UITheSidebar />
            <div class="bg-dark p-12 w-full relative"><slot /></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        };
    },
    beforeMount() {
        setTimeout(() => {
            this.loading = false;
        }, 700);
    },
};
</script>

<style>
.ball {
    position: relative;
}

.ball::after {
    content: "";
    position: absolute;
    inset: 0;
    background: url(https://freesvg.org/img/soccer_ball2.png);
    width: 100%;
    height: 100%;
    background-size: cover;
    opacity: 0.1;
    /* filter: contrast(5%) brightness(100%); */
    z-index: 0;
}
.sk-cube-grid {
    width: 40px;
    height: 40px;
    margin: 0 auto;
}

.sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}
.sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}
.sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
}
.sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
    }
    35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
    }
}

@keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
    }
    35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
    }
}
</style>
