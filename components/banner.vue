<template>
    <section class="banner">
        <!-- <img :src="banners[currentIndex].image" :alt="banners[currentIndex].alt" class="banner-image" /> -->
        <!-- <div class="banner-caption">{{ banners[currentIndex].caption }}</div> -->
    </section>
</template>

<script>
export default {
    name: "DynamicBanner",
    data() {
        return {
            banners: [
                { image: "/images/banner1.jpg", alt: "Banner 1", caption: "Bienvenido a Stargrow" },
                { image: "/images/banner2.jpg", alt: "Banner 2", caption: "Descubre nuestros productos" },
                { image: "/images/banner3.jpg", alt: "Banner 3", caption: "Ofertas exclusivas" }
            ],
            currentIndex: 0,
            intervalId: null
        };
    },
    mounted() {
        this.startRotation();
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
    methods: {
        startRotation() {
            this.intervalId = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.banners.length;
            }, 10000); 
        }
    }
};
</script>

<style scoped>
.banner {
    width: 100%;
    min-height: calc(100vh - 8vh);
    position: relative;
}

.banner::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(135deg, var(--color-primary) 0%, #a3a3e689 20%);
    opacity: 0.7;
    filter: blur(800px);
}
.banner {
    position: relative;
    overflow: hidden;
}

</style>