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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Monitor, Swords, Shield, Database, Crown, Plus, Trash2, Edit, Loader2, Settings, X } from "lucide-react"

interface Category {
    id: number
    name: string
    slug: string
    sort_order: number
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
}

export default function SystemsAdminPage() {
    const [systems, setSystems] = useState<System[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<System>>({
        category: "",
        included: false,
        features: []
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")
    const [categoryLoading, setCategoryLoading] = useState(false)
    const [featuresText, setFeaturesText] = useState("")
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchCategories()
        fetchSystems()
    }, [])

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('system_categories')
            .select('*')
            .order('sort_order', { ascending: true })

        if (data) {
            setCategories(data)
            // Set default category if not set
            if (!formData.category && data.length > 0) {
                setFormData(prev => ({ ...prev, category: data[0].slug }))
            }
        }
    }

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCategoryName.trim()) return

        setCategoryLoading(true)
        const slug = newCategoryName.toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')

        const { error } = await supabase
            .from('system_categories')
            .insert([{
                name: newCategoryName,
                slug: slug,
                sort_order: categories.length + 1
            }])

        if (error) {
            setError("Kategori eklenirken hata oluştu.")
        } else {
            setNewCategoryName("")
            fetchCategories()
        }
        setCategoryLoading(false)
    }

    const handleDeleteCategory = async (id: number) => {
        if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return

        const { error } = await supabase
            .from('system_categories')
            .delete()
            .eq('id', id)

        if (error) {
            setError("Kategori silinirken hata oluştu.")
        } else {
            fetchCategories()
        }
    }

    const fetchSystems = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('systems')
            .select('*')
            .order('id', { ascending: false })

        if (error) {
            console.error('Error fetching systems:', error)
            setError("Sistemler yüklenirken bir hata oluştu.")
        } else {
            setSystems(data || [])
        }
        setLoading(false)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        setUploading(true)
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file)

        if (uploadError) {
            setError("Resim yüklenirken hata oluştu.")
            setUploading(false)
            return
        }

        const { data } = supabase.storage
            .from('images')
            .getPublicUrl(filePath)

        setFormData({ ...formData, image: data.publicUrl })
        setUploading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const featuresArray = featuresText.split('\n').filter(f => f.trim() !== '')
        const systemData = {
            ...formData,
            features: featuresArray
        }

        try {
            if (formData.id) {
                // Update
                const { error } = await supabase
                    .from('systems')
                    .update(systemData)
                    .eq('id', formData.id)
                if (error) throw error
            } else {
                // Insert
                const { error } = await supabase
                    .from('systems')
                    .insert([systemData])
                if (error) throw error
            }

            setOpen(false)
            setOpen(false)
            setFormData({ category: categories[0]?.slug || "", included: false, features: [] })
            setFeaturesText("")
            fetchSystems()
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (system: System) => {
        setFormData(system)
        setFeaturesText(system.features?.join('\n') || "")
        setOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Bu sistemi silmek istediğinize emin misiniz?")) return

        setLoading(true)
        const { error } = await supabase
            .from('systems')
            .delete()
            .eq('id', id)

        if (error) {
            setError("Silinirken hata oluştu.")
        } else {
            fetchSystems()
        }
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Sistem Yönetimi</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>

                        <Button onClick={() => {
                            setFormData({ category: categories[0]?.slug || "", included: false })
                            setFeaturesText("")
                        }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Yeni Sistem Ekle
                        </Button>
                    </DialogTrigger>

                    <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="ml-2">
                                <Settings className="h-4 w-4 mr-2" />
                                Kategorileri Yönet
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Kategorileri Yönet</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                                <form onSubmit={handleAddCategory} className="flex gap-2">
                                    <Input
                                        placeholder="Yeni Kategori Adı"
                                        value={newCategoryName}
                                        onChange={e => setNewCategoryName(e.target.value)}
                                    />
                                    <Button type="submit" disabled={categoryLoading}>Ekle</Button>
                                </form>

                                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                    {categories.map(cat => (
                                        <div key={cat.id} className="flex items-center justify-between p-2 border rounded bg-muted/50">
                                            <span>{cat.name}</span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 text-destructive"
                                                onClick={() => handleDeleteCategory(cat.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{formData.id ? "Sistemi Düzenle" : "Yeni Sistem Ekle"}</DialogTitle>
                        </DialogHeader>

                        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Sistem Adı</Label>
                                    <Input
                                        value={formData.name || ""}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Kategori</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(val: any) => setFormData({ ...formData, category: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.slug}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Kısa Açıklama (Başlık Altı)</Label>
                                <Input
                                    value={formData.desc || ""}
                                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Detaylı Açıklama</Label>
                                <Textarea
                                    value={formData.long_description || ""}
                                    onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Özellikler (Her satıra bir özellik)</Label>
                                <Textarea
                                    value={featuresText}
                                    onChange={e => setFeaturesText(e.target.value)}
                                    rows={4}
                                    placeholder="- Özellik 1&#10;- Özellik 2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Fiyat (Opsiyonel)</Label>
                                    <Input
                                        type="number"
                                        value={formData.price || ""}
                                        onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2 flex items-center pt-8 gap-2">
                                    <input
                                        type="checkbox"
                                        id="included"
                                        checked={formData.included || false}
                                        onChange={e => setFormData({ ...formData, included: e.target.checked })}
                                        className="h-4 w-4"
                                    />
                                    <Label htmlFor="included">Pakete Dahil</Label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Görsel</Label>
                                <div className="flex items-center gap-4">
                                    {formData.image && (
                                        <img src={formData.image} alt="Preview" className="h-20 w-32 object-cover rounded border" />
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                    {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>İptal</Button>
                                <Button type="submit" disabled={loading || uploading}>
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Kaydet
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systems.map((system) => (
                    <div key={system.id} className="border rounded-xl p-4 bg-card hover:bg-muted/50 transition-colors">
                        <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden relative group">
                            {system.image ? (
                                <img src={system.image} alt={system.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <Monitor className="h-8 w-8" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${system.included ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                                    {system.included ? 'DAHİL' : 'EKSTRA'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-bold text-lg">{system.name}</h3>
                                <span className="text-xs text-muted-foreground uppercase">
                                    {categories.find(c => c.slug === system.category)?.name || system.category}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(system)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(system.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {system.desc}
                        </p>

                        {system.price && (
                            <div className="text-sm font-medium text-primary">
                                {system.price.toLocaleString('tr-TR')} ₺
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
