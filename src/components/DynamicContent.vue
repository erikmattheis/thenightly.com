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
                    />
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
            <section class="content">
                <img
                    :src="article.image.compressed"
                    :alt="article.shortTitle"
                />
                <span v-html="article.content"></span>
            </section>
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
input,
textarea {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
}
</style>
