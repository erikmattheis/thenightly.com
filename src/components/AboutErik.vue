<template>
    <article class="wrapper">
        <div v-if="!editMode">
            <div v-if="isLoading" class="wrapper">
                <header
                    :style="{
                        'background-color': `${article.color.background}99`,
                        color: article.color.color,
                    }"
                >
                    <h1 class="headline">{{ article.title }}</h1>
                </header>
                <div class="image-container">
                    <LoadingMessage
                        class="main-image"
                        :isLoading="isLoading"
                        :primaryColor="article.color.background"
                        :secondaryColor="article.color.color"
                    />
                    <img
                        :src="article.image.compressed"
                        :alt="article.shortTitle"
                        class="loading-image"
                        @loaded="isLoading = false"
                    />"
                </div>
            </div>
            <div v-else>
                <header
                    :style="{
                        'background-color': `${article.color.background}99`,
                        color: article.color.color,
                    }"
                >
                    <h1 class="headline">{{ article.title }}</h1>
                </header>
                <div class="image-container">
                    <img
                        :src="article.image.compressed"
                        :alt="article.shortTitle"
                        class="main-image"
                        @loaded="isLoading = false"
                    />
                </div>
            </div>
            <div class="content">
                <p><h2>About</h2> the Developer</p>

                <p><h3>Hey there!</h3> I'm Erik Mattheis, a Full Stack Developer based
                    in Saint Paul, MN. With expertise in Javascript, Vue.js,
                    NodeJS, MongoDB, and more, I've collaborated with big names
                    like BMW, Coca-Cola, and NASA.</p>
                    
                <p>I have Agile experience as a scrum master and developer. Co-led 
                  a Meetup for entrepreneurs interested in Lean startup methods that involved game-like role-playing excercizes.
                  Independent contractor since 2012, crafting solutions for Articl.net, Grocery Shopping
                    Network, Authentic A Tees and more.</p>
                    
                    <p><h3>Let's Talk</h3> I'm open to turning your ideas into digital wonders—especially if it
                    involves a good laugh. Reach out at <a href="mailto:erik@mattheis.org">erik@mattheis.org</a> or
                    (M) <a href="tel:612-377-2272">612-377-2272</a>. If you're willing to pay for brilliance (and
                    maybe a dad joke or two), I'm your developer!</p>


            </div>
        </div>
    </article>
</template>

<script>
import LoadingMessage from './LoadingMessage.vue'
import { contrastingColor } from '../services/colors.js'

export default {
    name: 'AboutErik',
    components: { LoadingMessage },
    data() {
        return {
            isLoading: false,
            darken: false,
        }
    },
    methods: {
    },
}
</script>

<style scoped>

h2, h3 {
  display: inline;
  font-weight: 700;
  font-style: italic;

}
</style>
