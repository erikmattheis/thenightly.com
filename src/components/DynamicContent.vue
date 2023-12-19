<template>
  <article class="wrapper">
    <!-- <JsonEditorVue v-model="article" /> -->
    <div v-if="!editMode">
      <header :style="{ 'background-color': `${article.color.background}99`, 'color': article.color.color }" ref="header"
        :data-background-title="titleLowercase" :data-shade="'#00ff00'">
        <h1 class="headline">{{ article.title }}</h1>
      </header>

      <div class="image-container">
        <img :src="article.image.compressed" :alt="article.shortTitle" class="main-image">
      </div>

      <div v-html="article.content" class="content"></div>
    </div>
    <div v-else>
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
      titleLowercase: '',
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
    const t = this.article.shortTitle.toUpperCase().replace(/\s/g, '');
    this.titleLowercase = t + t + t + t + t + t + t;
    this.colorShade = adjustLightness(this.article.color.background, 10);
  },
  mounted() {
    console.log('this.$refs.header', this.$refs.header)

    this.$refs.header.style.setProperty('--color-shade', this.colorShade);
    const c = this.$refs.header.style.getPropertyValue('--color-shade');
    console.log('mounted', c)
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
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  text-align: right;
}

header::before {
  position: absolute;
  top: -7rem;
  left: 0;
  z-index: 0;
  width: 100%;
  content: attr(data-background-title);
  word-break: break-word;
  font-size: 7rem;
  font-weight: 700;
  font-style: italic;
  line-height: 0.9;
  color: var(--color-shade);
  overflow: hidden;
}

@media screen and (min-width: 390px) {
  header::before {
    top: -10rem;
    font-size: 18rem;
  }

}

.headline {
  font-size: 5rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  padding-top: 56.89%;
  overflow: hidden;
}

.main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

input,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}
</style>
