import { Server, Settings, RefreshCw, Power } from "lucide-react"
import { Button } from "@/components/ui/button"

const myPackages = [
    {
        id: "SRV-2024001",
        name: "Premium Server Files - 1-120 Official",
        ip: "192.168.1.100",
        status: "active",
        expiresIn: "29 Gün",
        version: "v2.4.1"
    },
    {
        id: "SYS-502",
        name: "Gelişmiş Arena Sistemi",
        ip: "-",
        status: "active",
        expiresIn: "Sınırsız",
        version: "v1.0"
    }
]

export default function MyPackagesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Paketlerim</h1>
                    <p className="text-muted-foreground">Satın aldığınız tüm hizmetleri buradan yönetin.</p>
                </div>
                <Button>Yeni Paket Al</Button>
            </div>

            <div className="grid gap-6">
                {myPackages.map((pkg) => (
                    <div key={pkg.id} className="p-6 rounded-xl bg-card border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Server className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{pkg.name}</h3>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="font-mono">{pkg.id}</span>
                                    <span>•</span>
                                    <span>{pkg.version}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                                <div className="text-sm font-medium">Bitiş</div>
                                <div className="text-sm text-muted-foreground">{pkg.expiresIn}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pkg.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {pkg.status === 'active' ? 'Aktif' : 'Pasif'}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <Button size="icon" variant="outline" title="Yönet">
                                    <Settings className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="outline" title="Yeniden Başlat">
                                    <Power className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
