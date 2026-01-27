import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Server-side Supabase client oluşturur
 * Admin yetkilendirmesi için kullanılır
 * SADECE SERVER COMPONENT'LERDE KULLANILABİLİR
 */
export async function createServerSupabaseClient() {
    const cookieStore = await cookies()
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false,
        },
    })

    // Cookie'den session token'ı al
    const accessToken = cookieStore.get('sb-access-token')?.value
    const refreshToken = cookieStore.get('sb-refresh-token')?.value

    if (accessToken && refreshToken) {
        await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        })
    }

    return supabase
}

/**
 * Admin yetkisi kontrolü
 * SADECE SERVER COMPONENT'LERDE KULLANILABİLİR
 * @returns {Promise<{isAdmin: boolean, user: any | null}>}
 */
export async function checkAdminAuth() {
    try {
        const supabase = await createServerSupabaseClient()
        const {
            data: { session },
        } = await supabase.auth.getSession()

        if (!session || !session.user?.email) {
            return { isAdmin: false, user: null }
        }

        const allowedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        if (!allowedAdminEmail) {
            return { isAdmin: false, user: null }
        }

        const isAdmin =
            session.user.email.toLowerCase() === allowedAdminEmail.toLowerCase()

        return {
            isAdmin,
            user: isAdmin ? session.user : null,
        }
    } catch (error) {
        console.error('Auth check error:', error)
        return { isAdmin: false, user: null }
    }
}
