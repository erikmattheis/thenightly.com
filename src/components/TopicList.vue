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
                    :class="{ 'hovered-link': isHovered }"
                    @mouseover="this.isHovered = true"
                    @mouseout="this.isHovered = false"
                    :style="{
                        color: this.isHovered
                            ? article.color.background
                            : article.color.color,
                        'background-color': isHovered
                            ? article.color.color
                            : article.color.background,
                    }"
                >
                    {{ article.shortTitle }}
                </router-link>
            </li>
        </ul>
        <div class="floating-button">
            <button
                @click.prevent="toggleDrawer"
                class="top-control"
                style="padding: 0.4rem"
            >
                <svg
                    viewBox="165.943 85.0498 135.385 85.1675"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M 200.565 85.991 C 199.365 84.736 197.361 84.736 196.161 85.991 C 194.942 87.367 165.943 119.906 165.943 137.109 C 167.712 180.107 229.015 180.107 230.823 137.109 C 230.784 119.906 201.784 87.367 200.565 85.991 Z"
                        style="fill: rgb(255, 111, 8)"
                    />
                    <path
                        d="M 249.207 137.968 C 249.207 136.915 249.769 135.941 250.681 135.414 C 252.647 134.279 255.105 135.698 255.105 137.968 C 255.105 144.026 259.019 149.169 264.456 151.008 C 266.1 147.16 267.122 142.726 267.333 137.706 C 267.293 120.502 238.294 87.964 237.075 86.587 C 235.875 85.333 233.871 85.333 232.671 86.587 C 231.452 87.964 202.452 120.502 202.452 137.706 C 203.913 173.222 245.992 179.402 261.611 156.247 C 254.344 153.359 249.207 146.264 249.207 137.968 Z"
                        style="fill: rgb(89, 33, 33)"
                    />
                    <path
                        d="M 301.328 137.968 C 299.519 180.967 238.216 180.967 236.447 137.968 C 236.447 120.765 265.447 88.226 266.666 86.85 C 267.866 85.596 269.87 85.596 271.07 86.85 C 272.289 88.226 301.288 120.765 301.328 137.968 Z M 268.868 151.731 C 261.267 151.731 255.105 145.569 255.105 137.968 C 255.105 135.698 252.647 134.279 250.681 135.414 C 249.769 135.941 249.207 136.915 249.207 137.968 C 249.207 148.827 258.009 157.629 268.868 157.629 C 271.138 157.629 272.557 155.172 271.422 153.206 C 270.895 152.293 269.921 151.731 268.868 151.731 Z"
                        style="fill: rgb(0, 121, 191)"
                    />
                </svg>
            </button>
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
        mouseOver(event) {
            event.target.style.color = event.target.style.backgroundColor
            this.isHovered = true
        },
        handleMouseMove(event) {
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

.router-link a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s ease, color 0.3s ease; /* Add transition for smooth color change */
}

.router-link a:hover {
    background-color: var(
        --hover-color
    ); /* Use CSS variable for hover background color */
    color: var(--hover-bg-color); /* Use CSS variable for hover text color */
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
    background-color: transparent;
    cursor: pointer;
}
</style>
