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
            <div
                v-else
                class="hero-wrapper"
                :style="{ 'padding-top': navHeightStr }"
            >
                <div
                    class="hero-nav"
                    ref="hero"
                    :class="{ fixme: fixme }"
                    :style="{ height: navHeightStr }"
                >
                    <div class="hero-nav__inner">
                        <h1>Neat Title</h1>
                        <div class="hero-nav__button">
                            <a href="#" class="btn"></a>
                        </div>
                    </div>
                </div>
                <div style="float: right">{{ navHeightStr }}</div>
                <header
                    :style="{
                        'background-color': `${article.color.background}99`,
                        color: article.color.color,
                    }"
                    ref="header"
                >
                    <h1 class="headline">{{ article.title }}</h1>
                </header>
                <div class="image-container">
                    <img
                        :src="article.image.compressed"
                        :alt="article.shortTitle"
                        class="main-image"
                    />
                </div>
            </div>
            <div v-html="article.content" class="content"></div>
        </div>
        <div v-else>
            <form @submit.prevent="submitForm(article)">
                <label>
                    Title
                    <input type="text" v-model="article.title" /> </label
                ><br />
                <label>
                    Short Title
                    <input type="text" v-model="article.shortTitle" /> </label
                ><br />
                <textarea v-model="article.content"></textarea><br />
                <button type="submit">Submit</button><br />
                <button
                    type="button"
                    @click="editMode = false"
                    :disabled="disabled"
                >
                    Reset
                </button>
            </form>
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
            heroHeight: 0,
            fixme: false,
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
        navHeightStr() {
            return `${this.heroHeight}px`
        },
    },
    created() {
        this.article = this.addColorObject(
            this.articles.find((article) => article.shortTitle === this.topic)
        )
        this.article.content = DOMPurify.sanitize(this.article.content)
        this.originalArticle = JSON.parse(JSON.stringify(this.article))
    },
    mounted() {
        this.heroHeight = this.$refs.hero.offsetHeight
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        addColorObject(article) {
            return {
                ...article,
                color: {
                    background: article.color,
                    color: contrastingColor(article.color),
                },
            }
        },
        handleScroll() {
            const heroHeight = this.$refs.hero.offsetHeight
            var scrollOffset = window.scrollY
            if (scrollOffset < heroHeight) {
                this.heroHeight = heroHeight - scrollOffset
            }
            if (scrollOffset > heroHeight - 215) {
                this.fixme = true
            } else {
                this.fixme = false
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
    z-index: 0;
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
    font-size: 5rem;
    font-weight: 700;
    position: relative;
    z-index: 1;
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

input,
textarea {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
}
</style>

<style>
.hero-nav {
    position: fixed !important;
    z-index: 99999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    min-height: 105px;
    background-image: url(https://images.unsplash.com/photo-1442606383395-175ee96ed967?q=80&fm=jpg&s=5c8c74be9bc91b47c79a1aaf92264be5);
    background-size: cover;
    background-position: center;
    overflow: hidden;
}
.hero-nav .hero-nav__inner {
    z-index: 1;
}
.hero-nav h1 {
    color: #efefef;
    font-size: 5vw;
}
.hero-nav:before {
    content: '';
    background: rgba(0, 0, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background 400ms;
}
.hero-nav.fixme:before {
    background: rgba(0, 0, 0, 0.8);
}
</style>
