import { services } from "@/app/data/services";
import Banner from "@/app/components/shared/Banner";


export default function ServiceSlugPage({ params }: { params: { slug: string } }) {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
        return <h1>Servicio no encontrado</h1>;
    }
    return (
        <>
            <Banner banners={[service]} />;
        </>
    )
}
