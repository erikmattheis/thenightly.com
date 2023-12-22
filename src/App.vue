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

.headline {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    margin: 2rem 0 3rem 0;
    height: 4rem; /* Adjust this as needed */
}

h1::before {
    content: '';
    position: absolute;
    top: 0.8rem;
    left: -10.8rem;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: #ccc;
    transform: skew(-18deg);
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
