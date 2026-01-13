import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Key, Bell, User } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Hesap Ayarları</h1>
                <p className="text-muted-foreground">Profil bilgilerinizi ve tercihlerinizi düzenleyin.</p>
            </div>

            <div className="space-y-8">
                {/* Profile */}
                <div className="p-6 rounded-xl bg-card border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                        <User className="h-5 w-5" />
                        Profil Bilgileri
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Ad</label>
                            <Input defaultValue="Ahmet" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Soyad</label>
                            <Input defaultValue="Yılmaz" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Telefon</label>
                            <Input defaultValue="0555 123 45 67" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">E-Posta</label>
                            <Input defaultValue="ahmet@ornek.com" disabled className="opacity-50" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button>Bilgileri Güncelle</Button>
                    </div>
                </div>

                {/* Security */}
                <div className="p-6 rounded-xl bg-card border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                        <Key className="h-5 w-5" />
                        Şifre İşlemleri
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Mevcut Şifre</label>
                            <Input type="password" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Yeni Şifre</label>
                            <Input type="password" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="outline">Şifre Değiştir</Button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="p-6 rounded-xl bg-card border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                        <Bell className="h-5 w-5" />
                        Bildirim Tercihleri
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <div className="font-medium">E-Posta Bildirimleri</div>
                                <div className="text-muted-foreground">Sipariş ve destek güncellemelerini mail olarak al.</div>
                            </div>
                            <div className="bg-green-500 w-10 h-6 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <div className="font-medium">SMS Bildirimleri</div>
                                <div className="text-muted-foreground">Önemli güvenlik uyarılarını SMS olarak al.</div>
                            </div>
                            <div className="bg-white/10 w-10 h-6 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
