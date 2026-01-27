import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Auth Callback Handler
 * Şifre sıfırlama ve email doğrulama için callback URL'i
 * 
 * Supabase şifre sıfırlama linkleri şu formatta gelir:
 * http://localhost:3000/auth/callback?type=recovery&token=xxx#access_token=yyy&refresh_token=zzz
 */
export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const type = requestUrl.searchParams.get('type')
    const token = requestUrl.searchParams.get('token')
    const accessToken = requestUrl.searchParams.get('access_token')
    const refreshToken = requestUrl.searchParams.get('refresh_token')

    // Şifre sıfırlama akışı
    if (type === 'recovery') {
        // Hash server-side'da okunamaz (Request objesi hash içermez)
        // Bu yüzden direkt reset-password sayfasına yönlendir
        // Reset-password sayfası hash'i client-side'da okuyacak
        // Eğer Supabase redirect URL'i direkt /admin/reset-password olarak ayarlanırsa,
        // callback route'a hiç gelmez, direkt reset-password sayfasına gider
        return NextResponse.redirect(new URL('/admin/reset-password', requestUrl.origin))
    }

    // Email doğrulama veya code exchange
    if (code) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(supabaseUrl, supabaseAnonKey)

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Başarılı - admin login sayfasına yönlendir
            return NextResponse.redirect(new URL('/admin/login?success=1', requestUrl.origin))
        }
    }

    // Varsayılan: Login sayfasına yönlendir
    return NextResponse.redirect(new URL('/admin/login', requestUrl.origin))
}
