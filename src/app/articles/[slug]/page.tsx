import { sanityFetch } from '@/sanity/lib/sanity.fetch';
import { ArticlesType } from "../../types/articles";
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/components/shared/Breadcrumbs/Breadcrumbs';
import { ARTICLE_BY_SLUG } from '@/sanity/lib/queries/articles.queries';
import Markdown from '@/app/components/shared/Markdown/Markdown';

type Props = {
    params: { slug: string | string[] }; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

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

export default async function ArticleDetails({ params }: Props) {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const article = await sanityFetch<ArticlesType>({
        query: ARTICLE_BY_SLUG,
        params: { slug }
    });

    if (!article) {
        return <p>Artículo no encontrado.</p>;
    }

    return (
        <main className="w-full min-h-screen flex flex-col justify-start gap-6 p-6 max-w-4xl mx-auto">
            <Breadcrumbs />

            <article className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    {article.topics.map((topic, idx) => (
                        <span key={`Topic-${idx}`} className="px-2 py-1 bg-gray-100 rounded">
                            {topic.title || 'Tema'}
                        </span>
                    ))}
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
        </main>
    );
}
