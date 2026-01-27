import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    // Admin route'larını koru
    if (req.nextUrl.pathname.startsWith('/admin')) {
        // Login ve Reset Password sayfalarına izin ver
        if (req.nextUrl.pathname === '/admin/login' || req.nextUrl.pathname === '/admin/reset-password') {
            return NextResponse.next()
        }

        // Supabase client oluştur
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
            },
        })

        // Cookie'den access token'ı al
        const accessToken = req.cookies.get('sb-access-token')?.value
        const refreshToken = req.cookies.get('sb-refresh-token')?.value

        if (accessToken && refreshToken) {
            await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            })
        }

        // Session kontrolü
        const {
            data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/admin/login'
            return NextResponse.redirect(redirectUrl)
        }

        // Admin email kontrolü
        const allowedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        if (allowedAdminEmail && session.user?.email) {
            if (session.user.email.toLowerCase() !== allowedAdminEmail.toLowerCase()) {
                // Yetkisiz kullanıcı - login'e yönlendir
                const redirectUrl = req.nextUrl.clone()
                redirectUrl.pathname = '/admin/login'
                return NextResponse.redirect(redirectUrl)
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
}
