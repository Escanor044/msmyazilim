import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
    { id: "#SIP-9283", product: "Premium Server Files", date: "12.01.2024", amount: "12.500 ₺", status: "Tamamlandı" },
    { id: "#SIP-8472", product: "Ekstra Koruma Paketi", date: "05.12.2023", amount: "1.200 ₺", status: "Tamamlandı" },
]

export default function OrdersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Siparişlerim</h1>
                <p className="text-muted-foreground">Geçmiş siparişlerinizin dökümü.</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 overflow-hidden overflow-x-auto">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="w-[120px]">Sipariş No</TableHead>
                            <TableHead>Hizmet</TableHead>
                            <TableHead>Tarih</TableHead>
                            <TableHead>Tutar</TableHead>
                            <TableHead className="text-right">Durum</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
                                <TableCell className="font-medium font-mono">{order.id}</TableCell>
                                <TableCell>{order.product}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.amount}</TableCell>
                                <TableCell className="text-right">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500">
                                        {order.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
