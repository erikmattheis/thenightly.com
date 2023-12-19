<!-- src/App.vue -->
<template>
    <div class="dynamic">
        <TopicList />

        <h1>NATURALLY HUED</h1>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
a

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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.content {
    max-width: 50rem;
    background-color: #ffffff99;
    backdrop-filter: brightness(2);
    margin-left: -3rem;
    padding-left: 3rem;
    margin-right: -3rem;
    padding-right: 3rem;
}
</style>
