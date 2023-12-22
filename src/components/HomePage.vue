<!-- src/views/HomePage.vue -->
<template>
    <div class="wrapper">
        <div class="text" v-if="isLoading">
            <content-loader
                viewBox="0 0 400 460"
                :speed="2"
                primaryColor="#7d7d7d"
                secondaryColor="#ecebeb"
            >
                <rect x="178" y="266" rx="0" ry="0" width="5" height="25" />
            </content-loader>
        </div>
        <div class="text" v-else>
            <h2>Embark on an AI-Infused Exploration</h2>

            <p>
                Dive intoating world of natural dyes and fabrics, where
                tradition meets innovation. 'Naturally Hued' isn't just a
                magazine; it's a unique journey crafted through an iterative
                dance between human creativity and the magic of AI. Let the
                pages unfold, revealing insights and stories brought to life by
                a collaborative effort.
            </p>

            <p>
                Experience the fusion of human and artificial intelligence as we
                bring you cutting-edge insights, trends, and narratives in the
                realm of sustainable fashion. Our project isn't just about
                colors and fabrics; it's a testament to the limitless
                possibilities when creativity collaborates with technology.
            </p>
        </div>
        <blockquote class="quote">
            Welcome to 'Naturally Hued,' where every pixel, every word, is a
            testament to the exciting possibilities when human curiosity meets
            the power of AI."
        </blockquote>
        <div class="text">
            <h2>Explore the World of Natural Dyes</h2>
            <p>
                From the ancient Indus Valley civilization to the modern-day
                fashion runways, natural dyes have been a part of our lives for
                centuries. Discover the fascinating history of natural dyes,
                their cultural significance, and the science behind their
                creation.
            </p>
            <h2>Crafting Sustainability with Code</h2>
            <p>
                Behind the scenes, we've harnessed the power of AI to enhance
                our understanding of natural dyes and sustainable practices.
                Explore how technology has woven its threads into the very
                fabric of this project, from content curation to design,
                creating an immersive experience that resonates with the ethos
                of 'Naturally Hued.'
            </p>
        </div>
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
