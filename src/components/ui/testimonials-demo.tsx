import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const threadedTestimonials = [
    {
        author: { name: "Priya Sharma", handle: "Mumbai", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
        text: "The wedding hoop Sana made for us was absolutely stunning! It's now the centrepiece of our living room.",
        rating: 5,
    },
    {
        author: { name: "Ananya Desai", handle: "Bangalore", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
        text: "I ordered a friendship hoop for my best friend — she cried happy tears! The attention to detail was beyond expectations.",
        rating: 5,
    },
    {
        author: { name: "Meera Kulkarni", handle: "Pune", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
        text: "The silk thread jewellery set I got for Navratri was gorgeous. So many compliments!",
        rating: 5,
    },
    {
        author: { name: "Ritu Agarwal", handle: "Delhi", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150" },
        text: "I gifted a floral mandala hoop to my mother-in-law and she absolutely loved it. Exceptional craftsmanship.",
        rating: 5,
    }
]

export default function TestimonialsDemo() {
    return (
        <TestimonialsSection
            title="What Our Customers Say"
            description="Every piece carries a story — here's what our customers have to say about their handcrafted treasures."
            testimonials={threadedTestimonials}
        />
    )
}