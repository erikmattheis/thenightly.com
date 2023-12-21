<!-- src/App.vue -->
<template>
    <div class="dynamic">
        <h1 :style="{ color: color }">NATURALLY HUED</h1>

        <div class="spa">
            <RouterView></RouterView>
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
        }
    },
    mounted() {
        this.isLoading = false
    },
}
</script>

<style scoped>
.link:hover {
    background-color: var(--hover-bg-color);
    color: var(--hover-color);
}
.dynamic {
    position: absolute;
    padding-left: var(--button-width);
    width: calc(100% - var(--button-width));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.spa {
    max-width: 50rem;
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
