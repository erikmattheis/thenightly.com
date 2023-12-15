<template>
  <article>
    <!-- <TopFilter :filters="articles" /> -->
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
        <button type="button" @click="editMode = false">Cancel</button>
      </form>
    </div>
    <div v-else>
      <article class="wrapper">
        <h2 v-bind="title" :style="{ 'background-color': article.color }"></h2>
        <div class="text" v-html="article.content"></div>
        <blockquote class="quote">Welcome to 'Naturally Hued,' where every pixel, every word, is a testament to the
          exciting possibilities when human curiosity meets the power of AI."</blockquote>
      </article>
    </div>
  </article>
</template>

<script>
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
  // components: { TopFilter },
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

  },
};
</script>

<style scoped>
article {
  padding: 1rem;
}

.wrapper {
  max-width: 600px;
  margin: auto;
  padding: 1.5rem
}

blockquote {
  padding: 1.5rem 1.5rem 1.5rem 0;
  margin-left: 0;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
  font-family: serif;
  font-style: italic;
}

@media (min-width: 768px) {

  .wrapper {
    padding: 0
  }

  blockquote {
    margin: 0 0 0 -3rem;
    width: 50%;
    float: left;
    padding: 3rem 3rem 3rem 0;
  }

  .text,
  .headline {
    margin-left: 150px
  }
}
</style>
