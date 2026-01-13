import { Check, Minus, HelpCircle } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const features = [
    { name: "Max Level", basic: "99", pro: "120", premium: "Seçilebilir (1-120 / 1-99)" },
    { name: "Offline Shop", basic: "Standart", pro: "Gelişmiş Cache", premium: "Premium + İkarus" },
    { name: "Won Sistemi", basic: true, pro: true, premium: true },
    { name: "Simya Sistemi", basic: false, pro: "Standart", premium: "Gelişmiş / Kusursuz" },
    { name: "Kuşak Sistemi", basic: false, pro: true, premium: true },
    { name: "Lycan", basic: false, pro: "Opsiyonel", premium: "Opsiyonel" },
    { name: "Ticaret Camı", basic: false, pro: true, premium: true },
    { name: "Bot Kontrol", basic: false, pro: "Standart Captcha", premium: "AI Destekli" },
    { name: "Hızlı Kanal Değiştirme", basic: true, pro: true, premium: true },
    { name: "Uzaktan NPC", basic: true, pro: true, premium: true },
    { name: "Biyolog Sistemi", basic: "Standart", pro: "Hızlı / UI", premium: "Otomatik / Gelişmiş" },
    { name: "Zindan Takip", basic: false, pro: true, premium: true },
    { name: "Patron Takip", basic: false, pro: true, premium: true },
    { name: "Battlepass", basic: false, pro: false, premium: true },
    { name: "Teknik Destek", basic: "1 Ay", pro: "3 Ay", premium: "Sınırsız" },
]

export function ComparisonTable() {
    return (
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
            <Table>
                <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="w-[300px] text-white font-bold">Özellik</TableHead>
                        <TableHead className="text-center font-bold">BASIC</TableHead>
                        <TableHead className="text-center font-bold text-primary">PRO</TableHead>
                        <TableHead className="text-center font-bold text-indigo-400">PREMIUM</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {features.map((feature, index) => (
                        <TableRow key={index} className="border-white/5 hover:bg-white/5 data-[state=even]:bg-white/[0.02]">
                            <TableCell className="font-medium text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    {feature.name}
                                    <HelpCircle className="h-3 w-3 text-muted-foreground/50" />
                                </div>
                            </TableCell>

                            <TableCell className="text-center">
                                <FeatureValue value={feature.basic} />
                            </TableCell>
                            <TableCell className="text-center bg-primary/5">
                                <FeatureValue value={feature.pro} />
                            </TableCell>
                            <TableCell className="text-center bg-indigo-500/5">
                                <FeatureValue value={feature.premium} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function FeatureValue({ value }: { value: string | boolean }) {
    if (value === true) return <Check className="h-5 w-5 text-green-500 mx-auto" />
    if (value === false) return <Minus className="h-5 w-5 text-muted-foreground/30 mx-auto" />
    return <span className="text-sm font-medium">{value}</span>
}
