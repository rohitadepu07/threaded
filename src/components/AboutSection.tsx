import artistImage from "@/assets/artist-portrait.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-background fabric-texture">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
            The Artist
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            About the Creator
          </h2>
          <div className="gold-divider w-32 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="ornate-border p-3 rounded-sm">
              <img
                src={artistImage}
                alt="Hand embroidery artist at work"
                className="w-full h-[500px] object-cover rounded-sm"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-antique-gold/20 rounded-sm -z-10" />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="font-body text-xl leading-relaxed text-foreground">
              Behind every stitch lies a story — a memory woven with love, patience,
              and the rich heritage of Indian craftsmanship. As a hand embroidery artist,
              I draw inspiration from centuries of tradition, transforming threads into
              timeless treasures.
            </p>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              Each piece is a labour of devotion — fine needlework that captures the
              essence of emotions, celebrations, and the beauty of our cultural roots.
              From delicate florals inspired by Mughal gardens to contemporary designs
              that honour our heritage, every creation is uniquely handcrafted.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <span className="font-display text-3xl font-bold text-accent">500+</span>
                <p className="font-body text-sm text-muted-foreground mt-1">Hoops Created</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="font-display text-3xl font-bold text-accent">100%</span>
                <p className="font-body text-sm text-muted-foreground mt-1">Handcrafted</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <span className="font-display text-3xl font-bold text-accent">❤️</span>
                <p className="font-body text-sm text-muted-foreground mt-1">Made with Love</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
