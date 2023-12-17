<template>
  <div>
    <!-- <JsonEditorVue v-model="article" /> -->
    <a href @click.prevent="editMode = !editMode">Toggle Mode</a>
    <div v-if="editMode">
      <form @submit.prevent="submitForm(article)">
        <label>
          Title
          <input type="text" v-model="article.title" />
        </label><br>
        <label>
          Short Title
          <input type="text" v-model="article.shortTitle" />
        </label><br>
        <textarea v-model="article.content"></textarea><br>
        <button type="submit">Submit</button><br>
        <button type="button" @click="editMode = false" :disabled="disabled">Reset</button>
      </form>
    </div>
    <div v-else class="background-window">
      <header :style="{ 'background-color': article.color }">
        <h1 class="headline">{{ article.title }}</h1>
      </header>
      <img :src="article.image.compressed" alt="">

      <div v-html="article.content" class="background-filter"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// /import JsonEditorVue from 'json-editor-vue';
import DOMPurify from 'dompurify';
import dyes from '../data/dyes.json';
// import TopFilter from '@/components/TopFilter.vue';

export default {
  name: 'DynamicContent',
  props: {
    topic: {
      type: String,
      required: true,
    },
  },
  // components: { JsonEditorVue },
  data() {
    return {
      editMode: false,
      articles: dyes,
      article: {},
      originalArticle: {},
    };
  },
  computed: {
    disabled() {
      return this.article.title !== this.originalArticle.title || this.article.shortTitle !== this.originalArticle.shortTitle || this.article.content !== this.originalArticle.content;
    },
  },
  created() {
    this.article = this.articles.find((article) => article.shortTitle === this.topic);
    this.article.content = DOMPurify.sanatize(this.article.content);
    this.originalArticle = JSON.parse(JSON.stringify(this.article));
  },
  methods: {
    async submitForm(article) {
      const result = await axios.post('/article', article);
      console.log(result);
    },
  },
};
</script>

<style scoped>
input,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}

article {
  padding: 1rem;
}
</style>
