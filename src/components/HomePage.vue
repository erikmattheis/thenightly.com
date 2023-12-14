<!-- src/views/HomePage.vue -->
<template>
  <div>
    <h1>Good Information</h1>
    <p>The best descriptions of things you look up.</p>
    <TopicList />
  </div>
</template>

<script>
import TopicList from './TopicList.vue';

export default {
  name: 'HomePage',
  components: {
    TopicList,
  },
};
</script>
