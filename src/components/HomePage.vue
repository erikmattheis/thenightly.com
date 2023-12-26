<!-- src/views/HomePage.vue -->
<template>
    <div class="content">
        <header style="background-color: #00000099;
                    color: #ffffff;
                    background-blend-mode: multiply;">
            <p>
            <h2>Embark</h2> on an AI-Infused Exploration</p>
        </header>
        <article class="wrapper">
            <div class="text">
                <h2 class="sec">About</h2>

                <p>
                    Dive intoating world of natural dyes and fabrics, where
                    tradition meets innovation. 'Naturally Hued' isn't just a
                    magazine; it's a unique journey crafted through an iterative
                    dance between human creativity and the magic of AI. Let the
                    pages unfold, revealing insights and stories brought to life
                    by a collaborative effort.
                </p>

                <p>
                    Experience the fusion of human and artificial intelligence
                    as we bring you cutting-edge insights, trends, and
                    narratives in the realm of sustainable fashion. Our project
                    isn't just about colors and fabrics; it's a testament to the
                    limitless possibilities when creativity collaborates with
                    technology.
                </p>
            </div>

            <div class="text">
                <h2 class="sec">Explore the World of Natural Dyes</h2>
                <p>
                    From the ancient Indus Valley civilization to the modern-day
                    fashion runways, natural dyes have been a part of our lives
                    for centuries. Discover the fascinating history of natural
                    dyes, their cultural significance, and the science behind
                    their creation.
                </p>
                <h2 class="sec">Crafting Sustainability with Code</h2>
                <p>
                    Behind the scenes, we've harnessed the power of AI to
                    enhance our understanding of natural dyes and sustainable
                    practices. Explore how technology has woven its threads into
                    the very fabric of this project, from content curation to
                    design, creating an immersive experience that resonates with
                    the ethos of 'Naturally Hued.'
                </p>
            </div>
            <footer>
                <blockquote>
                "The dye told the cloth, 'It's not you, it's dye.' Sometimes you just have to leave and see the rainbow on
                the other side!"
            </blockquote>
                Why did the dye go on a journey? It wanted to find its true hue-north!"
            </footer>
        </article>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            isLoading: true,
        }
    },
    mounted() {
        this.isLoading = false
    },
}
</script>

<style scoped>
h2.sec {
    font-size: 3rem;
    transform:scaleY(1.2);
    margin-bottom: 3rem;
}

h3 {
    font-size: 2.5rem;
}

p {
    font-size: 1.25rem;
    line-height: 1.8;
}

h2,
h3 {
    display: inline;
    font-style: italic;
    line-height: 1;
    margin: 0;
}

header {
    margin-bottom: 4rem;
}
</style>
