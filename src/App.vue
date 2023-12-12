<!-- src/App.vue -->
<template>
  <div>
    <header>
      <h1>COME TO DYE</h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

};
</script>

<style scoped>
header {
  background-color: #301;
  color: #fff;
  padding: 1rem;
  text-align: center;
}
</style>
