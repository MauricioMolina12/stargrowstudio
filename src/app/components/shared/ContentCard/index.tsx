import { urlFor } from "@/sanity/lib/image";

type Content = {
  name: string;
  image: string;
  description: string;
};

type ContentCardProps = {
  content: Content;
};

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <div className="parallax w-full h-full flex-shrink-0 rounded-xl overflow-hidden bg-white border border-[var(--color-gray)]">
      <figure className="aspect-square w-full overflow-hidden">
        {content?.image ? (
          <img
            src={typeof content.image === 'string'
              ? content.image
              : urlFor(content.image).width(1200).url()}
            alt={content.name || "Cover Image"}
            className="w-full h-full object-cover"
          />
        ) : null}
      </figure>
      <div className="p-4 flex flex-col gap-3">
        <h2 className="font-semibold text-[16px] text-[var(--neutral--400)]">
          {content?.name}
        </h2>
        <p className="max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[var(--color-dark-gray)] leading-relaxed">
          {content?.description}
        </p>

      </div>
    </div>
  );
}
