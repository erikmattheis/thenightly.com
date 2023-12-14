<template>
  <div class="container">

    <button class="box">x</button>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExampleBox',
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3'],
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: block;
  margin: 0;
  padding: 1rem;
  background-color: blue;
  color: aqua
}

.container {
  position: relative;
  width: 400px;
}

.box {
  width: 52px;
  height: 52px;
  background-color: red;
  color: white;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
