"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Server, Plus, Trash2, Edit, Loader2, CheckCircle2, XCircle, Database, ChevronDown, ChevronUp, Image as ImageIcon, X } from "lucide-react"

interface ServerFilePackage {
    id: number
    package_type: 'orta-emek' | 'hard-emek' | 'files-105'
    title: string
    subtitle: string
    features: string[]
    link: string
    youtube_url: string | null
    badge_text: string | null
    badge_color: string | null
    active: boolean
    sort_order: number
    created_at?: string
    updated_at?: string
}

interface System {
    id: number
    name: string
    category: string
    desc?: string
    long_description?: string
    features?: string[]
    price?: number
    image?: string
    included: boolean
    package_type?: string | null
}

interface Category {
    id: number
    name: string
    slug: string
    sort_order: number
}

export default function ServerFilesPackagesAdminPage() {
    const [packages, setPackages] = useState<ServerFilePackage[]>([])
    const [systems, setSystems] = useState<System[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [packageOpen, setPackageOpen] = useState(false)
    const [systemOpen, setSystemOpen] = useState(false)
    const [expandedPackages, setExpandedPackages] = useState<Set<number>>(new Set())
    const [packageFormData, setPackageFormData] = useState<Partial<ServerFilePackage>>({
        package_type: 'orta-emek',
        title: "",
        subtitle: "Teklif Alınız",
        features: [],
        link: "",
        youtube_url: null,
        badge_text: null,
        badge_color: null,
        active: true,
        sort_order: 0
    })
    const [systemFormData, setSystemFormData] = useState<Partial<System>>({
        category: "",
        included: false,
        features: [],
        package_type: null
    })
    const [packageFeaturesText, setPackageFeaturesText] = useState("")
    const [systemFeaturesText, setSystemFeaturesText] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [selectedPackageType, setSelectedPackageType] = useState<string | null>(null)

    useEffect(() => {
        fetchPackages()
        fetchCategories()
        fetchSystems()
    }, [])

    const fetchPackages = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('server_file_packages')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) {
            console.error('Error fetching server file packages:', error)
            setError("Paketler yüklenirken bir hata oluştu.")
        } else {
            setPackages(data || [])
        }
        setLoading(false)
    }

    const fetchSystems = async () => {
        const { data, error } = await supabase
            .from('systems')
            .select('*')
            .order('id', { ascending: true })

        if (error) {
            console.error('Error fetching systems:', error)
        } else {
            setSystems(data || [])
        }
    }

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('system_categories')
            .select('*')
            .order('sort_order', { ascending: true })

        if (data) {
            setCategories(data)
            if (!systemFormData.category && data.length > 0) {
                setSystemFormData(prev => ({ ...prev, category: data[0].slug }))
            }
        }
    }

    const handlePackageSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        const featuresArray = packageFeaturesText.split('\n').filter(f => f.trim() !== '')
        const packageData = {
            ...packageFormData,
            features: featuresArray,
            youtube_url: packageFormData.youtube_url || null,
            badge_text: packageFormData.badge_text || null,
            badge_color: packageFormData.badge_color || null,
        }

        try {
            if (packageFormData.id) {
                const { error } = await supabase
                    .from('server_file_packages')
                    .update(packageData)
                    .eq('id', packageFormData.id)
                if (error) throw error
                setSuccess("Paket başarıyla güncellendi!")
            } else {
                const { error } = await supabase
                    .from('server_file_packages')
                    .insert([packageData])
                if (error) throw error
                setSuccess("Paket başarıyla eklendi!")
            }
            
            await fetchPackages()
            setPackageOpen(false)
            resetPackageForm()
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleSystemSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        const featuresArray = systemFeaturesText.split('\n').filter(f => f.trim() !== '')
        const systemData = {
            ...systemFormData,
            features: featuresArray,
            package_type: systemFormData.package_type || null,
        }

        try {
            if (systemFormData.id) {
                const { error } = await supabase
                    .from('systems')
                    .update(systemData)
                    .eq('id', systemFormData.id)
                if (error) throw error
                setSuccess("Sistem başarıyla güncellendi!")
            } else {
                const { error } = await supabase
                    .from('systems')
                    .insert([systemData])
                if (error) throw error
                setSuccess("Sistem başarıyla eklendi!")
            }
            
            await fetchSystems()
            setSystemOpen(false)
            resetSystemForm()
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, systemId?: number) => {
        const file = e.target.files?.[0]
        if (!file) {
            console.log('No file selected')
            return
        }

        console.log('File selected:', file.name, file.size, file.type)

        // Dosya boyutu kontrolü (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            setError("Dosya boyutu 5MB'dan büyük olamaz.")
            return
        }

        setUploading(true)
        setError(null)
        setSuccess(null)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `systems/${fileName}`

            console.log('Uploading to:', filePath)

            // Önce aynı dosya varsa sil (opsiyonel)
            const { error: deleteError } = await supabase.storage
                .from('images')
                .remove([filePath])
            // Silme hatası önemli değil, dosya yoksa hata verir

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                console.error('Upload error:', uploadError)
                throw uploadError
            }

            console.log('Upload successful:', uploadData)

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath)

            console.log('Public URL:', publicUrl)

            if (systemId) {
                const { error: updateError } = await supabase
                    .from('systems')
                    .update({ image: publicUrl })
                    .eq('id', systemId)
                if (updateError) {
                    console.error('Update error:', updateError)
                    throw updateError
                }
                await fetchSystems()
                setSuccess("Görsel başarıyla yüklendi!")
            } else {
                setSystemFormData(prev => ({ ...prev, image: publicUrl }))
                setSuccess("Görsel seçildi!")
            }

            // Input'u sıfırla (aynı dosyayı tekrar seçebilmek için)
            e.target.value = ''
        } catch (err: any) {
            console.error('Image upload error:', err)
            setError(err.message || "Görsel yüklenirken bir hata oluştu.")
        } finally {
            setUploading(false)
        }
    }

    const handlePackageEdit = (pkg: ServerFilePackage) => {
        setPackageFormData(pkg)
        setPackageFeaturesText(pkg.features.join('\n'))
        setPackageOpen(true)
    }

    const handleSystemEdit = (system: System, packageType: string) => {
        setSystemFormData({ ...system, package_type: packageType })
        setSystemFeaturesText((system.features || []).join('\n'))
        setSelectedPackageType(packageType)
        setSystemOpen(true)
    }

    const handlePackageDelete = async (id: number) => {
        if (!confirm("Bu paketi silmek istediğinize emin misiniz?")) return

        setLoading(true)
        setError(null)
        try {
            const { error } = await supabase
                .from('server_file_packages')
                .delete()
                .eq('id', id)
            if (error) throw error
            setSuccess("Paket başarıyla silindi!")
            await fetchPackages()
        } catch (err: any) {
            setError(err.message || "Silme işlemi başarısız oldu.")
        } finally {
            setLoading(false)
        }
    }

    const handleSystemDelete = async (id: number) => {
        if (!confirm("Bu sistemi silmek istediğinize emin misiniz?")) return

        setLoading(true)
        setError(null)
        try {
            const { error } = await supabase
                .from('systems')
                .delete()
                .eq('id', id)
            if (error) throw error
            setSuccess("Sistem başarıyla silindi!")
            await fetchSystems()
        } catch (err: any) {
            setError(err.message || "Silme işlemi başarısız oldu.")
        } finally {
            setLoading(false)
        }
    }

    const togglePackageExpanded = (packageId: number) => {
        const newExpanded = new Set(expandedPackages)
        if (newExpanded.has(packageId)) {
            newExpanded.delete(packageId)
        } else {
            newExpanded.add(packageId)
        }
        setExpandedPackages(newExpanded)
    }

    const resetPackageForm = () => {
        setPackageFormData({
            package_type: 'orta-emek',
            title: "",
            subtitle: "Teklif Alınız",
            features: [],
            link: "",
            youtube_url: null,
            badge_text: null,
            badge_color: null,
            active: true,
            sort_order: 0
        })
        setPackageFeaturesText("")
    }

    const resetSystemForm = (packageType?: string) => {
        setSystemFormData({
            category: categories.length > 0 ? categories[0].slug : "",
            included: false,
            features: [],
            package_type: packageType || null
        })
        setSystemFeaturesText("")
        setSelectedPackageType(packageType || null)
    }

    const getPackageTypeLabel = (type: string) => {
        switch (type) {
            case 'orta-emek': return '1-99 Orta Emek'
            case 'hard-emek': return '1-99 Hard Emek'
            case 'files-105': return '1-105 Files'
            default: return type
        }
    }

    const getPackageSystems = (packageType: string) => {
        return systems.filter(s => s.package_type === packageType)
    }

    if (loading && packages.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Server className="h-8 w-8 text-primary" />
                        Server Files Paketleri
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Server Files sayfasındaki paket kartlarını ve sistemlerini yönetin
                    </p>
                </div>
                <Dialog open={packageOpen} onOpenChange={(isOpen) => {
                    setPackageOpen(isOpen)
                    if (!isOpen) resetPackageForm()
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => resetPackageForm()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Yeni Paket
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {packageFormData.id ? "Paketi Düzenle" : "Yeni Paket Ekle"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handlePackageSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            {success && (
                                <Alert className="border-green-500 bg-green-500/10">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <AlertDescription className="text-green-500">{success}</AlertDescription>
                                </Alert>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Paket Tipi *</Label>
                                    <Select
                                        value={packageFormData.package_type || 'orta-emek'}
                                        onValueChange={(val: 'orta-emek' | 'hard-emek' | 'files-105') => 
                                            setPackageFormData({ ...packageFormData, package_type: val, link: `/serverfiles/${val}` })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="orta-emek">1-99 Orta Emek</SelectItem>
                                            <SelectItem value="hard-emek">1-99 Hard Emek</SelectItem>
                                            <SelectItem value="files-105">1-105 Files</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Sıralama</Label>
                                    <Input
                                        type="number"
                                        value={packageFormData.sort_order || 0}
                                        onChange={e => setPackageFormData({ ...packageFormData, sort_order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Başlık *</Label>
                                <Input
                                    value={packageFormData.title || ""}
                                    onChange={e => setPackageFormData({ ...packageFormData, title: e.target.value })}
                                    placeholder="1-99 ORTA EMEK"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Alt Başlık *</Label>
                                <Input
                                    value={packageFormData.subtitle || ""}
                                    onChange={e => setPackageFormData({ ...packageFormData, subtitle: e.target.value })}
                                    placeholder="Teklif Alınız"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Link *</Label>
                                <Input
                                    value={packageFormData.link || ""}
                                    onChange={e => setPackageFormData({ ...packageFormData, link: e.target.value })}
                                    placeholder="/serverfiles/orta-emek"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>YouTube Video URL (Opsiyonel)</Label>
                                <Input
                                    value={packageFormData.youtube_url || ""}
                                    onChange={e => setPackageFormData({ ...packageFormData, youtube_url: e.target.value || null })}
                                    placeholder="https://www.youtube.com/embed/wEOz2Ua3a50"
                                />
                                <p className="text-xs text-muted-foreground">
                                    YouTube embed URL formatında olmalı (embed/...)
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Badge Metni (Opsiyonel)</Label>
                                    <Input
                                        value={packageFormData.badge_text || ""}
                                        onChange={e => setPackageFormData({ ...packageFormData, badge_text: e.target.value || null })}
                                        placeholder="POPÜLER, GELİŞTİRME AŞAMASINDA"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Badge Rengi (Opsiyonel)</Label>
                                    <Select
                                        value={packageFormData.badge_color || ""}
                                        onValueChange={(val: string) => setPackageFormData({ ...packageFormData, badge_color: val || null })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Renk seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="blue">Mavi</SelectItem>
                                            <SelectItem value="amber">Amber/Turuncu</SelectItem>
                                            <SelectItem value="green">Yeşil</SelectItem>
                                            <SelectItem value="red">Kırmızı</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Özellikler (Her satır bir özellik)</Label>
                                <Textarea
                                    value={packageFeaturesText}
                                    onChange={e => setPackageFeaturesText(e.target.value)}
                                    placeholder="Orta seviye zorluk&#10;1-99 seviye aralığı&#10;Optimize edilmiş deneyim"
                                    rows={5}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={packageFormData.active ?? true}
                                    onChange={e => setPackageFormData({ ...packageFormData, active: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300"
                                />
                                <Label htmlFor="active" className="cursor-pointer">Aktif</Label>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setPackageOpen(false)
                                        resetPackageForm()
                                    }}
                                >
                                    İptal
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Kaydediliyor...
                                        </>
                                    ) : (
                                        packageFormData.id ? "Güncelle" : "Ekle"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {error && !packageOpen && !systemOpen && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && !packageOpen && !systemOpen && (
                <Alert className="border-green-500 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-500">{success}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-6">
                {packages.map((pkg) => {
                    const packageSystems = getPackageSystems(pkg.package_type)
                    const isExpanded = expandedPackages.has(pkg.id)

                    return (
                        <div
                            key={pkg.id}
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                        >
                            {/* Paket Başlığı */}
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-black tracking-[0.2em] text-primary uppercase">
                                                {pkg.title}
                                            </span>
                                            {pkg.badge_text && (
                                                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                                                    pkg.badge_color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                    pkg.badge_color === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                    pkg.badge_color === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                    pkg.badge_color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                    'bg-white/10 text-white border border-white/20'
                                                }`}>
                                                    {pkg.badge_text}
                                                </span>
                                            )}
                                            {!pkg.active && (
                                                <span className="text-xs text-muted-foreground">(Pasif)</span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{pkg.subtitle}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Tip: {getPackageTypeLabel(pkg.package_type)} | Link: {pkg.link}
                                        </p>
                                        
                                        {pkg.features && pkg.features.length > 0 && (
                                            <div className="space-y-1 mb-3">
                                                {pkg.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-white/70">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {pkg.youtube_url && (
                                            <p className="text-xs text-muted-foreground mb-2">
                                                📹 YouTube: {pkg.youtube_url}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePackageEdit(pkg)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePackageDelete(pkg.id)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Sistemler Bölümü */}
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Database className="h-5 w-5 text-primary" />
                                            <h4 className="font-bold text-lg">
                                                {getPackageTypeLabel(pkg.package_type)} Sistemleri
                                            </h4>
                                            <span className="text-sm text-muted-foreground">
                                                ({packageSystems.length} sistem)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Dialog open={systemOpen && selectedPackageType === pkg.package_type} onOpenChange={(isOpen) => {
                                                setSystemOpen(isOpen)
                                                if (!isOpen) resetSystemForm()
                                            }}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            resetSystemForm(pkg.package_type)
                                                            setSystemOpen(true)
                                                        }}
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Sistem Ekle
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            {systemFormData.id ? "Sistemi Düzenle" : "Yeni Sistem Ekle"}
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <form onSubmit={handleSystemSubmit} className="space-y-4">
                                                        {error && (
                                                            <Alert variant="destructive">
                                                                <AlertDescription>{error}</AlertDescription>
                                                            </Alert>
                                                        )}
                                                        {success && (
                                                            <Alert className="border-green-500 bg-green-500/10">
                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                <AlertDescription className="text-green-500">{success}</AlertDescription>
                                                            </Alert>
                                                        )}

                                                        <div className="space-y-2">
                                                            <Label>Sistem Adı *</Label>
                                                            <Input
                                                                value={systemFormData.name || ""}
                                                                onChange={e => setSystemFormData({ ...systemFormData, name: e.target.value })}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label>Kategori *</Label>
                                                                <Select
                                                                    value={systemFormData.category || ""}
                                                                    onValueChange={(val: string) => setSystemFormData({ ...systemFormData, category: val })}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {categories.map((cat) => (
                                                                            <SelectItem key={cat.id} value={cat.slug}>
                                                                                {cat.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Fiyat (Opsiyonel)</Label>
                                                                <Input
                                                                    type="number"
                                                                    value={systemFormData.price || ""}
                                                                    onChange={e => setSystemFormData({ ...systemFormData, price: parseFloat(e.target.value) || undefined })}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Kısa Açıklama</Label>
                                                            <Input
                                                                value={systemFormData.desc || ""}
                                                                onChange={e => setSystemFormData({ ...systemFormData, desc: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Detaylı Açıklama</Label>
                                                            <Textarea
                                                                value={systemFormData.long_description || ""}
                                                                onChange={e => setSystemFormData({ ...systemFormData, long_description: e.target.value })}
                                                                rows={4}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Özellikler (Her satır bir özellik)</Label>
                                                            <Textarea
                                                                value={systemFeaturesText}
                                                                onChange={e => setSystemFeaturesText(e.target.value)}
                                                                rows={5}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Görsel</Label>
                                                            {error && (
                                                                <Alert variant="destructive" className="mb-2">
                                                                    <AlertDescription className="text-xs">{error}</AlertDescription>
                                                                </Alert>
                                                            )}
                                                            {success && (
                                                                <Alert className="border-green-500 bg-green-500/10 mb-2">
                                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                    <AlertDescription className="text-green-500 text-xs">{success}</AlertDescription>
                                                                </Alert>
                                                            )}
                                                            <div className="flex items-center gap-4">
                                                                {systemFormData.image && (
                                                                    <div className="relative">
                                                                        <img
                                                                            src={systemFormData.image}
                                                                            alt="Preview"
                                                                            className="w-24 h-24 object-cover rounded-lg border border-white/10"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setSystemFormData(prev => ({ ...prev, image: undefined }))}
                                                                            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                                                        >
                                                                            <X className="h-3 w-3" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                                <div className="flex flex-col gap-2">
                                                                    <label className="cursor-pointer">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(e) => handleImageUpload(e)}
                                                                            className="hidden"
                                                                            disabled={uploading}
                                                                        />
                                                                        <Button 
                                                                            type="button" 
                                                                            variant="outline" 
                                                                            disabled={uploading}
                                                                            onClick={(e) => {
                                                                                e.preventDefault()
                                                                                const input = e.currentTarget.parentElement?.querySelector('input[type="file"]') as HTMLInputElement
                                                                                input?.click()
                                                                            }}
                                                                        >
                                                                            <ImageIcon className="h-4 w-4 mr-2" />
                                                                            {uploading ? "Yükleniyor..." : systemFormData.image ? "Değiştir" : "Görsel Yükle"}
                                                                        </Button>
                                                                    </label>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        Maksimum 5MB, JPG, PNG, GIF
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                id="included"
                                                                checked={systemFormData.included ?? false}
                                                                onChange={e => setSystemFormData({ ...systemFormData, included: e.target.checked })}
                                                                className="w-4 h-4 rounded border-gray-300"
                                                            />
                                                            <Label htmlFor="included" className="cursor-pointer">Pakete Dahil</Label>
                                                        </div>

                                                        <div className="flex justify-end gap-2 pt-4">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setSystemOpen(false)
                                                                    resetSystemForm()
                                                                }}
                                                            >
                                                                İptal
                                                            </Button>
                                                            <Button type="submit" disabled={loading}>
                                                                {loading ? (
                                                                    <>
                                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                        Kaydediliyor...
                                                                    </>
                                                                ) : (
                                                                    systemFormData.id ? "Güncelle" : "Ekle"
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => togglePackageExpanded(pkg.id)}
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <ChevronUp className="h-4 w-4 mr-2" />
                                                        Gizle
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="h-4 w-4 mr-2" />
                                                        Göster
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Sistemler Listesi */}
                                    {isExpanded && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {packageSystems.length > 0 ? (
                                                packageSystems.map((system) => (
                                                    <div
                                                        key={system.id}
                                                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors"
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex-1">
                                                                <h5 className="font-bold text-white mb-1">{system.name}</h5>
                                                                {system.desc && (
                                                                    <p className="text-sm text-muted-foreground mb-2">{system.desc}</p>
                                                                )}
                                                                {system.image && (
                                                                    <img
                                                                        src={system.image}
                                                                        alt={system.name}
                                                                        className="w-full h-32 object-cover rounded-lg mb-2"
                                                                    />
                                                                )}
                                                                {system.features && system.features.length > 0 && (
                                                                    <div className="space-y-1">
                                                                        {system.features.slice(0, 3).map((feature, idx) => (
                                                                            <div key={idx} className="text-xs text-white/70 flex items-center gap-1">
                                                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                                                {feature}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleSystemEdit(system, pkg.package_type)}
                                                            >
                                                                <Edit className="h-3 w-3" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleSystemDelete(system.id)}
                                                                className="text-destructive hover:text-destructive"
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-full text-center py-8 text-muted-foreground">
                                                    <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p>Henüz sistem eklenmemiş.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {packages.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                    <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Henüz paket eklenmemiş.</p>
                </div>
            )}
        </div>
    )
}
