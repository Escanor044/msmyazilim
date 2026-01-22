import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="text-center space-y-8 relative z-10">
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-red-500/10 flex items-center justify-center">
                        <ShieldAlert className="h-12 w-12 text-red-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Sayfa Bulunamadı</h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Aradığınız sayfa silinmiş veya taşınmış olabilir. Lütfen URL&apos;i kontrol edin.
                    </p>
                </div>

                <div className="flex justify-center gap-4">
                    <Button variant="default" size="lg" asChild>
                        <Link href="/">Ana Sayfa</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/iletisim">Bize Yazın</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
