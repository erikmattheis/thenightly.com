<!-- src/App.vue -->
<template>
  <div>

    <TopicList />

    <router-view></router-view>
  </div>
</template>

<script>
import TopicList from './components/TopicList.vue';

export default {
  name: 'App',
  components: { TopicList },
};
</script>

<style scoped>
header {
  color: #fff;
}

h1 {
  font-size: 2.5em;
  margin: 0;
  padding: 0;
  text-align: right;
}

h2 {
  font-size: 1.5em;
  margin: 0;
  padding: 0;
}
</style>
