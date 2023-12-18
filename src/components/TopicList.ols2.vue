<template>
  <div class="header">
    <div class="drawer-container">
      <transition name="slide">

        <ul class="drawer" v-show="expanded">

          <li v-for="article in  topics " :key="article.shortTitle"
            :style="{ 'background-color': article.color.background }" ref="listItems">

            <router-link :to="{ name: 'DynamicContent', params: { topic: article.shortTitle } }"
              :style="{ 'background-color': article.color.background, 'color': article.color.color }" class="link">
              {{ article.shortTitle }}
            </router-link>

          </li>

        </ul>

      </transition>
    </div>
    <div class="floating-button-container">
      <div class="floating-button" :class="{ 'expanded2': expanded }">
        <button @click.prevent="toggleDrawer" @touchstart.prevent="toggleDrawer" ref="button">
          <svg version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <path ref="rectangle" fill="#fff"
              d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
          </svg>
        </button>
      </div>
    </div>
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
      expanded: false,
      buttonStoppedColor: this.hexStringToHsl('#FF0000'),
    };
  },
  computed: {
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
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    handleMouseMove(event) {
      console.log('handleMouseMove', event.clientX);
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
    calculateNewHSLColor({ h1, s, l }, percent) {
      const h = h1 * (1 + (percent / 100));
      const result = `hsl(${h}, ${s}, ${l})`;
      console.log('calculateNewHSLColor', result);
      return result;
    },
    rgbStringToRgbObj(rgb) {
      const obj = rgb.replace(/[^\d,]/g, '').split(',');
      return obj;
    },
    rgbStringToHslString(rgb) {
      const rgbObj = this.rgbStringToRgbObj(rgb);
      const hsl = this.rgbObjToHslString(rgbObj);
      return hsl;
    },
    rgbObjToHslString({ r1, g1, b1 }) {
      const r = r1 / 255;
      const g = g1 / 255;
      const b = b1 / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h;
      let s;
      const l = (max + min) / 2;

      if (max === min) {
        h = 0;
        s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        h /= 6;
      }
      const result = { h: h * 360, s: s * 100, l: l * 100 };
      return result;
    },
    hexStringToRgbObj(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 0, g: 0, b: 0 };
    },
    hexStringToHsl(hex) {
      const rgb = this.hexStringToRgbObj(hex);
      const hsl = this.rgbObjToHslString(rgb);
      return hsl;
    },
    contrastingColor(hex) {
      const rgb = this.hexStringToRgbObj(hex);
      const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b);
      return (luminance < 140) ? '#ffffff' : '#000000';
    },
  },
};
</script>

<style scoped>
header {
  z-index: 9999;
}

.floating-button-container {
  position: relative;
  width: 150px;
  height: 100vh;
  z-index: 2;
  background-color: #ffffff99;

}

.floating-button {
  position: absolute;
  vertical-align: top;
  left: 0;
  top: 0;
  height: 100%;
  transition: all 0.3s ease;
}

.floating-button.expanded {
  left: calc(100% - 40px);
}

button {
  border: 0;
  padding: 0;
  margin: 0;
  background-color: red;
  cursor: pointer;
}


svg {
  width: 40px;
}


.drawer-container {

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  width: 150px;
  padding-left: 40px;
}

.link {
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
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
    transform: translateX(-250px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
