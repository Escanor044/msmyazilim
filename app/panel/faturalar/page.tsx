import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const invoices = [
    { id: "FTR-2024001", date: "12.01.2024", amount: "12.500 ₺ + KDV", status: "Ödendi" },
]

export default function InvoicesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Faturalar</h1>
                <p className="text-muted-foreground">Resmi faturalarınızı görüntüleyin ve indirin.</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 overflow-hidden overflow-x-auto">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="w-[120px]">Fatura No</TableHead>
                            <TableHead>Tarih</TableHead>
                            <TableHead>Toplam Tutar</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead className="text-right">İşlem</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((inv) => (
                            <TableRow key={inv.id} className="border-white/5 hover:bg-white/5">
                                <TableCell className="font-medium font-mono">{inv.id}</TableCell>
                                <TableCell>{inv.date}</TableCell>
                                <TableCell>{inv.amount}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500">
                                        {inv.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4 mr-2" /> PDF İndir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
