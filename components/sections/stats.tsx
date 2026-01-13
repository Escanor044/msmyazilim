import { Truck, MessagesSquare, RefreshCcw, Key } from "lucide-react"

const stats = [
    {
        icon: Truck,
        label: "Teslimat Süreci",
        value: "Şeffaf & Hızlı"
    },
    {
        icon: MessagesSquare,
        label: "Destek Kanalı",
        value: "WhatsApp / Discord"
    },
    {
        icon: RefreshCcw,
        label: "Güncelleme & Bakım",
        value: "Opsiyonel"
    },
    {
        icon: Key,
        label: "Lisans / Kiralama",
        value: "Mevcut"
    },
]

export function Stats() {
    return (
        <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="container-width">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-4 p-6 justify-center md:justify-start">
                            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                                <div className="font-semibold text-foreground">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
