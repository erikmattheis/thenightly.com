<!-- src/App.vue -->
<template>
  <div>
    <header>
      <TopicList />
      <h1>NATURALY HUED</h1>
      <p>A Passion Project in Harmony with AI Creativity!</p>
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
  text-align: center;

}

h1 {
  font-size: 3em;
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 1.5em;
  margin: 0;
  padding: 0;
}
</style>
