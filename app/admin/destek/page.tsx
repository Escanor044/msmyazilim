import { Search, MessageSquare, AlertCircle, Clock, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"

const tickets = [
    { id: 1, user: "Ahmet Yılmaz", subject: "Kurulum Hatası Alıyorum", msg: "Files kurulumu sırasında lib hatası alıyorum...", time: "12 dk önce", status: "open", priority: "high" },
    { id: 2, user: "Selin Demir", subject: "Ödeme Onayı", msg: "Havale ile ödeme yaptım onaylanmadı.", time: "45 dk önce", status: "open", priority: "medium" },
    { id: 3, user: "Caner Erkin", subject: "Sistem Hakkında Soru", msg: "Gelişmiş arena sistemine şu özellik eklenebilir mi?", time: "2 saat önce", status: "replied", priority: "low" },
]

export default function AdminTicketsPage() {
    return (
        <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Destek Talepleri</h1>
                <p className="text-zinc-400">Müşterilerden gelen mesajları yanıtlayın.</p>
            </div>

            <div className="flex flex-1 gap-6 min-h-0">
                {/* List */}
                <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4 min-h-0 bg-zinc-900/40 border border-white/5 rounded-xl p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input placeholder="Talep ara..." className="pl-9 bg-black/20 border-white/10 text-zinc-300 placeholder:text-zinc-600" />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {tickets.map((t) => (
                            <div key={t.id} className={`p-4 rounded-lg border cursor-pointer transition-all ${t.id === 1 ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-transparent hover:bg-white/10'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-white text-sm">{t.user}</span>
                                    <span className="text-[10px] text-zinc-500">{t.time}</span>
                                </div>
                                <div className="text-xs font-medium text-zinc-300 mb-1">{t.subject}</div>
                                <div className="text-xs text-zinc-500 line-clamp-2">{t.msg}</div>
                                <div className="flex items-center gap-2 mt-3">
                                    {t.priority === 'high' && <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded">Yüksek</span>}
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.status === 'open' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {t.status === 'open' ? 'Açık' : 'Yanıtlandı'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat View */}
                <div className="hidden md:flex flex-1 flex-col bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/20">
                        <div>
                            <h2 className="font-bold text-white">Kurulum Hatası Alıyorum</h2>
                            <div className="text-xs text-zinc-400">Talep #59293 • Ahmet Yılmaz</div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
                                <CheckCircle2 className="h-3 w-3" /> Çözüldü Olarak İşaretle
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[url('/grid.svg')] bg-fixed bg-center [background-size:30px_30px]">
                        <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">AY</div>
                            <div className="space-y-1 max-w-[80%]">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-bold text-white">Ahmet Yılmaz</span>
                                    <span className="text-xs text-zinc-500">14:20</span>
                                </div>
                                <div className="bg-zinc-800 text-zinc-200 p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                                    Merhaba, Premium Server Files paketini satın aldım. Kurulum yaparken lib hatası alıyorum. `usr/lib/libmd.so.6` hatası veriyor. Yardımcı olur musunuz?
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-black/20 border-t border-white/5">
                        <div className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-red-500/50 transition-all">
                            <textarea
                                className="w-full bg-transparent p-3 text-sm text-zinc-200 placeholder:text-zinc-600 resize-none outline-none h-24"
                                placeholder="Yanıtınızı buraya yazın..."
                            />
                            <div className="px-3 py-2 bg-black/40 border-t border-white/5 flex justify-between items-center">
                                <div className="flex gap-2">
                                    <button className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white transition-colors">
                                        <AlertCircle className="h-4 w-4" />
                                    </button>
                                </div>
                                <button className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors">
                                    Yanıtı Gönder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
