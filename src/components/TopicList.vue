<template>
  <div class="drawer-container">

    <button ref="floatingButton" @click="toggleDrawer" v-if="!isDrawerOpen" class="floating-button">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"
        viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve" fill="#fff">
        <g>
          <rect x="7" y="12" width="12" height="12" :style="{ 'fill': buttonStoppedColor }">
            <animate v-if="animateButton" attributeName="fill" values="red;orange;yellow;green;blue;indigo;violet;red"
              dur="5s" repeatCount="indefinite" />
          </rect>
          <path
            d="M7.8248291,9.8899841c-0.8098145,0.0700073-1.619873,0.1500244-2.4399414,0.25   c-1.8200684,0.2299805-3.1899414,1.7700195-3.1899414,3.5800171v7.1900024c0,2.2399902,1.8200684,4.0599976,4.0500488,4.0599976   h13.5c2.2399902,0,4.0600586-1.8200073,4.0600586-4.0599976v-7.1900024c0-1.8099976-1.3701172-3.3500366-3.2001953-3.5800171   c-0.8498535-0.0999756-1.7099609-0.1900024-2.5698242-0.2600098c-0.2102051-0.0200195-0.380127-0.1900024-0.380127-0.3999634   V7.9299622h0.2399902c1.3701172,0,2.4899902-1.1199951,2.4899902-2.4899902V3.7599792   c0-1.5-1.2199707-2.7299805-2.7299805-2.7299805H8.1048584c-1.369873,0-2.4899902,1.1199951-2.4899902,2.5v1.9099731   c0,1.3699951,1.1201172,2.4899902,2.4899902,2.4899902h0.1000977v1.5599976   C8.2049561,9.6999817,8.0450439,9.8699646,7.8248291,9.8899841z M9.8548584,14.0499573h6.2900391   c0.9299316,0,1.6799316,0.75,1.6799316,1.6800537v3.4599609c0,0.9299927-0.75,1.6799927-1.6799316,1.6799927H9.8548584   c-0.9199219,0-1.6799316-0.75-1.6799316-1.6799927V15.730011C8.1749268,14.7999573,8.9349365,14.0499573,9.8548584,14.0499573z" />
        </g>
      </svg>
    </button>

    <transition name="slide">

      <ul v-show="isDrawerOpen" class="drawer">

        <li class="button-container">

          <button ref="movingButton" @click="toggleDrawer" class="moving-button">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px"
              y="0px" viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve" fill="#fff">
              <g>
                <rect x="7" y="12" width="12" height="12" ref="rectangle">
                  <animate attributeName="fill" values="red;orange;yellow;green;blue;indigo;violet;red" dur="5s"
                    repeatCount="indefinite" />
                </rect>
                <path
                  d="M7.8248291,9.8899841c-0.8098145,0.0700073-1.619873,0.1500244-2.4399414,0.25   c-1.8200684,0.2299805-3.1899414,1.7700195-3.1899414,3.5800171v7.1900024c0,2.2399902,1.8200684,4.0599976,4.0500488,4.0599976   h13.5c2.2399902,0,4.0600586-1.8200073,4.0600586-4.0599976v-7.1900024c0-1.8099976-1.3701172-3.3500366-3.2001953-3.5800171   c-0.8498535-0.0999756-1.7099609-0.1900024-2.5698242-0.2600098c-0.2102051-0.0200195-0.380127-0.1900024-0.380127-0.3999634   V7.9299622h0.2399902c1.3701172,0,2.4899902-1.1199951,2.4899902-2.4899902V3.7599792   c0-1.5-1.2199707-2.7299805-2.7299805-2.7299805H8.1048584c-1.369873,0-2.4899902,1.1199951-2.4899902,2.5v1.9099731   c0,1.3699951,1.1201172,2.4899902,2.4899902,2.4899902h0.1000977v1.5599976   C8.2049561,9.6999817,8.0450439,9.8699646,7.8248291,9.8899841z M9.8548584,14.0499573h6.2900391   c0.9299316,0,1.6799316,0.75,1.6799316,1.6800537v3.4599609c0,0.9299927-0.75,1.6799927-1.6799316,1.6799927H9.8548584   c-0.9199219,0-1.6799316-0.75-1.6799316-1.6799927V15.730011C8.1749268,14.7999573,8.9349365,14.0499573,9.8548584,14.0499573z" />
              </g>
            </svg>
          </button>
        </li>

        <li v-for="article in topics" :key="article.shortTitle"
          :style="{ 'background-color': article.color.background, transform: `scaleY(${article.scaleFactor}) translateY(${article.translateY}px)` }"
          ref="listItems">

          <router-link :to="{ name: 'DynamicContent', params: { topic: article.shortTitle } }"
            :style="{ 'background-color': article.color.background, 'color': article.color.color }" class="link">
            {{ article.shortTitle }}
          </router-link>

        </li>

      </ul>

    </transition>

  </div>
