import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CollectionItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
}

interface CollectionGridProps {
  items: CollectionItem[];
}

const CollectionGrid = ({ items }: CollectionGridProps) => {
  const [selected, setSelected] = useState<CollectionItem | null>(null);

  return (
    <section id="collections" className="py-20 px-6 bg-background fabric-texture">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
            Our Creations
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Explore Collections
          </h2>
          <div className="gold-divider w-48 mx-auto" />
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelected(item)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden ornate-border bg-card aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Bottom overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent p-4 pt-12">
                  <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-xs md:text-sm font-body mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
                  {selected.subtitle}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {selected.title}
                </h2>
                <div className="gold-divider w-24" />
                <p className="font-body text-lg leading-relaxed text-muted-foreground">
                  {selected.description}
                </p>
                {selected.features.length > 0 && (
                  <ul className="space-y-3 pt-2">
                    {selected.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 font-body text-foreground">
                        <span className="text-accent text-lg">✦</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CollectionGrid;
