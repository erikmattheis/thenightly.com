<template>
    <article class="wrapper">
        <div>
            <header
                style="
                    background-color: rgb(227, 0, 34);
                    color: rgb(255, 255, 255);
                "
            >
                <div
                    class="title-background"
                    style="
                        background-image: url('https://storage.googleapis.com/nightly-images/article-images/23.12.26-madder-2023-11-2-5-23-29-q80.jpg');
                    "
                >
                    <h2><span>Naturally Hued</span></h2>
                    <p><span>Journey into Tradition</span></p>
                </div>
            </header>
        </div>

        <section class="content">
            <div class="wrapper">
                <div class="text">
                    <p>
                        Step into the enchanting world of natural dyes, a
                        heritage passed down through generations. From the
                        ancient Indus Valley civilization to the modern-day
                        fashion runways, natural dyes have been a part of our
                        lives for centuries. Explore the cultural significance
                        and historical roots of traditional colorants sourced
                        from plants, minerals, and time-honored techniques.
                        Uncover the secrets of craftsmanship that have stood the
                        test of time, creating fabrics that resonate with
                        cultural stories.
                    </p>

                    <h3>Cultural Diversity in Hues</h3>
                    <p>
                        Discover the kaleidoscope of colors that different
                        cultures have embraced throughout history. From the
                        indigos of Asia to the vibrant cochineals of South
                        America, delve into the unique palettes that reflect the
                        diverse traditions and practices of societies across the
                        globe.
                    </p>

                    <h3>Craftsmanship Unveiled</h3>
                    <p>
                        Unearth the secrets behind traditional craftsmanship,
                        where skilled artisans transform raw materials into
                        works of art. Our in-depth articles and features explore
                        the nuances of dyeing and weaving traditions, offering a
                        glimpse into the meticulous processes that elevate
                        textiles to cultural treasures.
                    </p>

                    <h3>Preserving Heritage through Fabric</h3>
                    <p>
                        At Naturally Hued, we cherish the role of natural dyes
                        and fabrics in preserving cultural heritage. Learn how
                        these traditional elements continue to play a vital role
                        in connecting the past with the present, fostering a
                        sense of identity and pride.
                    </p>

                    <h3>Join the Cultural Odyssey</h3>
                    <p>
                        Immerse yourself in the cultural odyssey of natural dyes
                        and fabrics. Whether you're a history enthusiast, a
                        textile lover, or a cultural explorer, our platform
                        invites you to embark on a journey where tradition and
                        creativity converge.
                    </p>

                    <h3>Start Your Exploration</h3>
                    <p>
                        Begin your exploration into the traditions and cultures
                        woven into natural dyes and fabrics.
                    </p>

                    <p>
                        Experience the fusion of human and artificial
                        intelligence as we bring you cutting-edge insights,
                        trends, and narratives in the realm of sustainable
                        fabrics, dyes and clothing. Our project isn't just about
                        colors and fabrics; it's a testament to the limitless
                        possibilities when creativity collaborates with
                        technology.
                    </p>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            isLoading: true,
        }
    },
    mounted() {
        this.isLoading = false
    },
}
</script>
