import type { Metadata } from "next";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { getPosts, type PostListItem } from "@/sanity/data/posts";
import { imageUrl } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Blog | Star Grow Studio",
  description: "Noticias, ideas y actualizaciones de Star Grow Studio.",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  // Formato estable e independiente de la zona horaria del servidor.
  const [y, m, d] = iso.slice(0, 10).split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${d} ${meses[Number(m) - 1]} ${y}`;
}

export default async function BlogPage() {
  let posts: PostListItem[] = [];
  try {
    posts = await getPosts();
  } catch {
    posts = [];
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="mb-10 flex flex-col items-center text-center">
        <span className="text-lg font-medium text-[var(--color-primary)]">Blog</span>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold text-[var(--color-primary-to-white)] lg:text-4xl">
          Ideas, aprendizajes y novedades
        </h1>
      </header>

      {posts.length === 0 ? (
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-dashed border-[var(--color-gray)] p-12 text-center">
          <Pencil size={40} className="text-[var(--color-primary)]" />
          <h2 className="text-lg font-semibold text-[var(--color-primary-to-white)]">
            Aún no hay artículos publicados
          </h2>
          <p className="text-sm text-[var(--color-dark-gray)]">
            Escribe tu primer artículo desde el{" "}
            <Link href="/studio" className="font-medium text-[var(--color-primary)] hover:underline">
              panel de contenido
            </Link>{" "}
            y aparecerá aquí automáticamente.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-gray)] bg-[var(--color-white-to-primary)]"
              >
                <figure className="aspect-video overflow-hidden bg-[var(--color-gray)]">
                  {post.mainImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl(post.mainImage, 600)}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </figure>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  {post.publishedAt && (
                    <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-dark-gray)]">
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-[var(--color-primary-to-white)] group-hover:text-[var(--color-primary)]">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-[var(--color-dark-gray)]">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
