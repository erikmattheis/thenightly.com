<template>
    <div v-if="editMode">
        <form @submit.prevent="submitForm(article)">
            <label for="title">Title</label>
            <input
                type="text"
                id="title"
                v-model="article.title"
                placeholder="Title"
            />
            <label for="shortTitle">Short Title</label>
            <input
                type="text"
                id="shortTitle"
                v-model="article.shortTitle"
                placeholder="Short Title"
            />
            <label for="content">Description</label>
            <textarea
                style="width: 600px; height: 300px"
                id="description"
                v-model="article.description"
                placeholder="Description"
            ></textarea>
            <label for="content">Content</label>
            <textarea
                style="width: 600px; height: 300px"
                id="content"
                v-model="article.content"
                placeholder="Content"
            ></textarea>
            <button type="submit" :disabled="!disabled">Submit</button>
        </form>
    </div>
    <h2>
        <a @click="editMode = !editMode" @touchend="editMode = !editMode"
            >edit</a
        >
    </h2>
    <article class="wrapper fade-in">
        <header
            :style="{
                'background-color': `${article.color.background}cc`,
                color: article.color.color,
            }"
        >
            <div
                :style="{
                    'background-image': `url(${article.image.compressed})`,
                }"
                class="title-background"
            >
                <span v-html="formattedTitle"></span>
            </div>
        </header>
        <code style="color: white; white-space: pre">
            {{ JSON.stringify(article, null, 2) }}
        </code>
        <section class="content">
            <div v-html="formattedContent"></div>
        </section>
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
    emits: ['changeBackground'],
    data() {
        return {
            editMode: false,
            articles: dyes,
            article: {},
            formattedTitle: '',
            formattedContent: '',
            originalArticle: {},
            isLoading: false,
        }
    },
    created() {
        this.setArticle(this.topic)
    },
    computed: {
        disabled() {
            return (
                this.article.title !== this.originalArticle.title ||
                this.article.shortTitle !== this.originalArticle.shortTitle ||
                this.article.description !== this.originalArticle.description ||
                this.article.content !== this.originalArticle.content
            )
        },
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
        notRandomNumberBetween2And7(str) {
            if (str.length < 4) {
                return Math.max(str.length, 2)
            }
            const len = str.charCodeAt(2) + str.charCodeAt(3)
            return (len % 6) + 2
        },
        formatTitle(title) {
            const chunks = this.getChunks(title)
            const withTags = this.addTagsToChunks(chunks)
            return withTags
                .join(' ')
                .replace('</h3> <h3 class="title">', ' ')
                .replace('</h2> <h2 class="title">', ' ')
        },
        formatContent() {
            const img = `<img src="${this.article.image.compressed}" alt="${this.article.shortTitle}" class="article-image" />`

            const paragraphs = this.article.content.split('</h2>')
            paragraphs.splice(1, 0, img)

            return paragraphs.join('</h2>')
        },
        getChunks(title) {
            const words = title.split(' ')
            const chunks = []
            let i = 0

            while (i < words.length) {
                const chunkSize = Math.min(2 + (i % 4), words.length - i)
                const chunk = words.slice(i, i + chunkSize).join(' ')
                chunks.push(chunk)
                i += chunkSize
            }

            return chunks
        },
        addTagsToChunks(chunks) {
            const h2Indexes = [
                this.notRandomNumberBetween2And3(chunks[0]),
                this.notRandomNumberBetween2And3(chunks[chunks.length - 1]),
            ].sort()
            if (h2Indexes[0] === h2Indexes[1]) {
                h2Indexes[1]++
            }

            return chunks.map((chunk, index) => {
                if (index === h2Indexes[0] || index === h2Indexes[1]) {
                    return `<h2 class="title"> <span> ${chunk} </span> </h2>`
                } else {
                    return `<h3 class="title"> <span> ${chunk} </span> </h3>`
                }
            })
        },
        notRandomNumberBetween2And3(input) {
            const sum = [...input].reduce(
                (acc, char) => acc + char.charCodeAt(0),
                0
            )
            return Math.floor((sum % input.length) / 2)
        },
        setArticle(topic) {
            this.article = this.articles.find((article) => {
                return article.topic === topic
            })
            this.article.title = DOMPurify.sanitize(this.article.title)
            this.formattedTitle = this.formatTitle(this.article.title)
            this.article.content = DOMPurify.sanitize(this.article.content)
            this.formattedContent = this.formatContent(this.article.content)
            this.article = this.addColorObject(this.article)
            this.originalArticle = JSON.parse(JSON.stringify(this.article))
            this.$emit('changeBackground', this.article.image.compressed)
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
        async saveArticle() {
            await axios.post('/.netlify/functions/firestore', {
                title: DOMPurify.sanitize(this.article.title),
                shortTitle: DOMPurify.sanitize(this.article.shortTitle),
                description: DOMPurify.sanitize(this.article.description),
                content: DOMPurify.sanitize(this.article.content),
                docId: this.article.docId,
            })
        },

        async submitForm() {
            try {
                await this.saveArticle()
                this.setArticle(this.article.topic)
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>
