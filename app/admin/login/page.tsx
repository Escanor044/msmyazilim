"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Loader2, Lock, Mail, XCircle, CheckCircle2 } from "lucide-react"
import { checkRateLimit, isValidEmail, sanitizeInput } from "@/lib/auth"
import { logFailedLogin, getFailedLoginCount } from "@/lib/logger"

export default function AdminLoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [isBlocked, setIsBlocked] = useState(false)


    const [isResetMode, setIsResetMode] = useState(false)
    const [resetSuccess, setResetSuccess] = useState(false)

    useEffect(() => {
        // Rate limiting kontrolü
        const identifier = `login_${email || 'unknown'}`
        if (!checkRateLimit(identifier, 5, 300000)) { // 5 deneme, 5 dakika
            setIsBlocked(true)
            setError("Çok fazla deneme yapıldı. Lütfen 5 dakika sonra tekrar deneyin.")
        } else {
            setIsBlocked(false)
        }
    }, [attempts, email])

    const getRedirectUrl = () => {
        if (typeof window === 'undefined') return ''
        // Localhost kontrolü
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return `${window.location.origin}/admin/reset-password`
        }
        // Production için her zaman whitelist'teki tam adresi döndür (www ile)
        return 'https://www.msmyazilim.com/admin/reset-password'
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        setError(null)
        setResetSuccess(false)

        try {
            const sanitizedEmail = sanitizeInput(email)

            // Sadece belirli email adresine izin ver
            const allowedEmails = [
                process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase(),
                'msmyazilim1@gmail.com'
            ].filter(Boolean)

            if (!allowedEmails.includes(sanitizedEmail.toLowerCase())) {
                setError("Bu email adresi için şifre sıfırlama işlemi yapılamaz.")
                setLoading(false)
                return
            }

            const redirectUrl = getRedirectUrl()
            console.log('Sending reset password email to:', sanitizedEmail, 'Redirect URL:', redirectUrl)

            const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
                redirectTo: redirectUrl,
            })

            if (error) {
                console.error('Reset password error:', error)
                throw error
            }

            setResetSuccess(true)
            setError(null)

        } catch (err: any) {
            console.error('Reset password error:', err)

            // Hata mesajlarını Türkçeleştir
            let errorMessage = err.message || "Şifre sıfırlama maili gönderilirken bir hata oluştu."

            if (errorMessage.includes("rate limit exceeded") || errorMessage.includes("Too many requests")) {
                errorMessage = "Çok fazla istek gönderildi. Lütfen 1-2 dakika bekleyip tekrar deneyin. (Gelen kutunuzu ve spam klasörünü kontrol etmeyi unutmayın)"
            } else if (errorMessage.includes("Signups not allowed")) {
                errorMessage = "Kayıt olma yetkiniz yok veya sistem kapalı."
            }

            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
        console.log('🔵 Login form submitted!', { email, passwordLength: password.length })
        
        if (isBlocked) {
            setError("Çok fazla deneme yapıldı. Lütfen 5 dakika sonra tekrar deneyin.")
            return
        }

        setLoading(true)
        setError(null)

        try {
            console.log('🟢 Starting login process...')
            
            // Input validation
            const sanitizedEmail = sanitizeInput(email)
            console.log('📧 Email validation:', { original: email, sanitized: sanitizedEmail, isValid: isValidEmail(sanitizedEmail) })
            
            if (!isValidEmail(sanitizedEmail)) {
                console.error('❌ Invalid email format')
                setError("Geçerli bir email adresi girin.")
                setLoading(false)
                return
            }

            // Admin email kontrolü
            const allowedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
            console.log('Admin email check:', {
                allowed: allowedAdminEmail,
                entered: sanitizedEmail,
                match: allowedAdminEmail?.toLowerCase() === sanitizedEmail.toLowerCase()
            })

            if (allowedAdminEmail && sanitizedEmail.toLowerCase() !== allowedAdminEmail.toLowerCase()) {
                setAttempts(prev => prev + 1)
                // Failed login logla
                logFailedLogin(sanitizedEmail, undefined, navigator.userAgent, 'Unauthorized email')
                setError(`Bu email adresi ile giriş yapılamaz. İzin verilen email: ${allowedAdminEmail}`)
                setLoading(false)
                return
            }

            // Rate limiting kontrolü - failed login sayısına göre
            const failedCount = getFailedLoginCount(sanitizedEmail, 5)
            if (failedCount >= 5) {
                setError("Çok fazla başarısız deneme. Lütfen 5 dakika sonra tekrar deneyin.")
                setLoading(false)
                return
            }

            console.log('Attempting login with:', {
                email: sanitizedEmail,
                passwordLength: password.length,
                supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
            })

            const { data, error } = await supabase.auth.signInWithPassword({
                email: sanitizedEmail,
                password: password, // Şifre sanitize edilmez, Supabase hash'ler
            })

            console.log('Login response:', {
                hasData: !!data,
                hasError: !!error,
                userEmail: data?.user?.email,
                errorMessage: error?.message,
                errorStatus: error?.status,
                fullData: data,
                fullError: error
            })
            
            // Daha detaylı log
            if (data?.user) {
                console.log('✅ User data:', data.user)
            }
            if (error) {
                console.error('❌ Login error details:', error)
            }

            if (error) {
                setAttempts(prev => prev + 1)
                // Failed login logla
                logFailedLogin(sanitizedEmail, undefined, navigator.userAgent, error.message)

                // Debug için console'a yazdır
                console.error('Supabase login error:', {
                    message: error.message,
                    status: error.status,
                    name: error.name,
                    fullError: error
                })

                // Daha anlaşılır hata mesajları
                let errorMessage = "Giriş yapılırken bir hata oluştu."

                if (error.message.includes('Invalid login credentials') || error.message.includes('Invalid credentials')) {
                    errorMessage = "Email veya şifre hatalı. Şifrenizi Supabase Dashboard > Users > Kullanıcı > 'Reset password' ile sıfırlayabilirsiniz. Email doğru görünüyor, muhtemelen şifre yanlış."
                } else if (error.message.includes('Email not confirmed') || error.message.includes('not confirmed')) {
                    errorMessage = "Email adresiniz doğrulanmamış. Supabase Dashboard > Users > Kullanıcıyı düzenleyin ve 'Confirm email' butonuna tıklayın."
                } else if (error.message.includes('User not found')) {
                    errorMessage = "Bu email adresi ile kayıtlı kullanıcı bulunamadı. Supabase Dashboard > Authentication > Users'dan kullanıcıyı oluşturun."
                } else if (error.message.includes('Too many requests')) {
                    errorMessage = "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin."
                } else {
                    errorMessage = `${error.message || errorMessage} (Hata kodu: ${error.status || 'N/A'})`
                }

                setError(errorMessage)
                setLoading(false)
                return
            }

            // Giriş başarılı olduktan sonra email kontrolü tekrar yap
            if (data?.user?.email) {
                console.log('🔍 Final email check:', {
                    userEmail: data.user.email,
                    allowedEmail: allowedAdminEmail,
                    match: data.user.email.toLowerCase() === allowedAdminEmail?.toLowerCase()
                })
                
                if (allowedAdminEmail && data.user.email.toLowerCase() !== allowedAdminEmail.toLowerCase()) {
                    console.error('❌ Email mismatch - signing out')
                    await supabase.auth.signOut()
                    setError("Bu email adresi ile giriş yapılamaz.")
                    setLoading(false)
                    return
                }

                // Session varsa cookie'leri set et (Middleware için gerekli)
                if (data.session) {
                    const maxAge = 60 * 60 * 24 * 7 // 1 hafta
                    document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`
                    document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`
                }
            }

            console.log('✅ Login successful!', { 
                userEmail: data?.user?.email,
                hasSession: !!data?.session,
                accessToken: data?.session?.access_token ? 'exists' : 'missing'
            })
            
            // Session'ı kontrol et ve cookie'lere kaydet
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
            console.log('🔐 Session check:', { 
                hasSession: !!sessionData?.session,
                userEmail: sessionData?.session?.user?.email,
                error: sessionError
            })
            
            if (!sessionData?.session && !data?.session) {
                console.error('❌ No session after login! Waiting a bit...')
                // Biraz bekle ve tekrar dene
                await new Promise(resolve => setTimeout(resolve, 500))
                const { data: retrySession } = await supabase.auth.getSession()
                console.log('🔄 Retry session:', { hasSession: !!retrySession?.session })
                
                if (!retrySession?.session) {
                    setError("Session oluşturulamadı. Lütfen sayfayı yenileyip tekrar deneyin.")
                    setLoading(false)
                    return
                }
            }
            
            console.log('🚀 Redirecting to /admin/server-files-packages...')
            
            // Session'ın cookie'lere kaydedilmesi için kısa bir delay
            await new Promise(resolve => setTimeout(resolve, 500))
            
            // Router ile yönlendir (SPA navigation - sayfa yenilenmez)
            console.log('📍 Calling router.push...')
            router.push("/admin/server-files-packages")
            
            // Router.refresh() çağır (server component'leri yenile)
            router.refresh()
            
            console.log('✅ Navigation initiated')
        } catch (err: any) {
            // Bu catch bloğu artık sadece beklenmeyen hatalar için
            console.error('❌ Unexpected login error:', err)
            setError(err.message || "Giriş yapılırken beklenmeyen bir hata oluştu.")
        } finally {
            console.log('🏁 Login process finished')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative w-full max-w-md mx-4">
                {/* Login Card */}
                <div className="glass-card p-8 md:p-10 rounded-3xl border-white/10 shadow-2xl backdrop-blur-xl bg-zinc-900/80 space-y-8 relative overflow-hidden">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/50">
                                <Shield className="h-8 w-8" strokeWidth={2.5} />
                            </div>
                            <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-zinc-900 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-2">
                                Admin Girişi
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Güvenli admin paneline erişim için giriş yapın
                            </p>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 backdrop-blur-sm">
                            <XCircle className="h-4 w-4" />
                            <AlertDescription className="text-red-400">{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Reset Email Success Message */}
                    {resetSuccess && (
                        <Alert className="border-green-500/50 bg-green-500/10">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            <AlertDescription className="text-green-400">
                                Sıfırlama linki gönderildi! Lütfen email kutunuzu (spam dahil) kontrol edin. Linke tıklayarak yeni şifrenizi belirleyebilirsiniz.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Success Message from URL */}
                    {searchParams.get('password_reset') === 'success' && (
                        <Alert className="border-green-500/50 bg-green-500/10">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            <AlertDescription className="text-green-400">
                                Şifreniz başarıyla güncellendi. Yeni şifrenizle giriş yapabilirsiniz.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Login Form */}
                    {!isResetMode ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" />
                                    Email Adresi
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@msmyazilim.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-black/40 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 pl-4 pr-4 text-white placeholder:text-white/30"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-primary" />
                                        Şifre
                                    </Label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsResetMode(true)
                                            setError(null)
                                        }}
                                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Şifremi Unuttum?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-black/40 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 pl-4 pr-12 text-white placeholder:text-white/30"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                        disabled={loading}
                                    >
                                        {showPassword ? (
                                            <Lock className="h-5 w-5" />
                                        ) : (
                                            <Lock className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold shadow-lg shadow-primary/50 border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        Giriş yapılıyor...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="h-5 w-5 mr-2" />
                                        Giriş Yap
                                    </>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            {/* Reset Password Form */}
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200">
                                    <p>Şifre sıfırlama linki sadece yetkili admin hesabına (msmyazilim1@gmail.com) gönderilebilir.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reset-email" className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-primary" />
                                        Email Adresi
                                    </Label>
                                    <Input
                                        id="reset-email"
                                        type="email"
                                        placeholder="msmyazilim1@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-black/40 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 pl-4 pr-4 text-white placeholder:text-white/30"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold shadow-lg shadow-primary/50 border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="h-5 w-5 mr-2" />
                                        Sıfırlama Linki Gönder
                                    </>
                                )}
                            </Button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsResetMode(false)
                                    setError(null)
                                }}
                                className="w-full text-sm text-white/50 hover:text-white transition-colors"
                            >
                                Giriş Ekranına Dön
                            </button>
                        </form>
                    )}

                    {/* Footer Info */}
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-center text-white/40">
                            © {new Date().getFullYear()} MSM Yazılım - Tüm hakları saklıdır
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
                    <Shield className="h-3 w-3" />
                    <span>Güvenli SSL bağlantısı</span>
                </div>
            </div>
        </div>
    )
}
