<!-- src/views/HomePage.vue -->
<template>
  <div class="wrapper">
    <div class="text">
      <p>
        In the tumultuous world of <strong>NATURAL DYES</strong>, where tradition whispers and chaos reigns, explore the
        untamed saga of <strong>BLACK WALNUT</strong>.
      </p>

      <blockquote>
        <p>
          "The hues of rebellion are not mere colors; they are echoes of an untamed spirit, a primal scream against the
          mundane."
        </p>
      </blockquote>

      <p>
        A brief dive into the tumultuous history of <strong>BLACK WALNUT</strong> unveils secrets woven into the fabric of
        civilizations. An aside into the chaos that birthed the hues — a riveting tale that transcends time.
      </p>

      <aside>
        The <strong>BLACK WALNUT</strong>, a rebel in the natural dye palette, has a hidden history that defies the norm.
        A
        tale of defiance, a narrative that extends beyond the boundaries of conventional dyeing practices.
      </aside>

      <p>
        In every fiber dyed with passion, experience the raw fury of nature's own rebellion. Every 200-300 words, a
        pullquote emerges, a sharp cry that pierces through the conventional.
      </p>

      <blockquote>
        <p>
          "In the dance of threads and hues, <em>every color is an act of defiance, every fabric a rebellion.</em>"
        </p>
      </blockquote>

      <p>
        Beyond the chromatic rebellion, explore alternative uses of <strong>BLACK WALNUT</strong>, an unexpected twist
        that
        defies the norm.
      </p>

      <h2>Embark on an AI-Infused Exploration</h2>
      <div class="text">
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
  max-width: 720px;
  margin: auto;
  padding: 1.5rem
}

@media (min-width: 768px) {
  .wrapper {
    padding: 0
  }
}

blockquote {
  margin: 0 0 0 -3rem;
  width: 50%;
  float: left;
  padding: 3rem 3rem 3rem 0;

  padding: 1.5rem 1.5rem 1.5rem 0;
  margin-left: 0;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
  font-family: serif;
  font-style: italic;
}

@media (min-width: 768px) {

  .text,
  .headline {
    margin-left: 150px
  }
}
</style>
