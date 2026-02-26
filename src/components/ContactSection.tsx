import { Instagram, MapPin, Clock, Truck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {

  return (
    <section id="contact" className="py-24 px-6 bg-primary relative overflow-hidden">
      {/* Decorative corner borders */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-antique-gold/40 pointer-events-none" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-antique-gold/40 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-antique-gold/40 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-antique-gold/40 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-antique-gold text-sm tracking-[0.3em] uppercase font-body">
          Get In Touch
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-3 mb-4">
          Let's Create Together
        </h2>
        <div className="gold-divider w-32 mx-auto mb-8" />
        <p className="font-body text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Every piece is made to order with love and care. Share your vision,
          and let us weave your memories into thread.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative z-0">
          <a
            href={`https://wa.me/+918779404726?text=${encodeURIComponent("Hi! I'm interested in your handmade creations. 🌺")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-[hsl(142,70%,35%)] hover:bg-[hsl(142,70%,30%)] text-white font-display text-lg py-6 px-8 cursor-pointer relative z-50 pointer-events-auto"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Order on WhatsApp
          </a>

          <a
            href="https://www.instagram.com/threaded_design_memories/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-antique-gold/60 text-antique-gold hover:bg-antique-gold/10 font-display text-lg py-6 px-8 cursor-pointer relative z-50 pointer-events-auto"
          >
            <Instagram className="w-5 h-5 mr-2" />
            DM on Instagram
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative z-0">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border border-antique-gold/40 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-antique-gold" />
            </div>
            <span className="font-body text-primary-foreground/90 text-sm">
              @threaded_design_memories
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border border-antique-gold/40 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-antique-gold" />
            </div>
            <span className="font-body text-primary-foreground/90 text-sm">
              Mumbai, Maharashtra
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border border-antique-gold/40 flex items-center justify-center">
              <Clock className="w-6 h-6 text-antique-gold" />
            </div>
            <span className="font-body text-primary-foreground/90 text-sm">
              5–10 Working Days
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border border-antique-gold/40 flex items-center justify-center">
              <Truck className="w-6 h-6 text-antique-gold" />
            </div>
            <span className="font-body text-primary-foreground/90 text-sm">
              Shipping Across India
            </span>
          </div>
        </div>

        <div className="gold-divider w-48 mx-auto mb-8" />

        <p className="font-display text-lg text-antique-gold italic">
          "Every thread tells a story, every stitch holds a memory."
        </p>
      </div>
    </section>
  );
};

export default ContactSection;