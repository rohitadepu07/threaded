import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "./testimonial-card"

interface TestimonialsSectionProps {
    title: string
    description: string
    testimonials: Array<{
        author: TestimonialAuthor
        text: string
        rating?: number
    }>
    className?: string
}

export function TestimonialsSection({ title, description, testimonials, className }: TestimonialsSectionProps) {
    return (
        <section className={cn("py-12 sm:py-24 bg-[#FFFBF2] overflow-hidden", className)}>
            <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 text-center sm:gap-16">
                <div className="flex flex-col items-center gap-4 px-4">
                    <span className="text-[#C5A059] text-sm tracking-[0.3em] uppercase">Kind Words</span>
                    <h2 className="text-3xl font-bold text-[#5D0E11] sm:text-5xl">{title}</h2>
                    <p className="text-md max-w-[600px] text-muted-foreground sm:text-lg">{description}</p>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:40s]">
                        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                            {[...Array(4)].map((_, setIndex) => (
                                testimonials.map((t, i) => (
                                    <TestimonialCard key={`${setIndex}-${i}`} {...t} />
                                ))
                            ))}
                        </div>
                    </div>
                    {/* Gradients for smooth fade-in/out */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FFFBF2] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#FFFBF2] to-transparent" />
                </div>
            </div>
        </section>
    )
}