"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { createAboutPage, updateAboutPage, createAboutValue, updateAboutValue, createAboutTeam, updateAboutTeam, deleteAboutItem } from "@/app/actions/admin-actions"
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
import { FileText, Plus, Trash2, Edit, Loader2, CheckCircle2, XCircle, Users, Award, Target, Zap, Heart, Code, Settings, Headphones, ShieldCheck } from "lucide-react"

interface AboutPage {
    id: number
    section_type: string
    title: string | null
    description: string | null
    content: string | null
    active: boolean
    sort_order: number
}

interface AboutValue {
    id: number
    title: string
    description: string
    icon: string | null
    sort_order: number
    active: boolean
}

interface AboutTeam {
    id: number
    name: string
    role: string
    description: string
    icon: string | null
    image_url: string | null
    sort_order: number
    active: boolean
}

const iconOptions = [
    { value: 'ShieldCheck', label: 'Shield Check', icon: ShieldCheck },
    { value: 'Users', label: 'Users', icon: Users },
    { value: 'Award', label: 'Award', icon: Award },
    { value: 'Target', label: 'Target', icon: Target },
    { value: 'Zap', label: 'Zap', icon: Zap },
    { value: 'Heart', label: 'Heart', icon: Heart },
    { value: 'Code', label: 'Code', icon: Code },
    { value: 'Settings', label: 'Settings', icon: Settings },
    { value: 'Headphones', label: 'Headphones', icon: Headphones },
]

