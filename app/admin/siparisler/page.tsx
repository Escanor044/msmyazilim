import { Search, Filter, CheckCircle, XCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
    { id: "#SIP-9283", user: "Ahmet Yılmaz", product: "Premium Server Files", date: "12.01.2024", amount: "12.500 ₺", status: "Bekliyor", type: "warning" },
    { id: "#SIP-9282", user: "Mehmet Demir", product: "Gelişmiş Arena Sistemi", date: "12.01.2024", amount: "1.500 ₺", status: "Bekliyor", type: "warning" },
    { id: "#SIP-9281", user: "Ayşe Kaya", product: "Pro Server Files", date: "11.01.2024", amount: "25.000 ₺", status: "Onaylandı", type: "success" },
    { id: "#SIP-9280", user: "Ali Yıldız", product: "Otomatik Av Sistemi", date: "11.01.2024", amount: "750 ₺", status: "İptal", type: "danger" },
]

export default function AdminOrdersPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Sipariş Yönetimi</h1>
                    <p className="text-zinc-400">Gelen siparişleri görüntüleyin ve yönetin.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-zinc-400 border-zinc-700 hover:text-white hover:bg-white/5">
                        <Filter className="mr-2 h-4 w-4" /> Filtrele
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Dışa Aktar
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input placeholder="Sipariş No, Müşteri veya Ürün ara..." className="pl-9 bg-black/20 border-white/10 text-zinc-300 placeholder:text-zinc-600" />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-white/5 bg-zinc-900/20 overflow-hidden overflow-x-auto">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-zinc-400">Sipariş No</TableHead>
                            <TableHead className="text-zinc-400">Müşteri</TableHead>
                            <TableHead className="text-zinc-400">Ürün</TableHead>
                            <TableHead className="text-zinc-400">Tarih</TableHead>
                            <TableHead className="text-zinc-400">Tutar</TableHead>
                            <TableHead className="text-zinc-400">Durum</TableHead>
                            <TableHead className="text-right text-zinc-400">İşlem</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="border-white/5 hover:bg-white/5 group">
                                <TableCell className="font-mono text-zinc-300">{order.id}</TableCell>
                                <TableCell className="font-medium text-white">{order.user}</TableCell>
                                <TableCell className="text-zinc-400">{order.product}</TableCell>
                                <TableCell className="text-zinc-400">{order.date}</TableCell>
                                <TableCell className="font-bold text-white">{order.amount}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${order.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            order.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                        }`}>
                                        {order.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-500/10">
                                            <CheckCircle className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                            <XCircle className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
