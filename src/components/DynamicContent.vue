<template>
  <div>
    <div>
      <div v-if="editMode">
        <form @submit.prevent="submitForm(article)">
          <label>
            Subject
            <input type="text" v-model="article.title" />
          </label>
          <label>
            Short Title
            <input type="text" v-model="article.shortTitle" />
          </label>
          <textarea v-model="article.content"></textarea>
          <button type="submit">Submit</button>
          <button type="button" @click="editMode = false">Cancel</button>
        </form>
      </div>
      <div v-else>
        <button @click="editMode = true">Edit</button>
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <p v-html="`<div>${article.content}</div>`"></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dyes from '../data/dyes.json';

export default {
  name: 'DynamicContent',
  props: {
    topic: {
      type: String,
      required: true,
    },

  },
  data() {
    return {
      editMode: false,
      form: {
        subject: 'dyes',
        topic: 'plant',
      },
      articles: dyes,
      article: {},
    };
  },
  created() {
    this.article = this.articles.find((article) => article.shortTitle === this.topic);
  },
  methods: {
    async submitForm(article) {
      try {
        await axios.post('functions', this.form);
        this.editMode[article.topic] = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
