<!-- src/App.vue -->
<template>
  <div>
    <header>
      <h2>ERIK’S CRAZY WORLD OF</h2>
      <h1>NATURAL DYES AND FIBERS</h1>
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
