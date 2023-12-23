<!-- src/App.vue -->
<template>
    <div class="dynamic wrapper">
        <div class="headline">
            <h1 :style="{ color: color }">NATURALLY HUED</h1>
        </div>
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
.dynamic {
    position: absolute;
    padding-left: var(--button-width);
    width: calc(100% - var(--button-width));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 3.5rem;
    font-weight: 700;
    text-align: center;
    font-style: italic;
    margin: 0;
    padding: 0;
}

.spa {
    max-width: 44rem;
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
