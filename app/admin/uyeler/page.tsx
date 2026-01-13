import { Search, Ban, UserCheck, MoreVertical, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const users = [
    { id: 101, name: "Ahmet Yılmaz", email: "ahmet@gmail.com", phone: "0555 123 4567", registered: "10.01.2024", status: "active", spend: "12.500 ₺" },
    { id: 102, name: "Mehmet Demir", email: "mehmet@hotmail.com", phone: "0532 987 6543", registered: "09.01.2024", status: "active", spend: "1.500 ₺" },
    { id: 103, name: "Banlı Kullanıcı", email: "hacker@mail.com", phone: "0500 000 0000", registered: "01.01.2024", status: "banned", spend: "0 ₺" },
]

export default function AdminUsersPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Üye Yönetimi</h1>
                    <p className="text-zinc-400">Kayıtlı kullanıcıları görüntüleyin ve düzenleyin.</p>
                </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input placeholder="İsim, E-Posta veya Telefon ara..." className="pl-9 bg-black/20 border-white/10 text-zinc-300 placeholder:text-zinc-600" />
                </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-zinc-900/20 overflow-hidden overflow-x-auto">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-zinc-400 w-[60px]">ID</TableHead>
                            <TableHead className="text-zinc-400">Ad Soyad</TableHead>
                            <TableHead className="text-zinc-400">İletişim</TableHead>
                            <TableHead className="text-zinc-400">Kayıt Tarihi</TableHead>
                            <TableHead className="text-zinc-400">Toplam Harcama</TableHead>
                            <TableHead className="text-zinc-400 text-center">Durum</TableHead>
                            <TableHead className="text-right text-zinc-400">İşlem</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="border-white/5 hover:bg-white/5 group">
                                <TableCell className="font-mono text-zinc-500">{user.id}</TableCell>
                                <TableCell>
                                    <div className="font-medium text-white">{user.name}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-xs text-zinc-300">{user.email}</div>
                                    <div className="text-xs text-zinc-500">{user.phone}</div>
                                </TableCell>
                                <TableCell className="text-zinc-400">{user.registered}</TableCell>
                                <TableCell className="font-bold text-white">{user.spend}</TableCell>
                                <TableCell className="text-center">
                                    {user.status === 'active' ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500">Aktif</span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-500">Banlı</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10">
                                            <Mail className="h-4 w-4" />
                                        </Button>
                                        {user.status === 'active' ? (
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10" title="Kullanıcıyı Yasakla">
                                                <Ban className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-500/10" title="Yasağı Kaldır">
                                                <UserCheck className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10">
                                            <MoreVertical className="h-4 w-4" />
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
