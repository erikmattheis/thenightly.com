<!-- src/App.vue -->
<template>
  <div class="dynamic">

    <TopicList />

    <div class="content">
      <router-view></router-view>
    </div>
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
.dynamic {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  max-width: 768px;
  background-color: #ffffff99;
  backdrop-filter: brightness(2);
  border-radius: 10px;
  margin-left: -3rem;
  padding-left: 3rem;
  margin-right: -3rem;
  padding-right: 3rem;
}
</style>