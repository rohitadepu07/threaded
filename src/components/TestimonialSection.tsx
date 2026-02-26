import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import TestimonialsSectionDemo from "@/components/ui/testimonials-demo"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  rating?: number
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, rating = 5, href, className }: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border border-gold/20",
        "bg-white p-4 text-start sm:p-6",
        "shadow-sm hover:shadow-md transition-all duration-300",
        "max-w-[320px] min-w-[320px]",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-12 w-12 border-2 border-[#C5A059]">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold text-[#5D0E11] leading-none">{author.name}</h3>
          <p className="text-sm text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-[#E3B448] text-[#E3B448]" />
        ))}
      </div>
      <p className="text-sm italic text-[#444] leading-relaxed">"{text}"</p>
    </Card>
  )
}

export default TestimonialsSectionDemo;