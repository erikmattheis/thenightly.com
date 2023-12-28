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
        <p>Erik Mattheis &copy; 2024</p>
    </footer>
</template>

<script>
export default {
    name: 'SiteFooter',
    props: {
        colors: {
            type: Object,
            default: () => ({
                bgColor: '#000000',
                color: '#FFFFFF',
            }),
        },
    },
}
</script>
