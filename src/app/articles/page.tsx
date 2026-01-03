import { sanityFetch } from "@/sanity/lib/sanity.fetch";
import { ArticlesType } from "../types/articles";
import { ALL_ARTICLES } from "@/sanity/lib/queries/articles.queries";
import ContentCard from "../components/shared/ContentCard";
import { urlFor } from "@/sanity/lib/image";
import Breadcrumbs from "../components/shared/Breadcrumbs/Breadcrumbs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Banner from "../components/shared/Banner";

export default async function Articles() {

  const articles = await sanityFetch<ArticlesType[]>({
    query: ALL_ARTICLES
  });

  const NUMBERS_ARTICLES = 4;

  const articlesByTopic: Record<string, ArticlesType[]> = {};

  articles.forEach((article) => {
    const topics = article.topics || [];
    topics.forEach((topic) => {
      const topicTitle = topic.title;
      if (!articlesByTopic[topicTitle]) {
        articlesByTopic[topicTitle] = [];
      }
      articlesByTopic[topicTitle].push(article);
    });
  });


  return (
    <main className="w-full min-h-screen flex flex-col justify-center gap-5">
      <h1 className="sr-only">Artículos y publicaciones</h1>
      <header className="banner h-[50vh] grid-bg-diagonal w-full flex flex-col gap-3">
        <Banner banners={{ title: { main: 'Insights' , second: 'estratégicos para decisiones de negocio' },  }}></Banner>
      </header>
      <div className="articles max-w-11/12 my-0 mx-auto space-y-8 border-red-500">
        <Breadcrumbs></Breadcrumbs>
        {Object.entries(articlesByTopic).map(([topic, topicArticles]) => (
          <section key={topic} className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold mb-4">{topic}</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${NUMBERS_ARTICLES} gap-6`}>
              {topicArticles.map((article, idx) => (
                <div key={idx} className="cursor-pointer">
                  <Link href={`/articles/${article.slug}`} className="block">
                    <ContentCard
                      content={{
                        name: article.title,
                        description: article.excerpt || "",
                        image: article.coverImage ? urlFor(article.coverImage).url() : ""
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
            {topicArticles && topicArticles.length > NUMBERS_ARTICLES && (
              <button className="flex items-center gap-2 p-2 border border-[var(--color-primary)] w-fit rounded-[10px] cursor-pointer text-[var(--color-primary)]">
                Ver todo
                <ChevronRight size={16} />
              </button>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
