<template>
  <article class="wrapper">
    <!-- <JsonEditorVue v-model="article" /> -->
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
    <div v-else>{{ JSON.stringify(article.color) }}
      <header :style="{ 'background-color': article.color.background, }" :data-glyph="glyph" ref="header"
        :data-title="article.title">
        <h1 class="headline">{{ article.title }}</h1>
      </header>
      <img :src="article.image.compressed" :alt="article.shortTitle" class="main-image">

      <div v-html="article.content" class="content"></div>
    </div>
  </article>
</template>

<script>
import axios from 'axios';
// /import JsonEditorVue from 'json-editor-vue';
import DOMPurify from 'dompurify';
import dyes from '../data/dyes.json';
import { contrastingColor, adjustLightness } from '../services/colors.js';


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
      colorShade: '',
      glyph: '',
      originalArticle: {},
    };
  },
  computed: {
    disabled() {
      return this.article.title !== this.originalArticle.title || this.article.shortTitle !== this.originalArticle.shortTitle || this.article.content !== this.originalArticle.content;
    },
  },
  created() {
    this.article = this.addColorObject(this.articles.find((article) => article.shortTitle === this.topic));
    this.article.content = DOMPurify.sanitize(this.article.content);
    this.originalArticle = JSON.parse(JSON.stringify(this.article));
    this.glyph = this.article.shortTitle.toLowerCase();

    this.colorShade = adjustLightness(this.article.color.background, 80);

  },
  mounted() {
    console.log(this.article.color.background)
    console.log(this.colorShade)
    this.$refs.header.style.setProperty('--color-shade', this.colorShade);
    const c = this.$refs.header.style.getPropertyValue('--color-shade');
    console.log(c);
  },
  methods: {
    addColorObject(article) {
      return {
        ...article,
        color: {
          background: article.color,
          color: contrastingColor(article.color),
        },
      };
    },
    async submitForm(article) {
      const result = await axios.post('/article', article);
      console.log(result);
    },
  },
};
</script>

<style scoped>
.main-image {
  width: 100%;
  height: auto;
}

header {
  padding: 1rem;
  text-align: center;
  overflow: hidden;
  width: calc(100% - 2rem);
  height: 100%;
  position: relative;
  background-blend-mode: lighten;
}

header::before {
  content: attr(data-shade);
  font-size: 18rem;
  font-weight: 700;
  position: absolute;
  color: #ff0000;
  top: -7rem;
  left: 0;
  height: 100%;
  /* Make it fill the entire width and height of the header */
}


input,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}
</style>