</template>

<script>

// import axios from 'axios';
import dyes from '../data/dyes.json';

export default {
  name: 'TopicList',
  data() {
    return {
      editMode: false,
      topics: dyes,
      isDrawerOpen: true,
      animateButton: true,
      buttonStoppedColor: 'transparent',
    };
  },
  computed: {
    rectangleStyle() {
      if (this.animateButton) {
        // Calculate the colors...
        const t14Color = calculateColor(this.buttonStoppedColor, 14);
        const t28Color = calculateColor(this.buttonStoppedColor, 28);
        const t42Color = calculateColor(this.buttonStoppedColor, 42);
        const t57Color = calculateColor(this.buttonStoppedColor, 57);
        const t71Color = calculateColor(this.buttonStoppedColor, 71);
        const t85Color = calculateColor(this.buttonStoppedColor, 85);

        return `
        animation: rainbow 5s linear infinite;
        --start-color: ${this.buttonStoppedColor};
        --t14-color: ${t14Color};
        --t28-color: ${t28Color};
        --t41-color: ${t42Color};
        --t57-color: ${t57Color};
        --t71-color: ${t71Color};
        --t85-color: ${t85Color};
        
      `;
      }
      return `fill: ${this.buttonStoppedColor};`;
      // return `animation: rainbow 5s linear infinite; --start-color: ${this.buttonStoppedColor};`;
    },
  },
  mounted() {
    this.topics = this.topics.map((topic) => ({
      ...topic,
      color: {
        background: topic.color,
        color: this.contrastingColor(topic.color),
      },
    }));
    window.addEventListener('mousemove', this.handleMouseMove);
    const { movingButton } = this.$refs;
    const { floatingButton } = this.$refs;

    const observer = new MutationObserver(() => {
      floatingButton.style.left = `${movingButton.offsetLeft}px`;
    });

    observer.observe(movingButton, { attributes: true, childList: true, subtree: true });
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
  watch: {
    animateButton(newVal) {
      if (!newVal) {
        const { rectangle } = this.$refs;
        const style = window.getComputedStyle(rectangle);
        const fillColor = style.fill;

        this.buttonStoppedColor = fillColor;
      }
    },
  },
  methods: {
    calculateColor(hex, percent) {
      const rgb = this.hexToRgb(hex);
      const r = Math.floor((rgb.r * (100 + percent)) / 100);
      const g = Math.floor((rgb.g * (100 + percent)) / 100);
      const b = Math.floor((rgb.b * (100 + percent)) / 100);

      return `rgb(${r}, ${g}, ${b})`;
    },
    handleMouseMove(event) {
      if (event.clientX < 100) {
        this.isDrawerOpen = true;
        this.animateButton = true;
      } else {
        this.isDrawerOpen = false;
        this.animateButton = false;
      }
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      this.animateButton = !this.animateButton;
    },
    async submitForm(article) {
      try {
        // await axios.post('functions', this.form);
        this.editMode[article.shortTitle] = false;
      } catch (error) {
        console.error(error);
      }
    },
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 0, g: 0, b: 0 }; // default to black
    },
    contrastingColor(hex) {
      const rgb = this.hexToRgb(hex);
      const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b);
      return (luminance < 140) ? '#ffffff' : '#000000';
    },
  },
};
</script>

<style scoped>
.drawer-container {

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
}

.floating-button {
  width: 52px;
  height: 52px;
  border: 2px solid #fff;
  background-color: transparent;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 10;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: block;
  margin: 0;
  padding: 1rem;
}

.link {
  text-decoration: none;
  font-weight: 600;
}

.drawer {
  position: relative;
  width: 250px;
  background-color: #c24141;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.drawer button {
  width: 52px;
  height: 52px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: block;
  animation: slideIn 0.5s forwards;
  z-index: 12;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
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

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
