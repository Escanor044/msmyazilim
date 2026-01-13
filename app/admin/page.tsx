import { ShoppingBag, Users, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
    { label: "Toplam Ciro", value: "142.500 ₺", change: "+12%", trend: "up", icon: TrendingUp, color: "text-green-500" },
    { label: "Yeni Siparişler", value: "8", change: "+4", trend: "up", icon: ShoppingBag, color: "text-blue-500" },
    { label: "Bekleyen Destek", value: "12", change: "-2", trend: "down", icon: MessageSquare, color: "text-yellow-500" },
    { label: "Toplam Üye", value: "1,293", change: "+24", trend: "up", icon: Users, color: "text-purple-500" },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Yönetim Paneli</h1>
                <p className="text-zinc-400">Günlük istatistikler ve sistem durumu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <span className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 ml-1" /> : <ArrowDownRight className="h-3 w-3 ml-1" />}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-zinc-500">{stat.label}</span>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5">
                    <h2 className="text-lg font-semibold mb-6 flex items-center justify-between">
                        <span>Son Siparişler</span>
                        <button className="text-xs text-red-500 hover:text-red-400 font-medium">Tümünü Gör</button>
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs">SF</div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Premium Server Files</div>
                                        <div className="text-xs text-zinc-500">Ahmet Yılmaz • #SIP-928{i}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-white">12.500 ₺</div>
                                    <div className="text-[10px] text-yellow-500 font-medium">ONAY BEKLİYOR</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5">
                    <h2 className="text-lg font-semibold mb-6 flex items-center justify-between">
                        <span>Son Destek Talepleri</span>
                        <button className="text-xs text-red-500 hover:text-red-400 font-medium">Tümünü Gör</button>
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                    <div>
                                        <div className="text-sm font-medium text-white">Kurulum Hatası Alıyorum</div>
                                        <div className="text-xs text-zinc-500">Mehmet Demir • 12 dk önce</div>
                                    </div>
                                </div>
                                <button className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 transition-colors">
                                    Yanıtla
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
