
import { Hero } from '@/components/sections/hero'
import { Stats } from '@/components/sections/stats'
import { Services } from '@/components/sections/services'
import { Packages } from '@/components/sections/packages'
import { Timeline } from '@/components/sections/timeline'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQPreview } from '@/components/sections/faq-preview'
import { FinalCTA } from '@/components/sections/final-cta'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Stats />
      <Services />
      <Packages />
      <Timeline />
      <Testimonials />
      <FAQPreview />
      <FinalCTA />
    </main>
  )
}
