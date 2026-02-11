import { sanityFetch } from "@/sanity/lib/sanity.fetch";
import { ArticlesType } from "../types/articles";
import { ALL_ARTICLES, LAST_ARTICLES } from "@/sanity/lib/queries/articles.queries";
import ContentCard from "../components/shared/ContentCard";
import { urlFor } from "@/sanity/lib/image";
import Breadcrumbs from "../components/shared/Breadcrumbs/Breadcrumbs";
import { ChevronRight, SearchIcon } from "lucide-react";
import Link from "next/link";
import Banner from "../components/shared/Banner";
import { formatDate } from "@/lib/formatDate";
import ArticlesSearch from "./ArticlesSearch";

export default async function Articles() {

  const articles = await sanityFetch<ArticlesType[]>({
    query: ALL_ARTICLES
  });

  const last_articles = await sanityFetch<ArticlesType[]>({
    query: LAST_ARTICLES
  })

  const featured = last_articles[0];
  const sideArticles = last_articles.slice(1, 5);



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
      <div className="articles px-3 lg:px-6 py-3 max-w-11/12 my-0 mx-auto flex flex-col gap-5 mt-5">
        <Breadcrumbs></Breadcrumbs>
        <section className="w-full flex flex-col lg:flex-row gap-10 items-stretch">

          {/* Articulo principal */}
          <div className="flex flex-col w-full lg:w-[60%] gap-6 h-full min-h-[560px]">

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl lg:text-xl font-bold leading-tight">
                {featured?.title}
              </h2>

              <p className="text-gray-600 text-xs lg:text-[14px]">
                {featured?.excerpt}
              </p>
            </div>

            <figure className="relative flex-1 rounded-xl overflow-hidden group">

              {featured?.coverImage && (
                <img
                  src={urlFor(featured.coverImage).url()}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <span className="absolute bottom-4 left-4 text-white text-sm">
                Publicado <br />
                {formatDate(featured?.publishedAt)}
              </span>

              <div className="absolute bottom-4 right-4 flex gap-2 flex-wrap">
                {featured?.topics?.map((topic: any) => (
                  <span
                    key={topic._id}
                    className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white"
                  >
                    {topic.title}
                  </span>
                ))}
              </div>

            </figure>
          </div>


          {/* Articulos secundarios */}
          <div className="flex flex-col w-full lg:w-[40%] h-full justify-between min-h-[560px]">

            {sideArticles?.map((article: any) => (
              <article
                key={article._id}
                className="flex gap-4 group cursor-pointer"
              >

                <div className="w-38 h-30 min-w-[180px] border rounded-lg overflow-hidden relative">
                  {article?.coverImage && (
                    <img
                      src={urlFor(article.coverImage).url()}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                    />
                  )}
                </div>


                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-xs text-gray-500">
                    {formatDate(article?.publishedAt, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>

                  <h3 className="font-semibold text-[14px] leading-snug group-hover:text-[#5656B5] transition-colors">
                    {article.title}
                  </h3>

                  <div className="flex gap-2 flex-wrap mt-1">
                    {article?.topics?.map((topic: any) => (
                      <span
                        key={topic._id}
                        className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600 border"
                      >
                        {topic.title}
                      </span>
                    ))}
                  </div>
                </div>

              </article>
            ))}

          </div>

        </section>

        <div className="flex align-center justify-between my-8 w-full">
          <h3 className="text-2xl font-semibold">
            Artículos que podrían interesarte
          </h3>

          <ArticlesSearch />
        </div>


        {Object.entries(articlesByTopic).map(([topic, topicArticles]) => (
          <section key={topic} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-[var(--color-primary)]">{topic}</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${NUMBERS_ARTICLES} gap-6`}>
              {topicArticles.map((article, idx) => (
                <div key={idx} className="cursor-pointer flex">
                  <Link href={`/articles/${article.slug}`} className="block flex-1">
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
