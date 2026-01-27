"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { createPackage, updatePackage, deletePackage, updatePackageSortOrder } from "@/app/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package, Plus, Trash2, Edit, Loader2, ArrowUp, ArrowDown, Star } from "lucide-react"

interface Package {
    id: number
    title: string
    description: string | null
    price: string
    features: string[]
    button_text: string
    link: string
    recommended: boolean
    glow_color: string | null
    sort_order: number
    active: boolean
    created_at?: string
    updated_at?: string
}

export default function PackagesAdminPage() {
    const [packages, setPackages] = useState<Package[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<Package>>({
        title: "",
        description: "",
        price: "Teklif Alınız",
        features: [],
        button_text: "Paket Detayı",
        link: "/files",
        recommended: false,
        glow_color: "rgba(59, 130, 246, 0.5)",
        sort_order: 0,
        active: true
    })
    const [featuresText, setFeaturesText] = useState("")
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPackages()
    }, [])

    const fetchPackages = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('packages')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) {
            console.error('Error fetching packages:', error)
            setError("Paketler yüklenirken bir hata oluştu.")
        } else {
            setPackages(data || [])
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const featuresArray = featuresText.split('\n').filter(f => f.trim() !== '')
        const packageData = {
            title: formData.title || "",
            description: formData.description || null,
            price: formData.price || "Teklif Alınız",
            features: featuresArray,
            button_text: formData.button_text || "Paket Detayı",
            link: formData.link || "/files",
            recommended: formData.recommended || false,
            glow_color: formData.glow_color || "rgba(59, 130, 246, 0.5)",
            sort_order: formData.sort_order || packages.length,
            active: formData.active !== undefined ? formData.active : true
        }

        try {
            if (formData.id) {
                // Update - Server Action kullan
                await updatePackage(formData.id, packageData)
            } else {
                // Insert - Server Action kullan
                await createPackage(packageData)
            }

            setOpen(false)
            setFormData({
                title: "",
                description: "",
                price: "Teklif Alınız",
                features: [],
                button_text: "Paket Detayı",
                link: "/files",
                recommended: false,
                glow_color: "rgba(59, 130, 246, 0.5)",
                sort_order: packages.length,
                active: true
            })
            setFeaturesText("")
            fetchPackages()
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (pkg: Package) => {
        setFormData(pkg)
        setFeaturesText(pkg.features?.join('\n') || "")
        setOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Bu paketi silmek istediğinize emin misiniz?")) return

        setLoading(true)
        setError(null)
        try {
            // Server Action kullan
            await deletePackage(id)
            fetchPackages()
        } catch (err: any) {
            setError(err.message || "Silinirken hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleMove = async (id: number, direction: 'up' | 'down') => {
        const currentIndex = packages.findIndex(p => p.id === id)
        if (currentIndex === -1) return

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
        if (newIndex < 0 || newIndex >= packages.length) return

        const current = packages[currentIndex]
        const target = packages[newIndex]

        try {
            // Server Actions kullan
            await updatePackageSortOrder(current.id, target.sort_order)
            await updatePackageSortOrder(target.id, current.sort_order)

            fetchPackages()
        } catch (error: any) {
            console.error('Error moving package:', error)
            setError(error.message || "Sıralama değiştirilirken hata oluştu.")
        }
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            price: "Teklif Alınız",
            features: [],
            button_text: "Paket Detayı",
            link: "/files",
            recommended: false,
            glow_color: "rgba(59, 130, 246, 0.5)",
            sort_order: packages.length,
            active: true
        })
        setFeaturesText("")
        setError(null)
    }

    if (loading && packages.length === 0) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Paket Yönetimi</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="h-4 w-4 mr-2" />
                            Yeni Paket Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{formData.id ? "Paketi Düzenle" : "Yeni Paket Ekle"}</DialogTitle>
                        </DialogHeader>

                        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Paket Adı</Label>
                                    <Input
                                        value={formData.title || ""}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        placeholder="STARTER, PRO, vb."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Fiyat / Metin</Label>
                                    <Input
                                        value={formData.price || ""}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        placeholder="Teklif Alınız"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Açıklama</Label>
                                <Textarea
                                    value={formData.description || ""}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={2}
                                    placeholder="Paket açıklaması"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Özellikler (Her satıra bir özellik)</Label>
                                <Textarea
                                    value={featuresText}
                                    onChange={e => setFeaturesText(e.target.value)}
                                    rows={6}
                                    placeholder="- Özellik 1&#10;- Özellik 2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Buton Metni</Label>
                                    <Input
                                        value={formData.button_text || ""}
                                        onChange={e => setFormData({ ...formData, button_text: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Link</Label>
                                    <Input
                                        value={formData.link || ""}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                        required
                                        placeholder="/odeme?paket=pro"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Glow Rengi (CSS rgba)</Label>
                                    <Input
                                        value={formData.glow_color || ""}
                                        onChange={e => setFormData({ ...formData, glow_color: e.target.value })}
                                        placeholder="rgba(59, 130, 246, 0.5)"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sıralama</Label>
                                    <Input
                                        type="number"
                                        value={formData.sort_order || 0}
                                        onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="recommended"
                                        checked={formData.recommended || false}
                                        onChange={e => setFormData({ ...formData, recommended: e.target.checked })}
                                        className="h-4 w-4"
                                    />
                                    <Label htmlFor="recommended">Önerilen Paket (EN ÇOK TERCİH EDİLEN)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={formData.active !== false}
                                        onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                        className="h-4 w-4"
                                    />
                                    <Label htmlFor="active">Aktif</Label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    İptal
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {formData.id ? "Güncelle" : "Ekle"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

            <div className="space-y-4">
                {packages.map((pkg, index) => (
                    <div
                        key={pkg.id}
                        className={`bg-white/5 border rounded-xl p-6 ${
                            pkg.recommended ? 'border-primary/50 bg-primary/5' : 'border-white/10'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold">{pkg.title}</h3>
                                    {pkg.recommended && (
                                        <span className="px-2 py-1 text-xs font-bold bg-primary/20 text-primary rounded">
                                            <Star className="h-3 w-3 inline mr-1" />
                                            ÖNERİLEN
                                        </span>
                                    )}
                                    {!pkg.active && (
                                        <span className="px-2 py-1 text-xs font-bold bg-gray-500/20 text-gray-400 rounded">
                                            PASİF
                                        </span>
                                    )}
                                </div>
                                <p className="text-muted-foreground mb-2">{pkg.description}</p>
                                <p className="text-lg font-semibold text-primary mb-3">{pkg.price}</p>
                                <div className="space-y-1 mb-4">
                                    {pkg.features?.slice(0, 3).map((feature, i) => (
                                        <div key={i} className="text-sm text-muted-foreground">• {feature}</div>
                                    ))}
                                    {pkg.features && pkg.features.length > 3 && (
                                        <div className="text-sm text-muted-foreground">+ {pkg.features.length - 3} özellik daha</div>
                                    )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Link: {pkg.link} | Sıra: {pkg.sort_order}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMove(pkg.id, 'up')}
                                    disabled={index === 0}
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMove(pkg.id, 'down')}
                                    disabled={index === packages.length - 1}
                                >
                                    <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(pkg)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => handleDelete(pkg.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {packages.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    Henüz paket eklenmemiş.
                </div>
            )}
        </div>
    )
}
