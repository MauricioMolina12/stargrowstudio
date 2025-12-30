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
        <img
          src={typeof content?.image === 'string'
            ? content?.image
            : urlFor(content?.image).width(1200).url()
          }
          alt={content?.name}
          className="w-full h-full object-cover object-center"
        />
      </figure>
      <div className="p-4 flex flex-col gap-3">
        <h2 className="font-semibold text-[16px] text-[var(--color-primary)]">
          {content?.name}
        </h2>
        <p className="text-[13px] text-[var(--color-dark-gray)] leading-relaxed">
          {content?.description}
        </p>
      </div>
    </div>
  );
}
