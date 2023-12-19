<!-- src/App.vue -->
<template>
    <div class="dynamic">
        <h1>NATURALLY HUED</h1>

        <div class="spa">
            <ContentLoader
                viewBox="0 0 400 200"
                speed="2"
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
                v-if="isLoading"
            >
                <rect x="0" y="0" rx="3" ry="3" width="400" height="10" />
                <rect x="0" y="20" rx="3" ry="3" width="400" height="10" />
                <rect x="0" y="40" rx="3" ry="3" width="400" height="10" />
                <rect x="0" y="60" rx="3" ry="3" width="400" height="10" />
                <rect x="0" y="80" rx="3" ry="3" width="400" height="10" />
                <rect x="0" y="100" rx="3" ry="3" width="400" height="10" />
                <rect x="0" y="120" rx="3" ry="3" width="400" height="10" />
                <rect x="0" y="140" rx="3" ry="3" width="400" height="10" />
            </ContentLoader>
            <router-view v-else></router-view>
        </div>
        <TopicList class="nav" />
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import TopicList from './components/TopicList.vue'

export default {
    name: 'App',
    components: { TopicList, ContentLoader },
    data() {
        return {
            isLoading: true,
        }
    },
}
</script>

<style scoped>
.dynamic {
    position: absolute;
    left: var(--button-width);
    width: calc(100% - var(--button-width) * 3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.spa {
    width: 100%;
    background-color: #ffffff99;
    backdrop-filter: brightness(2);
    margin-left: -3rem;
    padding-left: 3rem;
    margin-right: -3rem;
    padding-right: 3rem;
}

.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--button-width);
    height: 100vh;
    z-index: 10;
    background-color: #ffffff55;
}
</style>
