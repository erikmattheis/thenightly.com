<template>
    <footer
        :style="{ 'background-color': colors.bgColor, color: colors.color }"
    >
        <p>
            <em
                >This site demonstrates human-enhanced machine creativity and
                contains generated content.</em
            >
        </p>
        <p>
            <a class="special-link" href="mailto:erik@mattheis.org?subject=OMG"
                >erik@mattheis.org</a
            >
        </p>
    </footer>
</template>

<script>
export default {
    name: 'SiteFooter',
    props: {
        colors: {
            type: Object,
            required: true,
            default: () => ({
                color: '#FFFFFF',
                bgColor: '#000000',
            }),
        },
    },
}
</script>
