import Banner from "./Banner";

export default function OurHistory() {

    const historyBanner = [
        {
            image: "img/hero-banner/desarrollo/watch.png",
            title: {
                main: "¿Preparados?",
                optional: "¿Listos?",
                second: "Star Grow Studio",
            },
            animationTitle: true,
        },]

    return (
        <>
            <Banner banners={historyBanner}></Banner>
        </>
    )
}