<!-- src/App.vue -->
<template>
    <div class="dynamic" :style="{ 'background-image': backgroundImage }">
        <div class="headline">
            <h1>NATURALLY HUED</h1>
        </div>
        <div class="spa">
            <RouterView @changeBackground="setWrapperBGImage"></RouterView>
        </div>
        <TopicList class="nav" />
    </div>
</template>

<script>
import TopicList from './components/TopicList.vue'

export default {
    name: 'App',
    components: { TopicList },
    data() {
        return {
            isLoading: true,
            color: '#FFFFFF',
            transparentGif:
                'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            backgroundImage: this.transparentGif,
        }
    },
    mounted() {
        this.isLoading = false
    },
    methods: {
        setWrapperBGImage(url) {
            if (url) {
                this.backgroundImage = `url(${url})`
            } else {
                this.backgroundImage = this.transparentGif
            }
        },
    },
}
</script>

<style>
.dynamic {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: soft-light;
    background-color: #00000066;
    width: 100%;
}

.spa {
}

.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--button-width);
    height: 100vh;
    z-index: 10;
}
</style>