export default function AboutAdminPage() {
    const [aboutPages, setAboutPages] = useState<AboutPage[]>([])
    const [values, setValues] = useState<AboutValue[]>([])
    const [team, setTeam] = useState<AboutTeam[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    
    // Dialog states
    const [pageDialogOpen, setPageDialogOpen] = useState(false)
    const [valueDialogOpen, setValueDialogOpen] = useState(false)
    const [teamDialogOpen, setTeamDialogOpen] = useState(false)
    
    // Form states
    const [pageFormData, setPageFormData] = useState<Partial<AboutPage>>({})
    const [valueFormData, setValueFormData] = useState<Partial<AboutValue>>({})
    const [teamFormData, setTeamFormData] = useState<Partial<AboutTeam>>({})
    const [activeTab, setActiveTab] = useState<'pages' | 'values' | 'team'>('pages')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [pagesRes, valuesRes, teamRes] = await Promise.all([
                supabase.from('about_page').select('*').order('sort_order', { ascending: true }),
                supabase.from('about_values').select('*').order('sort_order', { ascending: true }),
                supabase.from('about_team').select('*').order('sort_order', { ascending: true })
            ])

            if (pagesRes.error) throw pagesRes.error
            if (valuesRes.error) throw valuesRes.error
            if (teamRes.error) throw teamRes.error

            setAboutPages(pagesRes.data || [])
            setValues(valuesRes.data || [])
            setTeam(teamRes.data || [])
        } catch (err: any) {
            setError(err.message || "Veri yüklenirken bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handlePageSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const pageData = {
                section_type: pageFormData.section_type || "",
                title: pageFormData.title || null,
                description: pageFormData.description || null,
                content: pageFormData.content || null,
                active: pageFormData.active !== undefined ? pageFormData.active : true,
                sort_order: pageFormData.sort_order || 0
            }

            if (pageFormData.id) {
                // Server Action kullan
                await updateAboutPage(pageFormData.id, pageData)
                setSuccess("Bölüm başarıyla güncellendi!")
            } else {
                // Server Action kullan
                await createAboutPage(pageData)
                setSuccess("Bölüm başarıyla eklendi!")
            }
            
            await fetchData()
            setPageDialogOpen(false)
            setPageFormData({})
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleValueSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const valueData = {
                title: valueFormData.title || "",
                description: valueFormData.description || "",
                icon: valueFormData.icon || null,
                sort_order: valueFormData.sort_order || 0,
                active: valueFormData.active !== undefined ? valueFormData.active : true
            }

            if (valueFormData.id) {
                // Server Action kullan
                await updateAboutValue(valueFormData.id, valueData)
                setSuccess("Değer başarıyla güncellendi!")
            } else {
                // Server Action kullan
                await createAboutValue(valueData)
                setSuccess("Değer başarıyla eklendi!")
            }
            
            await fetchData()
            setValueDialogOpen(false)
            setValueFormData({})
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleTeamSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const teamData = {
                name: teamFormData.name || "",
                role: teamFormData.role || "",
                description: teamFormData.description || "",
                icon: teamFormData.icon || null,
                image_url: teamFormData.image_url || null,
                sort_order: teamFormData.sort_order || 0,
                active: teamFormData.active !== undefined ? teamFormData.active : true
            }

            if (teamFormData.id) {
                // Server Action kullan
                await updateAboutTeam(teamFormData.id, teamData)
                setSuccess("Ekip üyesi başarıyla güncellendi!")
            } else {
                // Server Action kullan
                await createAboutTeam(teamData)
                setSuccess("Ekip üyesi başarıyla eklendi!")
            }
            
            await fetchData()
            setTeamDialogOpen(false)
            setTeamFormData({})
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (table: 'page' | 'value' | 'team', id: number) => {
        if (!confirm("Bu öğeyi silmek istediğinize emin misiniz?")) return

        setLoading(true)
        setError(null)
        try {
            // Server Action kullan
            await deleteAboutItem(table, id)
            setSuccess("Öğe başarıyla silindi!")
            await fetchData()
        } catch (err: any) {
            setError(err.message || "Silme işlemi başarısız oldu.")
        } finally {
            setLoading(false)
        }
    }

    if (loading && aboutPages.length === 0) {
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
                        <FileText className="h-8 w-8 text-primary" />
                        Hakkımızda Sayfası Yönetimi
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Hakkımızda sayfası içeriğini yönetin
                    </p>
                </div>
            </div>

            {error && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="border-green-500 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-500">{success}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-6">
                {/* Tab Navigation */}
                <div className="flex gap-2 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('pages')}
                        className={`px-4 py-2 font-medium transition-colors ${
                            activeTab === 'pages' 
                                ? 'border-b-2 border-primary text-primary' 
                                : 'text-muted-foreground hover:text-white'
                        }`}
                    >
                        Ana Bölümler
                    </button>
                    <button
                        onClick={() => setActiveTab('values')}
                        className={`px-4 py-2 font-medium transition-colors ${
                            activeTab === 'values' 
                                ? 'border-b-2 border-primary text-primary' 
                                : 'text-muted-foreground hover:text-white'
                        }`}
                    >
                        Değerler
                    </button>
                    <button
                        onClick={() => setActiveTab('team')}
                        className={`px-4 py-2 font-medium transition-colors ${
                            activeTab === 'team' 
                                ? 'border-b-2 border-primary text-primary' 
                                : 'text-muted-foreground hover:text-white'
                        }`}
                    >
                        Ekip
                    </button>
                </div>

                {/* Ana Bölümler */}
                {activeTab === 'pages' && (
                <div className="space-y-4">
                    <Dialog open={pageDialogOpen} onOpenChange={setPageDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setPageFormData({})}>
                                <Plus className="h-4 w-4 mr-2" />
                                Yeni Bölüm
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {pageFormData.id ? "Bölümü Düzenle" : "Yeni Bölüm Ekle"}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handlePageSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Bölüm Tipi *</Label>
                                    <Select
                                        value={pageFormData.section_type || ""}
                                        onValueChange={(val) => setPageFormData({ ...pageFormData, section_type: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Bölüm seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hero">Hero (Başlık)</SelectItem>
                                            <SelectItem value="mission">Misyon</SelectItem>
                                            <SelectItem value="vision">Vizyon</SelectItem>
                                            <SelectItem value="story">Hikayemiz</SelectItem>
                                            <SelectItem value="cta">CTA (Çağrı)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Başlık</Label>
                                    <Input
                                        value={pageFormData.title || ""}
                                        onChange={e => setPageFormData({ ...pageFormData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Açıklama</Label>
                                    <Textarea
                                        value={pageFormData.description || ""}
                                        onChange={e => setPageFormData({ ...pageFormData, description: e.target.value })}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>İçerik (Uzun metin için)</Label>
                                    <Textarea
                                        value={pageFormData.content || ""}
                                        onChange={e => setPageFormData({ ...pageFormData, content: e.target.value })}
                                        rows={6}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="page-active"
                                        checked={pageFormData.active ?? true}
                                        onChange={e => setPageFormData({ ...pageFormData, active: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="page-active" className="cursor-pointer">Aktif</Label>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setPageDialogOpen(false)}>
                                        İptal
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                        {pageFormData.id ? "Güncelle" : "Ekle"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <div className="grid grid-cols-1 gap-4">
                        {aboutPages.map((page) => (
                            <div key={page.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-black tracking-[0.2em] text-primary uppercase">
                                                {page.section_type}
                                            </span>
                                            {!page.active && (
                                                <span className="text-xs text-muted-foreground">(Pasif)</span>
                                            )}
                                        </div>
                                        {page.title && <h3 className="text-xl font-bold text-white mb-1">{page.title}</h3>}
                                        {page.description && <p className="text-sm text-muted-foreground mb-2">{page.description}</p>}
                                        {page.content && (
                                            <p className="text-sm text-white/70 whitespace-pre-line">{page.content}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => {
                                            setPageFormData(page)
                                            setPageDialogOpen(true)
                                        }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete('page', page.id)} className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {/* Değerler */}
                {activeTab === 'values' && (
                <div className="space-y-4">
                    <Dialog open={valueDialogOpen} onOpenChange={setValueDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setValueFormData({})}>
                                <Plus className="h-4 w-4 mr-2" />
                                Yeni Değer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {valueFormData.id ? "Değeri Düzenle" : "Yeni Değer Ekle"}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleValueSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Başlık *</Label>
                                    <Input
                                        value={valueFormData.title || ""}
                                        onChange={e => setValueFormData({ ...valueFormData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Açıklama *</Label>
                                    <Textarea
                                        value={valueFormData.description || ""}
                                        onChange={e => setValueFormData({ ...valueFormData, description: e.target.value })}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Icon</Label>
                                    <Select
                                        value={valueFormData.icon || ""}
                                        onValueChange={(val) => setValueFormData({ ...valueFormData, icon: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Icon seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {iconOptions.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="value-active"
                                        checked={valueFormData.active ?? true}
                                        onChange={e => setValueFormData({ ...valueFormData, active: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="value-active" className="cursor-pointer">Aktif</Label>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setValueDialogOpen(false)}>
                                        İptal
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                        {valueFormData.id ? "Güncelle" : "Ekle"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {values.map((value) => {
                            const IconComponent = iconOptions.find(opt => opt.value === value.icon)?.icon || ShieldCheck
                            return (
                                <div key={value.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => {
                                                setValueFormData(value)
                                                setValueDialogOpen(true)
                                            }}>
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleDelete('value', value.id)} className="text-destructive">
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                )}

                {/* Ekip */}
                {activeTab === 'team' && (
                <div className="space-y-4">
                    <Dialog open={teamDialogOpen} onOpenChange={setTeamDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setTeamFormData({})}>
                                <Plus className="h-4 w-4 mr-2" />
                                Yeni Ekip Üyesi
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {teamFormData.id ? "Ekip Üyesini Düzenle" : "Yeni Ekip Üyesi Ekle"}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleTeamSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>İsim *</Label>
                                        <Input
                                            value={teamFormData.name || ""}
                                            onChange={e => setTeamFormData({ ...teamFormData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Rol *</Label>
                                        <Input
                                            value={teamFormData.role || ""}
                                            onChange={e => setTeamFormData({ ...teamFormData, role: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Açıklama *</Label>
                                    <Textarea
                                        value={teamFormData.description || ""}
                                        onChange={e => setTeamFormData({ ...teamFormData, description: e.target.value })}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Icon</Label>
                                    <Select
                                        value={teamFormData.icon || ""}
                                        onValueChange={(val) => setTeamFormData({ ...teamFormData, icon: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Icon seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {iconOptions.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Profil Fotoğrafı URL (Opsiyonel)</Label>
                                    <Input
                                        value={teamFormData.image_url || ""}
                                        onChange={e => setTeamFormData({ ...teamFormData, image_url: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="team-active"
                                        checked={teamFormData.active ?? true}
                                        onChange={e => setTeamFormData({ ...teamFormData, active: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="team-active" className="cursor-pointer">Aktif</Label>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setTeamDialogOpen(false)}>
                                        İptal
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                        {teamFormData.id ? "Güncelle" : "Ekle"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.map((member) => {
                            const IconComponent = iconOptions.find(opt => opt.value === member.icon)?.icon || Code
                            return (
                                <div key={member.id} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-indigo-600/20 flex items-center justify-center border-2 border-primary/20">
                                            {member.image_url ? (
                                                <img src={member.image_url} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <IconComponent className="h-12 w-12 text-primary" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => {
                                                setTeamFormData(member)
                                                setTeamDialogOpen(true)
                                            }}>
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleDelete('team', member.id)} className="text-destructive">
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                                    <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                                    <p className="text-sm text-muted-foreground">{member.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
