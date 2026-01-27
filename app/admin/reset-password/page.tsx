"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Loader2, CheckCircle2, XCircle, Shield, Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        // URL'den parametreleri al
        const hash = window.location.hash
        const code = searchParams.get('code')

        if (code) {
            // PKCE Flow: Code varsa session ile takas et
            console.log('Detected PKCE code, exchanging for session...')
            supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
                if (error) {
                    console.error('Code exchange error:', error)
                    setError("Link süresi dolmuş veya geçersiz. Lütfen tekrar deneyin.")
                } else {
                    console.log('Code exchanged, session active:', !!data.session)
                    // URL'i temizle
                    window.history.replaceState(null, '', window.location.pathname)
                }
            })
        }
        else if (hash) {
            // Implicit Flow: Hash varsa parse et
            const params = new URLSearchParams(hash.substring(1))
            const accessToken = params.get('access_token')
            const refreshToken = params.get('refresh_token')
            const type = params.get('type')

            console.log('Hash params:', { type, hasAccessToken: !!accessToken })

            if (type === 'recovery' && accessToken) {
                // Token'ı session'a kaydet
                supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken || ''
                }).then(({ error }) => {
                    if (error) {
                        console.error('Session error:', error)
                        setError("Token geçersiz veya süresi dolmuş. Lütfen yeni bir şifre sıfırlama linki isteyin.")
                    } else {
                        // Hash'i temizle
                        window.history.replaceState(null, '', window.location.pathname)
                        setError(null) // Hata mesajını temizle
                    }
                })
            } else if (type === 'recovery' && !accessToken) {
                setError("Geçersiz token. Lütfen email'inizdeki linki kullanın.")
            }
        } else if (!token && !code) {
            // Hash yok ve token yok ve code yok - muhtemelen direkt sayfaya gelmiş
            setError("Geçersiz veya eksik token. Lütfen email'inizdeki şifre sıfırlama linkini kullanın.")
        }
    }, [token, searchParams])

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password.length < 8) {
            setError("Şifre en az 8 karakter olmalıdır.")
            return
        }

        if (password !== confirmPassword) {
            setError("Şifreler eşleşmiyor.")
            return
        }

        setLoading(true)
        setError(null)

        try {
            // Session kontrolü yap
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()

            if (sessionError) {
                throw sessionError
            }

            if (!session) {
                throw new Error("Session bulunamadı. Lütfen email'inizdeki şifre sıfırlama linkini kullanın.")
            }

            // Session varsa direkt şifre güncelle
            const { error: resetError } = await supabase.auth.updateUser({
                password: password
            })

            if (resetError) {
                throw resetError
            }

            setSuccess(true)

            // 2 saniye sonra login sayfasına yönlendir
            setTimeout(() => {
                router.push('/admin/login?password_reset=success')
            }, 2000)
        } catch (err: any) {
            setError(err.message || "Şifre sıfırlama sırasında bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                <div className="relative w-full max-w-md mx-4">
                    <div className="glass-card p-8 md:p-10 rounded-3xl border-white/10 shadow-2xl backdrop-blur-xl bg-zinc-900/80 space-y-6 relative overflow-hidden">
                        {/* Top Gradient Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />

                        <div className="text-center space-y-4">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/50 mx-auto">
                                <CheckCircle2 className="h-8 w-8" strokeWidth={2.5} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                Şifre Başarıyla Güncellendi!
                            </h1>
                            <p className="text-gray-400">Yeni şifrenizle giriş yapabilirsiniz.</p>
                            <p className="text-sm text-gray-500">Yönlendiriliyorsunuz...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                {/* Reset Password Card */}
                <div className="glass-card p-8 md:p-10 rounded-3xl border-white/10 shadow-2xl backdrop-blur-xl bg-zinc-900/80 space-y-8 relative overflow-hidden">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-primary/50">
                                <Shield className="h-8 w-8" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-2">
                                Yeni Şifre Belirle
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Güçlü bir şifre seçin (en az 8 karakter)
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

                    {/* Reset Password Form */}
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        {/* New Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                <Lock className="h-4 w-4 text-primary" />
                                Yeni Şifre
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="bg-black/40 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 pl-4 pr-12 text-white placeholder:text-white/30"
                                    placeholder="En az 8 karakter"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-white/90 flex items-center gap-2">
                                <Lock className="h-4 w-4 text-primary" />
                                Şifreyi Tekrar Girin
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="bg-black/40 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12 pl-4 pr-12 text-white placeholder:text-white/30"
                                    placeholder="Şifreyi tekrar girin"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
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
                                    Güncelleniyor...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-5 w-5 mr-2" />
                                    Şifreyi Güncelle
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/10">
                        <div className="text-center">
                            <button
                                onClick={() => router.push('/admin/login')}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                ← Giriş sayfasına dön
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
                    <Shield className="h-3 w-3" />
                    <span>Güvenli şifre sıfırlama</span>
                </div>
            </div>
        </div>
    )
}
