"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { LegalLayout } from "@/components/layout/legal-layout"
import { Loader2 } from "lucide-react"
import { sanitizeHTML } from "@/lib/auth"

export default function DistanceSalesAgreement() {
    const [page, setPage] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPage()
    }, [])

    const fetchPage = async () => {
        try {
            const { data, error } = await supabase
                .from('legal_pages')
                .select('*')
                .eq('slug', 'mesafeli-satis')
                .eq('active', true)
                .single()

            if (error) throw error
            setPage(data)
        } catch (error) {
            console.error('Error fetching distance sales page:', error)
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

    return (
        <LegalLayout
            title={page?.title || "Mesafeli Satış Sözleşmesi"}
            description={page?.description || "Lütfen hizmet satın almadan önce bu sözleşmeyi dikkatlice okuyunuz."}
            lastUpdated={page?.last_updated ? new Date(page.last_updated).toLocaleDateString('tr-TR') : undefined}
        >
            {page?.content ? (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(page.content) }} />
            ) : (
                <p>Sayfa içeriği yükleniyor...</p>
            )}
        </LegalLayout>
    )
}
