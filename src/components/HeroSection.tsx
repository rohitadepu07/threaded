import heroImage from "@/assets/hero-embroidery.jpg";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Memories", "Stories", "Traditions", "Crafts"];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Traditional Indian embroidery hoop with intricate paisley design"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Decorative corner borders */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-antique-gold opacity-60 pointer-events-none" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-antique-gold opacity-60 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-antique-gold opacity-60 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-antique-gold opacity-60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
        {/* Ornamental top */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-antique-gold opacity-60" />
          <span className="text-antique-gold text-sm tracking-[0.3em] uppercase font-body">
            Est. with Love
          </span>
          <div className="w-16 h-px bg-antique-gold opacity-60" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight flex flex-col items-center">
          <span className="w-full">Threaded Design</span>
          <span className="relative overflow-hidden h-[1.3em] w-full block mt-2">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="gold-shimmer absolute inset-0 flex items-start justify-center"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <div className="gold-divider w-48 mx-auto mb-6 mt-4" />

        <p className="font-body text-xl md:text-2xl text-primary-foreground/80 italic tracking-wide">
          "Celebrating Tradition Through Innovation"
        </p>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="text-antique-gold/60 text-xs tracking-[0.2em] uppercase">
            Explore Our Craft
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-antique-gold/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
