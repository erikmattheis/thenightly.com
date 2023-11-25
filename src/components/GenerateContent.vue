<!-- src/views/HomePage.vue -->
<template>
  <div>
    <h1>Generate Content</h1>
    <input v-model="topic" placeholder="Type topic here" />
    <button @click="fetchContent">Generate Content</button>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <div v-html="content"></div>
    <div v-html="sidebar"></div>
    <button @click="testSaveContent">Save Content</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GenerateContent',
  data() {
    return {
      topic: '',
      grade: 8,
      len: 850,
      title: '',
      description: '',
      content: '',
      sidebar: '',
    };
  },
  created() {
    // this.testSaveContent();
  },
  methods: {
    async testSaveContent() {
      const response = await axios.post('/.netlify/functions/testfirestore', {
        title: 'Test Title',
        description: 'Test Description',
        content: 'Test Content',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      console.log('Saved content:', body);
    },
    async fetchContent() {
      const response = await axios.post(`/.netlify/functions/generatecontent-background?topic=${this.topic}&grade=${this.grade}&len=${this.len}`);
      return {
        title: response.title,
        description: response.description,
        content: response.content,
      };
    },
    async saveContent() {
      const response = await axios.post('/.netlify/functions/savecontent', {
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
