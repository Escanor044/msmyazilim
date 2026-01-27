"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Users, Award, Target, Zap, Heart, Code, Settings, Headphones, Loader2 } from "lucide-react"
import Link from "next/link"

const iconMap: Record<string, any> = {
    ShieldCheck,
    Users,
    Award,
    Target,
    Zap,
    Heart,
    Code,
    Settings,
    Headphones,
}

interface AboutPage {
    section_type: string
    title: string | null
    description: string | null
    content: string | null
}

interface AboutValue {
    title: string
    description: string
    icon: string | null
}

interface AboutTeam {
    name: string
    role: string
    description: string
    icon: string | null
    image_url: string | null
}

export default function AboutPage() {
    const [hero, setHero] = useState<AboutPage | null>(null)
    const [mission, setMission] = useState<AboutPage | null>(null)
    const [vision, setVision] = useState<AboutPage | null>(null)
    const [story, setStory] = useState<AboutPage | null>(null)
    const [cta, setCta] = useState<AboutPage | null>(null)
    const [values, setValues] = useState<AboutValue[]>([])
    const [team, setTeam] = useState<AboutTeam[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [pagesRes, valuesRes, teamRes] = await Promise.all([
                supabase.from('about_page').select('*').eq('active', true).order('sort_order', { ascending: true }),
                supabase.from('about_values').select('*').eq('active', true).order('sort_order', { ascending: true }),
                supabase.from('about_team').select('*').eq('active', true).order('sort_order', { ascending: true })
            ])

            if (pagesRes.data) {
                pagesRes.data.forEach((page: AboutPage) => {
                    if (page.section_type === 'hero') setHero(page)
                    if (page.section_type === 'mission') setMission(page)
                    if (page.section_type === 'vision') setVision(page)
                    if (page.section_type === 'story') setStory(page)
                    if (page.section_type === 'cta') setCta(page)
                })
            }

            if (valuesRes.data) setValues(valuesRes.data)
            if (teamRes.data) setTeam(teamRes.data)
        } catch (error) {
            console.error('Error fetching about data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </main>
        )
    }

    const parseCTA = (content: string | null) => {
        if (!content) return { button1: { text: "İletişime Geç", link: "/iletisim" }, button2: { text: "Sistemlerimizi İncele", link: "/sistemler" } }
        try {
            return JSON.parse(content)
        } catch {
            return { button1: { text: "İletişime Geç", link: "/iletisim" }, button2: { text: "Sistemlerimizi İncele", link: "/sistemler" } }
        }
    }

    const ctaData = parseCTA(cta?.content || null)

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-indigo-900/20 to-transparent border-b border-white/5">
                <div className="container-width text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{hero?.title || "Hakkımızda"}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {hero?.description || "Metin2 sunucu çözümlerinde uzmanlaşmış, kalite ve güvenilirlik odaklı bir ekibiz."}
                    </p>
                </div>
            </section>

            {/* Misyon & Vizyon */}
            <section className="py-16">
                <div className="container-width">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {mission && (
                            <Card className="glass-card p-8 rounded-2xl">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">{mission.title || "Misyonumuz"}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {mission.description || ""}
                                </p>
                            </Card>
                        )}

                        {vision && (
                            <Card className="glass-card p-8 rounded-2xl">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">{vision.title || "Vizyonumuz"}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {vision.description || ""}
                                </p>
                            </Card>
                        )}
                    </div>
                </div>
            </section>

            {/* Değerlerimiz */}
            {values.length > 0 && (
                <section className="py-16 bg-gradient-to-b from-transparent to-indigo-900/10">
                    <div className="container-width">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Değerlerimiz</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Çalışma prensiplerimiz ve müşterilerimize karşı sorumluluklarımız
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, idx) => {
                                const IconComponent = value.icon ? iconMap[value.icon] || ShieldCheck : ShieldCheck
                                return (
                                    <Card key={idx} className="glass-card p-6 rounded-2xl">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {value.description}
                                        </p>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Hikayemiz */}
            {story && (
                <section className="py-16">
                    <div className="container-width">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{story.title || "Hikayemiz"}</h2>
                            </div>
                            
                            <Card className="glass-card p-8 md:p-12 rounded-3xl">
                                <div className="prose prose-invert max-w-none">
                                    {story.content && story.content.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx} className="text-muted-foreground leading-relaxed mb-6">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            )}

            {/* Ekibimiz */}
            {team.length > 0 && (
                <section className="py-16 bg-gradient-to-b from-transparent to-indigo-900/10">
                    <div className="container-width">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ekibimiz</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Deneyimli ve tutkulu ekibimiz, projelerinizin başarısı için çalışıyor
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map((member, idx) => {
                                const IconComponent = member.icon ? iconMap[member.icon] || Code : Code
                                return (
                                    <Card key={idx} className="glass-card p-6 rounded-2xl text-center hover:border-primary/30 transition-all">
                                        <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-indigo-600/20 flex items-center justify-center border-2 border-primary/20">
                                            {member.image_url ? (
                                                <img src={member.image_url} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <IconComponent className="h-12 w-12 text-primary" />
                                            )}
                                        </div>
                                        <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                                        <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {member.description}
                                        </p>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            {cta && (
                <section className="py-16 bg-gradient-to-b from-indigo-900/20 to-transparent">
                    <div className="container-width text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title || "Bizimle Çalışmaya Hazır mısınız?"}</h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {cta.description || ""}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href={ctaData.button1?.link || "/iletisim"}>{ctaData.button1?.text || "İletişime Geç"}</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href={ctaData.button2?.link || "/sistemler"}>{ctaData.button2?.text || "Sistemlerimizi İncele"}</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
