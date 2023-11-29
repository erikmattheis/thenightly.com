<template>
  <div>

    <ul v-if="editMode">
      <li v-for="article in topics" :key="article.shortTitle">

        <form @submit.prevent="submitForm(article)">

          <label>
            Topic:
            <input type="text" v-model="article.shortTitle" />
          </label>

          <button type="submit">Submit</button>

          <button type="button" @click="editMode = false">Cancel</button>

        </form>
      </li>
    </ul>
    <ul v-else>
      <li v-for="article in topics" :key="article.shortTitle" :style="{ 'background-color': article.color.background }">

        <router-link :to="{ name: 'DynamicContent', params: { topic: article.shortTitle } }"
          :style="{ 'background-color': article.color.background, 'color': article.color.color }" class="link">
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
  mounted() {
    this.topics = this.topics.map((topic) => ({
      ...topic,
      color: {
        background: topic.color,
        color: this.contrastingColor(topic.color),
      },
    }));
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
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      console.log('hextorgb', hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 0, g: 0, b: 0 }; // default to black
    },
    contrastingColor(hex) {
      const rgb = this.hexToRgb(hex);
      const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b);
      return (luminance < 140) ? '#ffffff' : '#000000';
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: block;
  margin: 0;
  padding: 1rem;
}

.link {

  text-decoration: none;
  font-weight: 600;
}
</style>
