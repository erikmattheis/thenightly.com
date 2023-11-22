<!-- src/views/HomePage.vue -->
<template>
  <div>
    <h1>Generate Content</h1>
    <input v-model="topic" placeholder="Type topic here" />
    <button @click="fetchContent">Generate Content</button>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <div v-html="content"></div>
    <button @click="saveContent">Save Content</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GenerateContent',
  data() {
    return {
      title: '',
      description: '',
      content: '',
    };
  },
  async mounted() {
    const response = await this.fetchContent();
    this.title = response.title;
    this.description = response.description;
    this.content = response.content;
  },
  methods: {
    async fetchContent() {
      const response = await axios.post(`/.netlify/functions/generate-content?topic=${this.topic}`);
      return {
        title: response.title,
        description: response.description,
        content: response.content,
      };
    },
    async saveContent() {
      const response = await axios.post('/.netlify/functions/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.title,
          description: this.description,
          content: this.content,
        }),
      });
      const data = await response.json();
      console.log('Saved content with ID:', data.id);
    },
  },
};
</script>