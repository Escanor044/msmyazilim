'use server'

import { createServerSupabaseClient, checkAdminAuth } from '@/lib/auth-server'

/**
 * GÜVENLİK NOTU: Tüm bu fonksiyonlar server-side'da çalışır ve admin kontrolü yapar.
 * Client component'lerden çağrılabilir ancak veritabanı işlemleri server'da yapılır.
 */

// ============================================
// PACKAGES (Paketler) İşlemleri
// ============================================

export async function createPackage(data: {
    title: string
    description?: string | null
    price: string
    features: string[]
    button_text?: string
    link?: string
    recommended?: boolean
    glow_color?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('packages')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updatePackage(id: number, data: {
    title?: string
    description?: string | null
    price?: string
    features?: string[]
    button_text?: string
    link?: string
    recommended?: boolean
    glow_color?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('packages')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function deletePackage(id: number) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id)

    if (error) throw error
    return { success: true }
}

export async function updatePackageSortOrder(packageId: number, targetSortOrder: number) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from('packages')
        .update({ sort_order: targetSortOrder })
        .eq('id', packageId)

    if (error) throw error
    return { success: true }
}

// ============================================
// SYSTEMS (Sistemler) İşlemleri
// ============================================

export async function createSystem(data: {
    name: string
    category: string
    desc?: string | null
    long_description?: string | null
    features?: string[]
    price?: number | null
    image?: string | null
    included?: boolean
    package_type?: string | null
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('systems')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updateSystem(id: number, data: {
    name?: string
    category?: string
    desc?: string | null
    long_description?: string | null
    features?: string[]
    price?: number | null
    image?: string | null
    included?: boolean
    package_type?: string | null
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('systems')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function deleteSystem(id: number) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from('systems')
        .delete()
        .eq('id', id)

    if (error) throw error
    return { success: true }
}

// ============================================
// SERVER FILES PACKAGES İşlemleri
// ============================================

export async function createServerFilePackage(data: {
    package_type: 'orta-emek' | 'hard-emek' | 'files-105'
    title: string
    subtitle: string
    features?: string[]
    link?: string
    youtube_url?: string | null
    badge_text?: string | null
    badge_color?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('server_file_packages')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updateServerFilePackage(id: number, data: {
    package_type?: 'orta-emek' | 'hard-emek' | 'files-105'
    title?: string
    subtitle?: string
    features?: string[]
    link?: string
    youtube_url?: string | null
    badge_text?: string | null
    badge_color?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('server_file_packages')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function deleteServerFilePackage(id: number) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from('server_file_packages')
        .delete()
        .eq('id', id)

    if (error) throw error
    return { success: true }
}

// ============================================
// REFERENCES (Referanslar) İşlemleri
// ============================================

export async function createReference(data: {
    name: string
    type?: string | null
    online_count?: number
    image_url?: string | null
    logo?: string | null
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('references')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updateReference(id: number, data: {
    name?: string
    type?: string | null
    online_count?: number
    image_url?: string | null
    logo?: string | null
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('references')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function deleteReference(id: number) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from('references')
        .delete()
        .eq('id', id)

    if (error) throw error
    return { success: true }
}

// ============================================
// ABOUT PAGE (Hakkımızda) İşlemleri
// ============================================

export async function createAboutPage(data: {
    section_type: string
    title?: string | null
    description?: string | null
    content?: string | null
    active?: boolean
    sort_order?: number
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('about_page')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updateAboutPage(id: number, data: {
    section_type?: string
    title?: string | null
    description?: string | null
    content?: string | null
    active?: boolean
    sort_order?: number
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('about_page')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function createAboutValue(data: {
    title: string
    description: string
    icon?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('about_values')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updateAboutValue(id: number, data: {
    title?: string
    description?: string
    icon?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('about_values')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function createAboutTeam(data: {
    name: string
    role: string
    description: string
    icon?: string | null
    image_url?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('about_team')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updateAboutTeam(id: number, data: {
    name?: string
    role?: string
    description?: string
    icon?: string | null
    image_url?: string | null
    sort_order?: number
    active?: boolean
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('about_team')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function deleteAboutItem(table: 'page' | 'value' | 'team', id: number) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const tableName = table === 'page' ? 'about_page' : table === 'value' ? 'about_values' : 'about_team'
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

    if (error) throw error
    return { success: true }
}

// ============================================
// LEGAL PAGES (Yasal Sayfalar) İşlemleri
// ============================================

export async function createLegalPage(data: {
    slug: string
    title: string
    content: string
    last_updated?: string
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('legal_pages')
        .insert([data])
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function updateLegalPage(id: number, data: {
    slug?: string
    title?: string
    content?: string
    last_updated?: string
}) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { data: result, error } = await supabase
        .from('legal_pages')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return { success: true, data: result }
}

export async function deleteLegalPage(id: number) {
    const { isAdmin } = await checkAdminAuth()
    if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required')
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase
        .from('legal_pages')
        .delete()
        .eq('id', id)

    if (error) throw error
    return { success: true }
}
