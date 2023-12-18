<template>
  <div class="header">
    <div class="nav-activation-area"></div>
    <div class="floating-button">
      <button @click.prevent="toggleDrawer" @touchstart.prevent="toggleDrawer" class="top-control">
        <svg class="svg" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <path ref="rectangle" fill="#fff"
            d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
        </svg>
      </button>
    </div>

    <ul class="drawer" :class="{ 'expanded': expanded }">
      <li class="top-control">
        <router-link to="/" class="link top-control">
          Home
        </router-link>
      </li>
      <li class="top-control">
        <router-link to="/about" class="link top-control">
          About
        </router-link>
      </li>
      <li v-for="article in topics" :key="article.shortTitle" :style="{ 'background-color': article.color.background }">
        <router-link :to="{ name: 'DynamicContent', params: { topic: article.shortTitle } }"
          :style="{ 'background-color': article.color.background, 'color': article.color.color }" class="link">
          {{ article.shortTitle }}
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
// import axios from 'axios';
import dyes from '../data/dyes.json';
import { contrastingColor } from '../services/colors.js';

export default {
  name: 'TopicList',
  data() {
    return {
      editMode: false,
      topics: dyes,
      expanded: false,
      // buttonStoppedColor: this.hexStringToHsl('#FF0000'),
    };
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
    }));

    this.topics = [...this.topics, ...this.topics, ...this.topics];
    window.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    handleMouseMove(event) {
      if (event.clientX < 64) {
        this.expanded = true;
      } else if (!this.expanded && event.clientX > 64) {
        this.expanded = false;
      }
      else if (this.expanded && event.clientX > 150) {
        this.expanded = false;
      }
    },
    toggleDrawer() {
      this.expanded = !this.expanded;
    },
    async submitForm(article) {
      try {
        // await axios.post('functions', this.form);
        this.editMode[article.shortTitle] = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  left: 0;
  top: 0;
  --button-width: 3rem;
  --nav-width: 13rem;
  z-index: 100;
}

.nav-activation-area {
  position: fixed;
  width: var(--button-width);
  height: 100vh;
  z-index: 10;
  background-color: #ffffff55;
}

.top-control {
  background-color: black;
  color: white;
}

.floating-button {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.drawer-container {

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
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
  left: -13rem;
  transition: all 0.3s ease;
}

.drawer.expanded {
  position: fixed;
  top: 0;
  left: 0;
}

li {
  width: calc(var(--nav-width) - 0.5rem);
  line-height: 1.5;
  padding: 0;
  padding-left: calc(var(--button-width) + 0.5rem);
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

button {
  border: 0;
  padding: 0;
  margin: 0;
  background-color: red;
  cursor: pointer;
}
</style>
