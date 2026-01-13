import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MessageSquare } from "lucide-react"

const tickets = [
    { id: "#5921", subject: "Kurulum Hatası", status: "Yanıtlandı", lastUpdate: "Dün, 09:15", type: "blue" },
    { id: "#5892", subject: "Files Satın Alım Hakkında", status: "Kapalı", lastUpdate: "3 gün önce", type: "gray" },
]

export default function SupportPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Destek Talepleri</h1>
                    <p className="text-muted-foreground">Teknik sorunlar ve sorularınız için talep oluşturun.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Yeni Talep
                </Button>
            </div>

            <div className="grid gap-4">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 rounded-xl bg-card border border-white/5 hover:border-primary/20 transition-colors flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${ticket.type === 'blue' ? 'bg-blue-500/10 text-blue-500' : 'bg-white/5 text-muted-foreground'}`}>
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-bold">{ticket.subject} <span className="text-xs font-normal text-muted-foreground ml-2">{ticket.id}</span></div>
                                <div className="text-xs text-muted-foreground">Son güncelleme: {ticket.lastUpdate}</div>
                            </div>
                        </div>
                        <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.status === 'Yanıtlandı' ? 'bg-green-500/10 text-green-500' :
                                    ticket.status === 'Bekliyor' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-white/10 text-muted-foreground'
                                }`}>
                                {ticket.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
