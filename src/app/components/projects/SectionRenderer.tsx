import type { ProjectSection } from "@/sanity/types/sections";
import type React from "react";
import { HeroSection } from "./sections/HeroSection";
import { ExecutiveSummarySection } from "./sections/ExecutiveSummarySection";
import { ChallengeSection } from "./sections/ChallengeSection";
import { RichTextSection } from "./sections/RichTextSection";
import { StatisticsSection } from "./sections/StatisticsSection";

/** Props that every section component receives. */
export type SectionProps = {
  data: Record<string, unknown>;
  project?: {
    name: string;
    slug: string;
    accent?: string;
    cover?: string | null;
    gallery?: { image?: string; alt?: string; title?: string; description?: string; category?: string }[];
  };
};

const sectionRegistry: Record<string, React.ComponentType<SectionProps>> = {
  "section.hero": HeroSection,
  "section.executiveSummary": ExecutiveSummarySection,
  "section.challenge": ChallengeSection,
  "section.richText": RichTextSection,
  "section.statistics": StatisticsSection,
};

export default function SectionRenderer({
  sections,
  project,
}: {
  sections: ProjectSection[];
  project?: SectionProps["project"];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        const Component = sectionRegistry[section._type];
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`[SectionRenderer] Unknown section type: ${section._type}`);
          }
          return null;
        }
        return (
          <Component
            key={section._key}
            data={section as unknown as Record<string, unknown>}
            project={project}
          />
        );
      })}
    </>
  );
}