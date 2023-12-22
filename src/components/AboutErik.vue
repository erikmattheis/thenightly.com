<template>
    <article class="wrapper">

        <div v-if="isLoading" class="wrapper">
            <header style="background-color: #00000099;
                    color: #ffffff;"
            >
            <p><h2>About</h2> the Developer</p>
            </header>
            <div class="image-container">
                <LoadingMessage
                    class="main-image"
                    isLoading="true"
                    primaryColor="#ffffff"
                    secondaryColor="#00000099"
                />
                <img
                    src="/assets/erik.jpg"
                    alt="Erik Mattheis"
                    class="loading-image"
                    @loaded="isLoading = false"
                />"
            </div>
        </div>
        <div v-else>
          <header style="background-color: #00000099;
                    color: #ffffff;"
            >            
            <p><h2>About</h2> the Developer</p>
            </header>
            <div class="image-container">
                <img
                    src="/assets/Erik.jpg"
                    alt="Erik Mattheis"
                    class="main-image"
                    @loaded="isLoading = false"
                />
            </div>
        </div>
        <div class="content">
            

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
    </article>
</template>

<script>
import LoadingMessage from './LoadingMessage.vue'
import { contrastingColor } from '../services/colors.js'

export default {
    name: 'AboutErik',
    components: { LoadingMessage },
    data() {
        return {
            isLoading: false,
            darken: false,
        }
    },
    methods: {
    },
}
</script>

<style scoped>

h2 {
  font-size: 3rem;
}
h3 {
  font-size: 2.5rem;
}
p {
  font-size: 1.25rem;
  line-height: 1.8;
}

h2, h3 {
  display: inline;
  font-weight: 700;
  font-style: italic;
  line-height: 1;
  margin: 0 

}
</style>
