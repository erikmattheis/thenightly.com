<!-- src/App.vue -->
<template>
  <div>
    <header>
      <TopicList />
      <h2>ERIK’S CRAZY WORLD OF</h2>
      <h1>NATURAL DYES AND FIBERS</h1>
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
</style>
