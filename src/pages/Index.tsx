import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, User, Layers, Star, Mail } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CollectionGrid from "@/components/CollectionGrid";
import TestimonialSection from "@/components/TestimonialSection";
import SectionDivider from "@/components/SectionDivider";
import ContactSection from "@/components/ContactSection";

import weddingImage from "@/assets/wedding-hoop.jpg";
import friendshipImage from "@/assets/friendship-hoop.jpg";
import floralImage from "@/assets/floral-art.jpg";
import jewelleryImage from "@/assets/jewellery.jpg";

const navItems = [
  { name: "Home", url: "#", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Collections", url: "#collections", icon: Layers },
  { name: "Testimonials", url: "#testimonials", icon: Star },
  { name: "Contact", url: "#contact", icon: Mail },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar items={navItems} />

      <HeroSection />

      <SectionDivider />
      <AboutSection />

      <SectionDivider />
      <CollectionGrid
        items={[
          {
            title: "Wedding & Couple Hoops",
            subtitle: "Bridal Collection",
            description: "Celebrate the most sacred bond with a handcrafted embroidery hoop — a timeless keepsake that captures the essence of your love story, adorned with traditional Indian motifs.",
            image: weddingImage,
            imageAlt: "Bridal embroidery hoop with couple names and wedding motifs",
            features: [
              "Personalized names & wedding dates",
              "Traditional motifs — lotus, peacock, kalash",
              "Romantic bridal colour palettes",
              "Perfect wedding keepsake gift",
            ],
          },
          {
            title: "Friendship & Memory Hoops",
            subtitle: "Bonds Collection",
            description: "Gift a piece of your heart — personalized embroidery hoops that tell the story of friendship, laughter, and unforgettable memories woven in thread.",
            image: friendshipImage,
            imageAlt: "Friendship embroidery hoop with personalized design",
            features: [
              "Personalized friendship gifts",
              "Storytelling through thread",
              "Custom colour combinations",
              "Celebrating bonds & memories",
            ],
          },
          {
            title: "Floral & Traditional Art",
            subtitle: "Heritage Collection",
            description: "Inspired by the timeless beauty of Indian floral patterns, paisley motifs, and mandala art — each piece is a tribute to our rich cultural heritage and centuries of craftsmanship.",
            image: floralImage,
            imageAlt: "Traditional Indian floral embroidery with paisley and mandala motifs",
            features: [
              "Indian floral patterns & paisley",
              "Mandala-inspired designs",
              "Heritage craftsmanship",
              "Vibrant traditional colour palettes",
            ],
          },
          {
            title: "Handmade Jewellery",
            subtitle: "Festive Collection",
            description: "Adorned with silk threads and traditional artistry, our handmade jewellery collection brings festive elegance to every celebration. Custom colours available for every occasion.",
            image: jewelleryImage,
            imageAlt: "Handmade silk thread jewellery collection",
            features: [
              "Silk thread jewellery",
              "Festive & traditional designs",
              "Custom colours available",
              "Perfect for celebrations",
            ],
          },
        ]}
      />

      <SectionDivider />
      <TestimonialSection />

      <SectionDivider />
      <ContactSection />

      <footer className="py-6 bg-primary text-center border-t border-border">
        <p className="font-body text-sm text-primary-foreground/60">
          © 2025 Threaded Design Memories. All rights reserved. Handcrafted with ❤️ in Mumbai.
        </p>
      </footer>
    </div>
  );
};

export default Index;
