
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Construction, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4 pt-32 pb-16">
                <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                        <Construction className="h-8 w-8" />
                    </div>

                    <h1 className="text-2xl font-bold">Geliştirme Aşamasında</h1>

                    <p className="text-muted-foreground leading-relaxed">
                        Kayıt olma sistemi şu anda geliştirilme aşamasındadır. Çok yakında hizmetinizde olacak.
                    </p>

                    <Button asChild variant="outline" className="mt-4">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Ana Sayfaya Dön
                        </Link>
                    </Button>
                </div>
            </div>

            <Footer />
        </main>
    )
}
