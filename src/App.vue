<!-- src/App.vue -->
<template>
    <div class="dynamic" :style="{ 'background-image': backgroundImage }">
        <div class="headline">
            <h1>NATURALLY HUED</h1>
        </div>
        <div class="spa">
            <RouterView @changeBackground="setBg"></RouterView>
            <EndMark :colors="colors" />
        </div>
        <TopicList class="nav" />
        <SiteFooter :colors="colors" />
    </div>
</template>

<script>
import TopicList from './components/TopicList.vue'
import EndMark from './components/EndMark.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
    name: 'App',
    components: { TopicList, EndMark, SiteFooter },
    data() {
        return {
            isLoading: true,
            color: '#FFFFFF',
            bgColor: '#000000',
            colors: {
                color: '#FFFFFF',
                bgColor: '#000000',
            },
            transparentGif:
                'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            backgroundImage: this.transparentGif,
        }
    },
    mounted() {
        this.isLoading = false
    },
    methods: {
        setBg(obj) {
            this.setWrapperBGImage(obj.url)
            this.setFooterBGColor(obj)
        },
        setWrapperBGImage(url) {
            if (url) {
                this.backgroundImage = `url(${url})`
            } else {
                this.backgroundImage = this.transparentGif
            }
        },
        setFooterBGColor(colors) {
            this.colors = colors
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
}

.spa {
    max-width: 44rem;
    background-color: var(--text-background-color);
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
