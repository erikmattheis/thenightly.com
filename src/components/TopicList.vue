<template>
  <div>

    <ul v-for="article in topics" :key="article.shortTitle">

      <li v-if="editMode">

        <form @submit.prevent="submitForm(article)">

          <label>
            Topic:
            <input type="text" v-model="article.shortTitle" />
          </label>

          <button type="submit">Submit</button>

          <button type="button" @click="editMode = false">Cancel</button>

        </form>

      </li>

      <li v-else>

        <button @click="editMode = true">
          Edit
        </button>

        <router-link :to="{ name: 'DynamicContent', params: { topic: article.shortTitle } }">
          {{ article.shortTitle }}
        </router-link>

      </li>

    </ul>

  </div>
</template>

<script>
// import axios from 'axios';
import dyes from '../data/dyes.json';

export default {
  name: 'TopicList',
  components: {

  },
  data() {
    return {
      editMode: false,
      topics: dyes,
    };
  },
  methods: {
    async submitForm(article) {
      try {
        // await axios.post('functions', this.form);
        this.editMode[article.shortTitle] = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>
