import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { cn } from "@/lib/utils"

interface LegalLayoutProps {
    children: React.ReactNode
    title: string
    description?: string
    lastUpdated?: string
}

export function LegalLayout({ children, title, description, lastUpdated }: LegalLayoutProps) {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <div className="flex-1 w-full pt-32 pb-20">
                <div className="container-width max-w-4xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="space-y-4 text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                {description}
                            </p>
                        )}
                        {lastUpdated && (
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                                Son Güncelleme: {lastUpdated}
                            </div>
                        )}
                    </div>

                    {/* Content Card */}
                    <article className="glass-card p-6 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

                        <div className="prose prose-invert prose-lg max-w-none text-zinc-300
              prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
              prose-h3:text-xl prose-h3:text-primary prose-h3:mt-8
              prose-p:leading-relaxed prose-p:text-zinc-400
              prose-li:text-zinc-400
              prose-strong:text-white
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              marker:text-primary/50">
                            {children}
                        </div>
                    </article>
                </div>
            </div>
            <Footer />
        </main>
    )
}
