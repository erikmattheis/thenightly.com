<!-- src/App.vue -->
<template>
  <div>
    <header>
      <TopicList />
      <h1>NATURALY HUED</h1>
    </header>
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
  background-color: #301;
  color: #fff;
  text-align: right;
}

h1 {
  font-size: 2.5em;
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 1.5em;
  margin: 0;
  padding: 0;
}
</style>
