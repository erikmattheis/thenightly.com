<template>
  <div>
    <div>
      <div v-if="editMode">
        <form @submit.prevent="submitForm(article)">
          <label>
            Title
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
        <h2 style="color:red">{{ article.title }}</h2>
        <p style="color:green" v-html="`<div>${article.description}</div>`"></p>
        <!-- modern way without float to embed image with text wrapped around it -->

        <p style="color:blue" v-html="`<div>${content}</div>`"></p>
      </div>
    </div>
  </div>
</template>

<script>

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
  computed: {

    content() {
      const { content } = this.article;
      const img = `<img src="/assets/photos/${this.article.image}" alt="${this.article.title}" style="width: 100%; height: auto;" />`;
      const firstParagraph = content.indexOf('</p>');
      return content.slice(0, firstParagraph + 4) + img + content.slice(firstParagraph + 4);
    },

  },
  created() {
    this.article = this.articles.find((article) => article.shortTitle === this.topic);
  },
  methods: {

  },
};
</script>
