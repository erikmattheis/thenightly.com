<template>
    <div class="header">
        <ul class="drawer" :class="{ expanded: expanded }">
            <li class="special-page-link">
                <router-link to="/" class="link"> Home </router-link>
            </li>
            <li class="special-page-link">
                <router-link to="/about" class="link"> About </router-link>
            </li>
            <li
                v-for="article in topics"
                :key="article.shortTitle"
                :style="{ 'background-color': article.color.background }"
            >
                <router-link
                    :to="{
                        name: 'DynamicContent',
                        params: { topic: article.shortTitle },
                    }"
                    :style="{
                        'background-color': article.color.background,
                        color: article.color.color,
                    }"
                    class="link"
                >
                    {{ article.shortTitle }}
                </router-link>
            </li>
        </ul>
        <div style="float: right">expanded: {{ expanded }}</div>
        <div class="floating-button">
            <button @click.prevent="toggleDrawer" class="top-control">
                <svg
                    viewBox="115.7643 62.0205 195.9395 195.1673"
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    style="width: 100%; height: 100%"
                >
                    <g
                        transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 118.81526947021483, 145.49591064453125)"
                    >
                        <g
                            transform="matrix(1.128446, 0, 0, 1.224057, 209.494965, 87.574318)"
                            style="transform-origin: 47.808px -22.186px"
                        >
                            <path
                                d="M -82.561 -105.401 C -78.989 -66.66 -120.968 -16.287 -182.911 -23.713 C -152.694 -54.353 -160.658 -84.226 -160.658 -105.401 C -160.658 -134.917 -128.117 -153.365 -102.086 -138.607 C -90.004 -131.757 -83.819 -119.041 -82.561 -105.401 Z M -103.127 -123.282 C -103.516 -123.975 -103.97 -124.631 -104.486 -125.239 C -106.321 -127.888 -109.295 -129.56 -112.549 -129.777 C -117.931 -129.966 -122.345 -125.631 -122.153 -120.346 C -122.159 -118.044 -121.286 -115.822 -119.707 -114.119 L -119.797 -114.03 C -110.848 -105.349 -106.442 -93.122 -107.838 -80.846 C -107.838 -80.846 -91.349 -103.265 -103.127 -123.282 Z"
                                style="
                                    transform-box: fill-box;
                                    transform-origin: 50% 50%;
                                "
                                transform="matrix(-1, 0, 0, -1, 0.000008, -0.000011)"
                            />
                        </g>
                    </g>
                    <g
                        transform="matrix(6.825747013092041, 0, 0, 6.574432849884033, 134.48666381835938, 86.1821060180664)"
                        style=""
                    />
                    <g
                        transform="matrix(-1.128445982933, 0, 0, -1.224056959152, 212.906155099503, 204.156755711491)"
                        style="transform-origin: 47.8078px -22.1862px"
                    >
                        <path
                            d="M 93.054 -38.195 C 96.626 0.546 54.647 50.919 -7.296 43.493 C 22.921 12.853 14.957 -17.02 14.957 -38.195 C 14.957 -67.711 47.498 -86.159 73.529 -71.401 C 85.611 -64.551 91.796 -51.835 93.054 -38.195 Z M 31.254 27.673 C 31.254 27.673 83.289 -11.261 55.779 -88.396 C 55.368 -88.971 46.852 -89.319 46.852 -89.319 C 47.287 -88.908 82.418 -30.613 31.254 27.673 Z"
                            style=""
                            transform="matrix(-1, 0, 0, -1, 95.887548446655, -39.407169342041)"
                        />
                    </g>
                </svg>
                <!--
                <svg
                    class="svg"
                    version="1.1"
                    viewBox="0 0 32 32"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <path
                        ref="rectangle"
                        fill="#fff"
                        d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
                    />
                </svg>
            --></button>
        </div>
    </div>
</template>

<script>
import dyes from '../data/dyes.json'
import { contrastingColor } from '../services/colors.js'

