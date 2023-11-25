<!-- src/views/HomePage.vue -->
<template>
  <div>
    <h1>Generate Content</h1>
    <input v-model="topic" placeholder="Type topic here" /><br />
    <input v-model="grade" placeholder="Type grade here" /><br />
    <input v-model="len" placeholder="Type length here" /><br />
    <button @click="newParams">New Params</button><br />
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <div v-html="content"></div>
    <div v-html="sidebar"></div>
    <button @click="saveContent()">Save Content</button>
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
      len: 0,
      title: '',
      description: '',
      content: '',
      sidebar: '',
    };
  },
  created() {
    this.newParams();
  },
  methods: {

    async saveContent() {
      await axios.post('/.netlify/functions/generatecontent-background', {
        topic: this.topic,
        grade: this.grade,
        len: this.len,
      });
    },
    getAGrade() {
      const grades = [6, 7, 8, 9, 10, 11, 12];
      return grades[Math.floor(Math.random() * grades.length)];
    },
    getALength(min, max, mid) {
      const range = max - min;
      const mean = (mid - min) / range; // Mean of the distribution, relative to the range
      const stdDev = 0.2; // Adjust the standard deviation based on your preferences

      // two independent standard normally distributed random numbers
      const u1 = 1 - Math.random(); // to avoid log(0)
      const u2 = 1 - Math.random();
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      // Scale and shift the distribution
      let result = Math.round(mean * range + min + z0 * stdDev * range);

      // Ensure the result is greater than the minimum

      // Ensure the result is less than the maximum
      result = max - Math.abs(max - result);

      return Math.abs(result);
    },
    newParams() {
      this.grade = this.getAGrade();
      this.len = this.getALength(200, 1000, 400);
    },
    createLengthWithOutliers(min, max) {
      const range = max - min;
      const u = Math.random();
      const v = Math.random();
      const standardNormal = Math.abs(Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v));

      // Adjust the scaling to compress the range
      let result = (range / 2) * (standardNormal + 1) * 0.4;

      // Generate noise that is normally distributed around 0
      const uNoise = Math.random();
      const vNoise = Math.random();
      const noise = Math.abs(Math.sqrt(-2.0 * Math.log(uNoise))
        * Math.cos(2.0 * Math.PI * vNoise)) * (range / 20);

      result += noise;

      // Ensure the result is within [min, max]
      result = Math.max(min, Math.min(max, result));

      return result;
    },
  },
};
</script>
