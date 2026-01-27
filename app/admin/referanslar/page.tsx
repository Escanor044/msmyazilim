"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { createReference, updateReference, deleteReference } from "@/app/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Pencil, Save, X, Upload, Image as ImageIcon, Users, Settings, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Reference {
    id: number
    name: string
    type?: string
    online_count?: number
    image_url?: string | null
    logo?: string | null
    description?: string | null
    website?: string | null
}

interface ReferenceType {
    id: number
    name: string
    slug: string
    sort_order: number
}

export default function ReferencesAdminPage() {
    const [references, setReferences] = useState<Reference[]>([])
    const [types, setTypes] = useState<ReferenceType[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingRef, setEditingRef] = useState<Reference | null>(null)
    const [uploading, setUploading] = useState(false)

    // Type Management States
    const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false)
    const [newTypeName, setNewTypeName] = useState("")
    const [typeLoading, setTypeLoading] = useState(false)

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        online_count: 0,
        image_url: ""
    })

    useEffect(() => {
        fetchReferences(true)
        fetchTypes()
    }, [])

    const fetchReferences = async (showLoading = false) => {
        if (showLoading) setLoading(true)
        try {
            const { data, error } = await supabase
                .from('references')
                .select('*')
                .order('id', { ascending: false })

            if (error) throw error
            setReferences(data || [])
        } catch (error) {
            console.error('Error fetching references:', error)
        } finally {
            if (showLoading) setLoading(false)
        }
    }

    const fetchTypes = async () => {
        try {
            const { data, error } = await supabase
                .from('reference_types')
                .select('*')
                .order('sort_order', { ascending: true })

            if (error) {
                // Tablo yoksa sessizce geç (opsiyonel özellik)
                if (error.code === '42P01' || error.message?.includes('does not exist')) {
                    console.warn('reference_types table does not exist. Skipping types.')
                    setTypes([])
                    return
                }
                throw error
            }
            setTypes(data || [])
        } catch (error) {
            console.error('Error fetching types:', error)
            setTypes([]) // Hata durumunda boş array set et
        }
    }

    const handleAddType = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTypeName.trim()) return

        setTypeLoading(true)
        try {
            const slug = newTypeName.toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')

            const { error } = await supabase
                .from('reference_types')
                .insert([{
                    name: newTypeName,
                    slug: slug,
                    sort_order: types.length + 1
                }])

            if (error) throw error

            setNewTypeName("")
            fetchTypes()
        } catch (error) {
            console.error('Error adding type:', error)
            alert('Tip eklenirken bir hata oluştu.')
        } finally {
            setTypeLoading(false)
        }
    }

    const handleDeleteType = async (id: number) => {
        if (!confirm('Bu tipi silmek istediğinize emin misiniz?')) return

        try {
            const { error } = await supabase
                .from('reference_types')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchTypes()
        } catch (error) {
            console.error('Error deleting type:', error)
            alert('Silinirken bir hata oluştu.')
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // ... (existing logic)
        try {
            const file = e.target.files?.[0]
            if (!file) return

            setUploading(true)
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `references/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage
                .from('images')
                .getPublicUrl(filePath)

            setFormData(prev => ({ ...prev, image_url: data.publicUrl }))
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Resim yüklenirken bir hata oluştu.')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const referenceData = {
                name: formData.name || "",
                type: formData.type || types[0]?.name || "Genel",
                online_count: formData.online_count || 0,
                image_url: formData.image_url || null,
                logo: formData.image_url || null // logo alanını da doldur (geriye dönük uyumluluk için)
            }

            if (editingRef) {
                // Server Action kullan
                await updateReference(editingRef.id, referenceData)
            } else {
                // Server Action kullan
                await createReference(referenceData)
            }

            // Dialog'u kapat ve formu sıfırla
            setIsDialogOpen(false)
            resetForm()
            
            // Referansları yeniden yükle
            await fetchReferences(false)
        } catch (error: any) {
            console.error('Error saving reference:', error)
            alert(`Kaydedilirken bir hata oluştu: ${error.message || 'Bilinmeyen hata'}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Bu referansı silmek istediğinize emin misiniz?')) return

        setLoading(true)
        try {
            // Server Action kullan
            await deleteReference(id)
            
            // Listeyi yeniden yükle
            await fetchReferences(false)
        } catch (error) {
            console.error('Error deleting reference:', error)
            alert('Silinirken bir hata oluştu.')
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (ref: Reference) => {
        setEditingRef(ref)
        setFormData({
            name: ref.name,
            type: ref.type || "",
            online_count: ref.online_count || 0,
            image_url: ref.image_url || ref.logo || ""
        })
        setIsDialogOpen(true)
    }

    const resetForm = () => {
        setEditingRef(null)
        setFormData({
            name: "",
            type: "",
            online_count: 0,
            image_url: ""
        })
    }

    if (loading) return <div className="p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>

    return (
        <div className="p-8 space-y-8 text-foreground">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Referans Yönetimi</h1>
                <div className="flex gap-2">
                    <Dialog open={isTypeDialogOpen} onOpenChange={setIsTypeDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="border-white/10 hover:bg-white/5">
                                <Settings className="mr-2 h-4 w-4" /> Kategorileri Yönet
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0A0B14] border-white/10 text-foreground">
                            <DialogHeader>
                                <DialogTitle>Kategorileri Yönet</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <form onSubmit={handleAddType} className="flex gap-2">
                                    <Input
                                        placeholder="Yeni Kategori Adı"
                                        value={newTypeName}
                                        onChange={e => setNewTypeName(e.target.value)}
                                        className="bg-white/5 border-white/10"
                                    />
                                    <Button type="submit" disabled={typeLoading}>Ekle</Button>
                                </form>

                                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                    {types.map(type => (
                                        <div key={type.id} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                                            <span>{type.name}</span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                onClick={() => handleDeleteType(type.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    {types.length === 0 && (
                                        <p className="text-center text-muted-foreground text-sm">Henüz kategori eklenmemiş.</p>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) {
                            resetForm()
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button onClick={() => {
                                resetForm()
                                setIsDialogOpen(true)
                            }} className="bg-primary hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" /> Yeni Ekle
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-[#0A0B14] border-white/10 text-foreground">
                            <DialogHeader>
                                <DialogTitle>{editingRef ? 'Referansı Düzenle' : 'Yeni Referans Ekle'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Sunucu Adı</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Örn: M2-TR"
                                        required
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Sunucu Tipi</label>
                                    {types.length > 0 ? (
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10">
                                                <SelectValue placeholder="Tip Seçin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {types.map(type => (
                                                    <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            placeholder="Tip girin (örn: Genel)"
                                            className="bg-white/5 border-white/10"
                                        />
                                    )}
                                    {types.length === 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            Kategori yoksa manuel olarak tip girebilirsiniz veya "Kategorileri Yönet" butonundan kategori ekleyebilirsiniz.
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Online Sayısı</label>
                                    <Input
                                        type="number"
                                        value={formData.online_count}
                                        onChange={(e) => setFormData({ ...formData, online_count: parseInt(e.target.value) || 0 })}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Görsel (Opsiyonel)</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {formData.image_url && (
                                            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                                                <img
                                                    src={formData.image_url}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, image_url: "" })}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer relative aspect-video">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                disabled={uploading}
                                            />
                                            <div className="text-center space-y-2">
                                                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="submit" disabled={uploading}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {editingRef ? 'Güncelle' : 'Kaydet'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {references.map((ref) => (
                    <div key={ref.id} className="relative group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="aspect-video bg-black/40 relative">
                            {(ref.image_url || ref.logo) ? (
                                <img
                                    src={ref.image_url || ref.logo || ""}
                                    alt={ref.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <ImageIcon className="h-12 w-12 opacity-20" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="secondary" onClick={() => startEdit(ref)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="destructive" onClick={() => handleDelete(ref.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">{ref.name}</h3>
                                <div className="flex items-center text-green-400 text-xs bg-green-500/10 px-2 py-1 rounded">
                                    <Users className="h-3 w-3 mr-1" />
                                    +{ref.online_count}
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{ref.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
