import { sanityFetch } from '@/sanity/lib/sanity.fetch';
import { ArticlesType } from "../../types/articles";
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/components/shared/Breadcrumbs/Breadcrumbs';
import { ARTICLE_BY_SLUG, RELATED_ARTICLES_QUERY } from '@/sanity/lib/queries/articles.queries';
import Markdown from '@/app/components/shared/Markdown/Markdown';
import SummarizeWithAI from '@/app/components/shared/SummarizeWithAI/SummarizeWithAI';
import ShareWith from '@/app/components/shared/ShareWith/ShareWith';
import ContentCard from '@/app/components/shared/ContentCard';


export async function generateMetadata({
    params
}: { params: Promise<Record<string, string | string[]>> }): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug;

    const article = await sanityFetch<ArticlesType>({
        query: ARTICLE_BY_SLUG,
        params: { slug }
    });

    if (!article) return { title: 'Artículo no encontrado' };

    return {
        title: article.title,
        description: article.excerpt,
        keywords: article.topics.map(t => t.title),
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            images: article.coverImage
                ? [{ url: urlFor(article.coverImage).width(1200).url() }]
                : []
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt
        }
    };
}

export default async function ArticleDetails({
    params
}: { params: Promise<Record<string, string | string[]>> }) {
    const resolvedParams = await params;
    const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug;

    const article = await sanityFetch<ArticlesType>({
        query: ARTICLE_BY_SLUG,
        params: { slug }
    });

    const relatedArticles = await sanityFetch<ArticlesType[]>({
        query: RELATED_ARTICLES_QUERY,
        params: {
            id: article._id,
            topics: article.topics.map(t => t.title)
        }
    });

    console.log(relatedArticles);


    if (!article) {
        return <p>Artículo no encontrado.</p>;
    }

    return (
        <main className="w-full min-h-screen flex flex-col justify-start gap-6 p-6 max-w-4xl mx-auto">

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                {article.topics.map((topic, idx) => (
                    <span key={`Topic-${idx}`} className="px-2 py-1 bg-[var(--meteorite--400)] text-white rounded-[20px]">
                        {topic.title || 'Tema'}
                    </span>
                ))}

                <span className="font-semibold text-[var(--primary--800)]">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>


            <Breadcrumbs />

            <article className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold">{article.title}</h1>

                <div className="tools flex items-center justify-between w-full">
                    <SummarizeWithAI></SummarizeWithAI>
                    <ShareWith></ShareWith>
                </div>

                {article.coverImage && (
                    <Image
                        src={urlFor(article.coverImage).width(1200).url()}
                        alt={article.title}
                        width={1200}
                        height={600}
                        className="rounded-lg object-cover"
                        priority
                    />
                )}

                <Markdown content={article.content} />
            </article>



            {relatedArticles && relatedArticles.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Artículos relacionados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedArticles.map((rel) => (
                            <ContentCard
                                key={rel._id}
                                content={{
                                    name: rel.title,
                                    description: rel.excerpt || '',
                                    image: rel.coverImage ? urlFor(rel.coverImage).width(600).url() : ''
                                }}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

