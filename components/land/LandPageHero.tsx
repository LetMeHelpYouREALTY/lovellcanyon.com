type LandPageHeroProps = {
  badge?: string;
  title: string;
  subtitle: string;
};

export default function LandPageHero({ badge, title, subtitle }: LandPageHeroProps) {
  return (
    <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/Image/hero_bg_1.jpg')" }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {badge && (
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
            {badge}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{title}</h1>
        <p className="text-lg md:text-xl text-white/80">{subtitle}</p>
      </div>
    </section>
  );
}
