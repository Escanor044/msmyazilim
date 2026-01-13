import { Server, LifeBuoy, CreditCard, Activity } from "lucide-react"

const stats = [
    { label: "Aktif Hizmetler", value: "2", icon: Server, color: "text-blue-500" },
    { label: "Destek Talepleri", value: "1", icon: LifeBuoy, color: "text-yellow-500" },
    { label: "Toplam Bakiye", value: "0.00 TL", icon: CreditCard, color: "text-green-500" },
    { label: "Son Aktivite", value: "2s önce", icon: Activity, color: "text-purple-500" },
]

export default function PanelPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Genel Bakış</h1>
                <p className="text-muted-foreground">Hesap durumunuz ve hizmetleriniz.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl bg-card border border-white/5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </div>
                        <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-card border border-white/5">
                    <h2 className="text-lg font-semibold mb-4">Son İşlemler</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <div className="text-sm">
                                    <div className="font-medium">Oyun Sunucusu Yenilendi</div>
                                    <div className="text-xs text-muted-foreground">M-1293 Nolu Hizmet</div>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground">Bugün, 14:20</div>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                <div className="text-sm">
                                    <div className="font-medium">Destek Talebi Yanıtlandı</div>
                                    <div className="text-xs text-muted-foreground">#5921 - Kurulum Hatası</div>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground">Dün, 09:15</div>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-900/20 to-primary/10 border border-primary/20 flex flex-col justify-center text-center">
                    <div className="bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary">
                        <Server className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Yeni Bir Macera mı?</h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                        Projenizi büyütmek için yeni sistemlerimizi inceleyin veya sunucu kapasitenizi artırın.
                    </p>
                    <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full max-w-xs mx-auto">
                        Paketleri İncele
                    </button>
                </div>
            </div>
        </div>
    )
}
