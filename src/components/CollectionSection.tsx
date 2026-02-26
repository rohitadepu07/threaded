interface CollectionSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reversed?: boolean;
  features?: string[];
}

const CollectionSection = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  reversed = false,
  features = [],
}: CollectionSectionProps) => {
  return (
    <section className="py-20 px-6 bg-background fabric-texture">
      <div className="max-w-6xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${reversed ? "md:direction-rtl" : ""}`}>
          {/* Image side */}
          <div className={`${reversed ? "md:order-2" : ""}`}>
            <div className="ornate-border p-3 rounded-sm overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-[450px] object-cover rounded-sm hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Text side */}
          <div className={`space-y-5 ${reversed ? "md:order-1" : ""}`}>
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
              {subtitle}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
            <div className="gold-divider w-24" />
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
            {features.length > 0 && (
              <ul className="space-y-3 pt-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 font-body text-foreground">
                    <span className="text-accent text-lg">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
