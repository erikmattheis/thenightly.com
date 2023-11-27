<!-- src/views/HomePage.vue -->
<template>
  <div>
    <div v-for="(article, i) in articles" :key="i">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <div v-html="article.content"></div>

      <button @click="saveContent()">Save Content</button>
    </div>
  </div>
</template>

<script>
import dyes from '../data/dyes.json';

export default {
  name: 'DynamicContent',
  data() {
    return {
      articles: dyes,
    };
  },
  created() {
    this.newParams();
  },
  methods: {

    getAGrade() {
      const grades = [7, 8, 9, 10, 11, 12, 'college'];
      return grades[Math.floor(Math.random() * grades.length)];
    },
    normalRandom(mean, stdDev) {
      let u = 0;
      let v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      num = num * stdDev + mean; // Translate to desired mean and standard deviation

      num = Math.max(num, 0); // In case of negative values
      return num;
    },
    getALength(assignedWords) {
      let finalWordCount;
      do {
        const revisionFactor = this.normalRandom(1.1, 0.07);
        finalWordCount = (assignedWords * revisionFactor);

        finalWordCount = Math.round(finalWordCount);
      } while (finalWordCount < assignedWords * 0.7 || finalWordCount > assignedWords * 1.5);
      return finalWordCount;
    },
    newParams() {
      this.grade = this.getAGrade();
      this.len = this.getALength(100);
    },
  },
};
</script>
