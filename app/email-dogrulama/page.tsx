import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Mail } from "lucide-react"

export default function EmailVerificationPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="w-full max-w-sm space-y-8 relative z-10 text-center">
                <div className="space-y-4">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4 animate-pulse">
                        <Mail className="h-10 w-10" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">E-Posta Doğrulama</h1>
                    <p className="text-muted-foreground">
                        Lütfen <span className="text-foreground font-medium">ornek@mail.com</span> adresine gönderdiğimiz 6 haneli kodu girin.
                    </p>
                </div>

                <div className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, i) => (
                        <Input
                            key={i}
                            className="w-12 h-12 text-center text-lg font-bold bg-background/50"
                            maxLength={1}
                        />
                    ))}
                </div>

                <Button className="w-full" size="lg">Doğrula ve Devam Et</Button>

                <p className="text-sm text-muted-foreground">
                    Kod gelmedi mi?{" "}
                    <button className="text-primary hover:underline font-medium">Tekrar Gönder</button>
                </p>
            </div>
        </main>
    )
}
