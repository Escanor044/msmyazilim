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
import { FileText, Plus, Trash2, Edit, Loader2, CheckCircle2, XCircle, Scale } from "lucide-react"

interface LegalPage {
    id: number
    slug: string
    title: string
    description: string | null
    content: string
    last_updated: string
    active: boolean
    sort_order: number
}

export default function LegalPagesAdminPage() {
    const [pages, setPages] = useState<LegalPage[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<Partial<LegalPage>>({
        slug: "",
        title: "",
        description: "",
        content: "",
        last_updated: new Date().toISOString().split('T')[0],
        active: true,
        sort_order: 0
    })
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        fetchPages()
    }, [])

    const fetchPages = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('legal_pages')
                .select('*')
                .order('sort_order', { ascending: true })

            if (error) throw error
            setPages(data || [])
        } catch (err: any) {
            setError(err.message || "Sayfalar yüklenirken bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            // Input validation
            if (!formData.slug || !formData.title || !formData.content) {
                setError("Lütfen tüm zorunlu alanları doldurun.")
                setLoading(false)
                return
            }

            // Slug validation (sadece küçük harf, tire ve rakam)
            const slugRegex = /^[a-z0-9-]+$/
            if (!slugRegex.test(formData.slug)) {
                setError("Slug sadece küçük harf, rakam ve tire içerebilir.")
                setLoading(false)
                return
            }

            // Title length validation
            if (formData.title.length > 200) {
                setError("Başlık en fazla 200 karakter olabilir.")
                setLoading(false)
                return
            }

            // Content length validation
            if (formData.content.length > 50000) {
                setError("İçerik çok uzun. Maksimum 50.000 karakter.")
                setLoading(false)
                return
            }

            const pageData = {
                ...formData,
                slug: formData.slug.toLowerCase().trim(),
                title: formData.title.trim(),
                description: formData.description?.trim() || null,
                last_updated: formData.last_updated || new Date().toISOString().split('T')[0]
            }

            if (formData.id) {
                const { error } = await supabase
                    .from('legal_pages')
                    .update(pageData)
                    .eq('id', formData.id)
                if (error) throw error
                setSuccess("Sayfa başarıyla güncellendi!")
            } else {
                const { error } = await supabase
                    .from('legal_pages')
                    .insert([pageData])
                if (error) throw error
                setSuccess("Sayfa başarıyla eklendi!")
            }
            
            await fetchPages()
            setOpen(false)
            resetForm()
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (page: LegalPage) => {
        setFormData({
            ...page,
            last_updated: page.last_updated ? new Date(page.last_updated).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        })
        setOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return

        setLoading(true)
        setError(null)
        try {
            const { error } = await supabase
                .from('legal_pages')
                .delete()
                .eq('id', id)
            if (error) throw error
            setSuccess("Sayfa başarıyla silindi!")
            await fetchPages()
        } catch (err: any) {
            setError(err.message || "Silme işlemi başarısız oldu.")
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            slug: "",
            title: "",
            description: "",
            content: "",
            last_updated: new Date().toISOString().split('T')[0],
            active: true,
            sort_order: 0
        })
    }

    const getSlugLabel = (slug: string) => {
        const labels: Record<string, string> = {
            'gizlilik': 'Gizlilik Politikası',
            'kvkk': 'KVKK Aydınlatma Metni',
            'mesafeli-satis': 'Mesafeli Satış Sözleşmesi',
            'iade-ve-iptal': 'İade ve İptal Koşulları'
        }
        return labels[slug] || slug
    }

    if (loading && pages.length === 0) {
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
                        <Scale className="h-8 w-8 text-primary" />
                        Yasal Sayfalar Yönetimi
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Yasal gereklilik sayfalarını yönetin
                    </p>
                </div>
                <Dialog open={open} onOpenChange={(isOpen) => {
                    setOpen(isOpen)
                    if (!isOpen) resetForm()
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={() => resetForm()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Yeni Sayfa
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {formData.id ? "Sayfayı Düzenle" : "Yeni Sayfa Ekle"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    <Label>Slug * (URL yolu)</Label>
                                    <Select
                                        value={formData.slug || ""}
                                        onValueChange={(val) => setFormData({ ...formData, slug: val })}
                                        disabled={!!formData.id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sayfa seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gizlilik">Gizlilik Politikası</SelectItem>
                                            <SelectItem value="kvkk">KVKK Aydınlatma</SelectItem>
                                            <SelectItem value="mesafeli-satis">Mesafeli Satış</SelectItem>
                                            <SelectItem value="iade-ve-iptal">İade ve İptal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Son Güncelleme Tarihi</Label>
                                    <Input
                                        type="date"
                                        value={formData.last_updated || ""}
                                        onChange={e => setFormData({ ...formData, last_updated: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Başlık *</Label>
                                <Input
                                    value={formData.title || ""}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Açıklama</Label>
                                <Input
                                    value={formData.description || ""}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Kısa açıklama..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>İçerik * (HTML formatında)</Label>
                                <Textarea
                                    value={formData.content || ""}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    rows={20}
                                    className="font-mono text-sm"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    HTML formatında yazabilirsiniz. Örnek: &lt;h3&gt;Başlık&lt;/h3&gt;&lt;p&gt;Paragraf&lt;/p&gt;
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={formData.active ?? true}
                                        onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="active" className="cursor-pointer">Aktif</Label>
                                </div>

                                <div className="space-y-2">
                                    <Label>Sıralama</Label>
                                    <Input
                                        type="number"
                                        value={formData.sort_order || 0}
                                        onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setOpen(false)
                                        resetForm()
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
                                        formData.id ? "Güncelle" : "Ekle"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {error && !open && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && !open && (
                <Alert className="border-green-500 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-500">{success}</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 gap-4">
                {pages.map((page) => (
                    <div key={page.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-black tracking-[0.2em] text-primary uppercase">
                                        {getSlugLabel(page.slug)}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        /sozlesmeler/{page.slug}
                                    </span>
                                    {!page.active && (
                                        <span className="text-xs text-muted-foreground">(Pasif)</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{page.title}</h3>
                                {page.description && (
                                    <p className="text-sm text-muted-foreground mb-2">{page.description}</p>
                                )}
                                <div className="text-xs text-muted-foreground mb-3">
                                    Son Güncelleme: {new Date(page.last_updated).toLocaleDateString('tr-TR')}
                                </div>
                                <div className="text-sm text-white/70 max-h-32 overflow-y-auto bg-white/5 p-3 rounded border border-white/10">
                                    <div dangerouslySetInnerHTML={{ __html: page.content.substring(0, 200) + '...' }} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDelete(page.id)} className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {pages.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                    <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Henüz sayfa eklenmemiş.</p>
                </div>
            )}
        </div>
    )
}
