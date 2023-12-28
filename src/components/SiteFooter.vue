<template>
    <footer>
        <EndMark :color="color" />{{ color }}
        <p>
            <em
                >This site demonstrates human-enhanced machine creativity and
                contains generated content.</em
            >
        </p>
        <p>
            Erik Mattheis 2024<br />
            <a class="special-link" href="mailto:erik@mattheis.org?subject=OMG"
                >erik@mattheis.org</a
            >
        </p>
    </footer>
</template>

<script>
import EndMark from './EndMark.vue'
export default {
    name: 'SiteFooter',
    props: {
        color: {
            type: String,
            default: () => '#FFFFFF',
        },
    },
    components: { EndMark },
}
</script>
