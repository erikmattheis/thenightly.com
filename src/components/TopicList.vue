<template>
  <div class="drawer-container">

    <div class="fake-li" :class="{ 'w250': expanded }">
      <button @click="toggleDrawer" ref="button" class="floating-button">
        <svg style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path ref="rectangle" fill="#fff"
            d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
        </svg>
        <!--
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"
          viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve" fill="#fff">
          <g>
            <rect x="7" y="12" width="12" height="12" ref="rectangle" :style="rectangleStyle">

            </rect>
            <path
              d="M7.8248291,9.8899841c-0.8098145,0.0700073-1.619873,0.1500244-2.4399414,0.25   c-1.8200684,0.2299805-3.1899414,1.7700195-3.1899414,3.5800171v7.1900024c0,2.2399902,1.8200684,4.0599976,4.0500488,4.0599976   h13.5c2.2399902,0,4.0600586-1.8200073,4.0600586-4.0599976v-7.1900024c0-1.8099976-1.3701172-3.3500366-3.2001953-3.5800171   c-0.8498535-0.0999756-1.7099609-0.1900024-2.5698242-0.2600098c-0.2102051-0.0200195-0.380127-0.1900024-0.380127-0.3999634   V7.9299622h0.2399902c1.3701172,0,2.4899902-1.1199951,2.4899902-2.4899902V3.7599792   c0-1.5-1.2199707-2.7299805-2.7299805-2.7299805H8.1048584c-1.369873,0-2.4899902,1.1199951-2.4899902,2.5v1.9099731   c0,1.3699951,1.1201172,2.4899902,2.4899902,2.4899902h0.1000977v1.5599976   C8.2049561,9.6999817,8.0450439,9.8699646,7.8248291,9.8899841z M9.8548584,14.0499573h6.2900391   c0.9299316,0,1.6799316,0.75,1.6799316,1.6800537v3.4599609c0,0.9299927-0.75,1.6799927-1.6799316,1.6799927H9.8548584   c-0.9199219,0-1.6799316-0.75-1.6799316-1.6799927V15.730011C8.1749268,14.7999573,8.9349365,14.0499573,9.8548584,14.0499573z" />
          </g>
        </svg>
      -->
      </button>
    </div>

    <transition name="slide">

      <ul v-show="expanded" class="drawer">

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
  watch: {
    expanded(newVal) {
      if (newVal) {
        console.log('expanded', newVal);
        const { rectangle } = this.$refs;
        const style = window.getComputedStyle(rectangle);
        const fillColor = style.fill;
        this.buttonStoppedColor = this.rgbStringToHslString(fillColor);
        this.$refs.button.style.position = 'absolute';
        this.$refs.button.style.left = 'auto';
        this.$refs.button.style.right = '10px';
      } else {
        this.$refs.button.style.position = 'fixed';
        this.$refs.button.style.left = '10px';
        this.$refs.button.style.right = 'auto';
      }
    },
  },
  methods: {

    handleMouseMove(event) {
      if (event.clientX < 250) {
        this.expanded = true;
      } else {
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
      // move the hue by percent
      const h = h1 * (1 + (percent / 100));
      const result = `hsl(${h}, ${s}, ${l})`;
      console.log('calculateNewHSLColor', result);
      return result;
    },
    rgbStringToRgbObj(rgb) {
      const obj = rgb.replace(/[^\d,]/g, '').split(',');
      console.log('rgbStringToRgbObj', JSON.stringify(obj));
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
      console.log('rgbObjToHslString', result);
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
      console.log('hexStringToHsl', hsl);
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
.drawer-container {

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
}

.floating-button {
  width: 32px;
  height: 32px;
  border: 2px solid #fff;
  border-radius: 2px;
  background-color: transparent;
  position: absolute;
  top: 10px;
  right: 10px;
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

.fake-li {
  position: fixed;
  top: 10;
  left: 10;
  background-color: aqua;
  z-index: 20;
  transition: all 0.5 ease;
}

.w250 {
  width: 250px;
}

.link {
  text-decoration: none;
  font-weight: 600;
}

.drawer {
  position: relative;
  width: 250px;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.drawer button {
  background-color: transparent;
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