export default {
    name: 'TopicList',
    data() {
        return {
            editMode: false,
            topics: dyes,
            expanded: true,
            // buttonStoppedColor: this.hexStringToHsl('#FF0000'),
        }
    },
    computed: {
        /*
    rectangleStyle() {
      let styles;
      if (this.expanded) {
        const t14Color = this.calculateNewHSLColor(this.buttonStoppedColor, 14);
        const t28Color = this.calculateNewHSLColor(this.buttonStoppedColor, 28);
        const t42Color = this.calculateNewHSLColor(this.buttonStoppedColor, 42);
        const t57Color = this.calculateNewHSLColor(this.buttonStoppedColor, 57);
        const t71Color = this.calculateNewHSLColor(this.buttonStoppedColor, 71);
        const t85Color = this.calculateNewHSLColor(this.buttonStoppedColor, 85);

        styles = `animation: rainbow 5s linear infinite; --start-color: ${this.buttonStoppedColor};
            --t14-color: ${t14Color};
            --t28-color: ${t28Color};
            --t41-color: ${t42Color};
            --t57-color: ${t57Color};
            --t71-color: ${t71Color};
            --t85-color: ${t85Color};`;
      } else {
        styles = `fill: ${this.buttonStoppedColor};`;
      }
      return styles;
    },
    */
    },

    mounted() {
        this.topics = this.topics.map((topic) => ({
            ...topic,
            color: {
                background: topic.color,
                color: contrastingColor(topic.color),
            },
        }))

        this.topics = [
            ...this.topics,
            ...this.topics,
            ...this.topics,
            ...this.topics,
            ...this.topics,
        ]
        window.addEventListener('mousemove', this.handleMouseMove)
    },
    beforeUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove)
    },
    methods: {
        handleMouseMove(event) {
            console.log('handleMouseMove', event.clientX)
            if (event.clientX < 100 && !this.expanded) {
                console.log('mousemove expands')
                this.expanded = true
            } else if (event.clientX > 240 && this.expanded) {
                console.log('mousemove contracts')
                this.expanded = false
            }
        },
        toggleDrawer() {
            console.log('toggleDrawer', this.expanded ? 'expands' : 'contracts')
            this.expanded = !this.expanded
        },
        toggleDrawerTouch() {
            console.log(
                'toggleDrawerTouch',
                this.expanded ? 'expands' : 'contracts'
            )
            this.expanded = !this.expanded
        },
        async submitForm(article) {
            try {
                // await axios.post('functions', this.form);
                this.editMode[article.shortTitle] = false
            } catch (error) {
                console.error(error)
            }
        },
    },
}
</script>

<style scoped>
.header {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
}

.drawer-container {
    ::-webkit-scrollbar {
        display: none;
    }

    scrollbar-width: none;

    -ms-overflow-style: none;
}

.floating-button {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--button-width);
    height: var(--button-width);
    z-index: 100;
}

.svg {
    margin: 0;
    padding: 0;
    width: var(--button-width);
    height: var(--button-width);
}

.drawer {
    position: fixed;
    top: 0;
    left: var(--negative-total-width);
    transition: all 0.3s ease;
}

.drawer.expanded {
    position: fixed;
    top: 0;
    left: 0;
}

li {
    width: calc(var(--nav-width) - 2rem);
    line-height: 1.5;
    padding: 0 0.5rem;
}

router-link a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(var(--negative-total-width));
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}

@keyframes rainbow {
    0% {
        fill: var(--start-color);
    }

    14% {
        fill: var(--t14-color);
    }

    28% {
        fill: var(--t28-color);
    }

    42% {
        fill: var(--t42-color);
    }

    57% {
        fill: var(--t57-color);
    }

    71% {
        fill: var(--t71-color);
    }

    85% {
        fill: var(--t85-color);
    }

    100% {
        fill: var(--start-color);
    }
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.link {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
}

.special-page-link,
.special-page-link a,
.special-page-link a:link {
    text-align: right;
    background-color: black;
    color: white;
}

button {
    border: 0;
    padding: 0;
    margin: 0;
    background-color: red;
    cursor: pointer;
}
</style>
