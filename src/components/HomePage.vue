<!-- src/views/HomePage.vue -->
<template>
  <div class="wrapper">
    <div class="text">

      <h2>Embark on an AI-Infused Exploration</h2>

      <p>Dive into the fascinating world of natural dyes and fabrics, where tradition meets innovation. 'Naturally Hued'
        isn't just a magazine; it's a unique journey crafted through an iterative dance between human creativity and the
        magic of AI. Let the pages unfold, revealing insights and stories brought to life by a collaborative effort.</p>

      <p>Experience the fusion of human and artificial intelligence as we bring you cutting-edge insights, trends, and
        narratives in the realm of sustainable fashion. Our project isn't just about colors and fabrics; it's a
        testament
        to the limitless possibilities when creativity collaborates with technology.</p>

    </div>
    <blockquote class="quote">Welcome to 'Naturally Hued,' where every pixel, every word, is a testament to the exciting
      possibilities when human curiosity meets the power of AI."</blockquote>
    <div class="text">
      <h2>Explore the World of Natural Dyes</h2>
      <p>From the ancient Indus Valley civilization to the modern-day fashion runways, natural dyes have been a part of
        our
        lives for centuries. Discover the fascinating history of natural dyes, their cultural significance, and the
        science
        behind their creation.</p>
      <h2>Crafting Sustainability with Code</h2>
      <p>Behind the scenes, we've harnessed the power of AI to enhance our understanding of natural dyes and sustainable
        practices. Explore how technology has woven its threads into the very fabric of this project, from content
        curation to design, creating an immersive experience that resonates with the ethos of 'Naturally Hued.'</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  components: {
  },
};
</script>

<style scoped>
article {
  padding: 1rem;
}

.wrapper {
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
