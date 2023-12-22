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
import axios from 'axios'
import DOMPurify from 'dompurify'
import dyes from '../data/dyes.json'
import LoadingMessage from './LoadingMessage.vue'
import { contrastingColor } from '../services/colors.js'

export default {
    name: 'DynamicContent',
    components: { LoadingMessage },
    props: {
        topic: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            editMode: false,
            articles: dyes,
            article: {},
            originalArticle: {},
            isLoading: false,
            darken: false,
        }
    },
    computed: {
        disabled() {
            return (
                this.article.title !== this.originalArticle.title ||
                this.article.shortTitle !== this.originalArticle.shortTitle ||
                this.article.content !== this.originalArticle.content
            )
        },
    },
    created() {
        this.setArticle(this.topic)
    },
    watch: {
        '$route.params.topic': {
            immediate: true,
            handler(topic) {
                this.setArticle(topic)
            },
        },
    },
    methods: {
        setArticle(topic) {
            this.article = this.articles.find((article) => {
                return article.topic === topic
            })
            this.originalArticle = JSON.parse(JSON.stringify(this.article))
            this.article.content = DOMPurify.sanitize(this.article.content)
            this.article = this.addColorObject(this.article)
        },
        addColorObject(article) {
            return {
                ...article,
                color: {
                    background: article.color,
                    color: contrastingColor(article.color),
                },
            }
        },
        async submitForm(article) {
            const result = await axios.post('/article', article)
            console.log(result)
        },
    },
}
</script>

<style scoped>

h2, h3 {
  display: inline;
  font-weight: 700;
  font-style: italic;

}
.main-image {
    width: 100%;
    height: auto;
}
.loading-image {
    width: 100%;
    height: auto;
}

header {
    position: relative;
    width: calc(100% - 2rem);
    height: 100%;
    padding: 1rem;
    overflow: hidden;
    text-align: right;
}

header::before {
    position: absolute;
    top: -7rem;
    left: 0;
    /* z-index: 0; */
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

.headline {
    font-weight: 700;
    position: relative;
    /*z-index: 1;*/
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

.content {
    padding: 3rem;
    background-color: #ffffff99;
    backdrop-filter: lighten(0.5);
}

input,
textarea {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
}
</style>
