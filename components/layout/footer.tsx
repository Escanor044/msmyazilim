import Link from "next/link"
import { ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black/40 border-t border-white/5 pt-16 pb-8">
            <div className="container-width">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-lg">MSM<span className="text-primary">Yazılım</span></span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Metin2 sunucularınız için profesyonel files, sistem ve altyapı çözümleri.
                            Güvenilir, güncel ve performans odaklı hizmetler.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Hızlı Erişim</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/files" className="hover:text-primary transition-colors">Server Files Paketleri</Link></li>
                            <li><Link href="/sistemler" className="hover:text-primary transition-colors">Sistem Çözümleri</Link></li>
                            <li><Link href="/referanslar" className="hover:text-primary transition-colors">Referanslarımız</Link></li>
                            <li><Link href="/sss" className="hover:text-primary transition-colors">Sıkça Sorulan Sorular</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Kurumsal</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/gizlilik" className="hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
                            <li><Link href="/kvkk" className="hover:text-primary transition-colors">KVKK Aydınlatma</Link></li>
                            <li><Link href="/satis-sozlesmesi" className="hover:text-primary transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
                            <li><Link href="/iade" className="hover:text-primary transition-colors">İade ve İptal Koşulları</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">İletişim</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground/60">E-Posta</div>
                                    <a href="mailto:destek@msmyazilim.com" className="hover:text-white">destek@msmyazilim.com</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground/60">WhatsApp</div>
                                    <a href="https://wa.me/905551404633" target="_blank" className="hover:text-white">+90 555 140 46 33</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} MSMYazılım. Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-muted-foreground hover:text-[#5865F2] transition-colors" aria-label="Discord" title="Files Store 📝┊ekli-sistemler┊❗❗❗">
                            <svg className="h-5 w-5" viewBox="0 0 127.14 96.36" fill="currentColor">
                                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.82,105.82,0,0,0,126.6,80.22c2.36-24.44-5.42-48.18-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.32-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                            </svg>
                        </a>
                        <a href="https://wa.me/905551404633" target="_blank" className="text-muted-foreground hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c1.005.572 1.903.887 3.059.887 3.204 0 5.801-2.586 5.802-5.766.001-3.18-2.58-5.769-6.055-5.768zm7.329 12.308c-1.399 2.083-3.693 3.619-6.277 3.619-4.839 0-8.835-3.565-9.389-8.156l-.281-2.298-2.316-.279c-4.593-.553-8.161-4.547-8.161-9.388 0-5.325 4.316-9.643 9.641-9.643 4.841 0 8.837 3.564 9.39 8.155l.28 2.298 2.318.279c4.591.554 8.16 4.547 8.16 9.388 0 2.584-1.536 4.877-3.365 6.025z" />
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
