import LandPageHero from "@/components/land/LandPageHero";
import { getLovellCanyonPageHero } from "@/lib/lovell-canyon-media";
import { getLovellCanyonPageHeroImageSchema } from "@/lib/lovell-canyon-schema";

type LandPageHeroSectionProps = {
  pathname: string;
  badge?: string;
  title: string;
  subtitle: string;
};

export default async function LandPageHeroSection({
  pathname,
  badge,
  title,
  subtitle,
}: LandPageHeroSectionProps) {
  const hero = await getLovellCanyonPageHero(pathname);
  const heroSchema = hero ? getLovellCanyonPageHeroImageSchema(hero, pathname, title) : null;

  return (
    <>
      {heroSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(heroSchema) }}
        />
      )}
      <LandPageHero
        badge={badge}
        title={title}
        subtitle={subtitle}
        heroImageUrl={hero?.url}
        heroImageAlt={hero?.alt}
      />
    </>
  );
}
