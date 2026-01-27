/**
 * CLIENT-SIDE AUTH UTILITIES
 * Bu dosya client component'lerde kullanılabilir
 * next/headers kullanmaz - Server-side fonksiyonlar lib/auth-server.ts'de
 */

/**
 * Input sanitization - XSS koruması
 */
export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') return ''

    return input
        .replace(/[<>]/g, '') // < ve > karakterlerini kaldır
        .trim()
        .slice(0, 10000) // Max uzunluk
}

/**
 * HTML içeriği sanitize et - DOMPurify kullanır
 */
export function sanitizeHTML(html: string): string {
    if (typeof html !== 'string') return ''

    try {
        // Server-side için isomorphic-dompurify kullan
        if (typeof window === 'undefined') {
            const createDOMPurify = require('isomorphic-dompurify')
            const DOMPurify = createDOMPurify()
            
            if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
                return DOMPurify.sanitize(html, {
                    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 'b', 'i', 'ul', 'ol', 'li', 'a', 'br', 'hr', 'div', 'span'],
                    ALLOWED_ATTR: ['href', 'target', 'rel'],
                    ALLOW_DATA_ATTR: false,
                })
            }
        }

        // Client-side için DOMPurify kullan
        if (typeof window !== 'undefined') {
            const DOMPurify = require('dompurify')
            if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
                return DOMPurify.sanitize(html, {
                    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 'b', 'i', 'ul', 'ol', 'li', 'a', 'br', 'hr', 'div', 'span'],
                    ALLOWED_ATTR: ['href', 'target', 'rel'],
                    ALLOW_DATA_ATTR: false,
                })
            }
        }
    } catch (error) {
        // DOMPurify yüklenmemişse basit sanitization yap
        console.warn('DOMPurify not available, using basic sanitization:', error)
    }

    // Fallback: Basit sanitization
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/on\w+='[^']*'/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/data:/gi, '')
}

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Rate limiting için basit bir helper (memory-based)
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
    identifier: string,
    maxRequests: number = 10,
    windowMs: number = 60000 // 1 dakika
): boolean {
    const now = Date.now()
    const record = rateLimitMap.get(identifier)

    if (!record || now > record.resetTime) {
        rateLimitMap.set(identifier, {
            count: 1,
            resetTime: now + windowMs,
        })
        return true
    }

    if (record.count >= maxRequests) {
        return false
    }

    record.count++
    return true
}

/**
 * CSRF Token oluştur
 * Client ve server tarafında çalışır
 */
export function generateCSRFToken(): string {
    const array = new Uint8Array(32)
    
    // Browser'da Web Crypto API kullan
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(array)
    } 
    // Node.js'te crypto.randomBytes kullan (server-side)
    else if (typeof require !== 'undefined') {
        try {
            const crypto = require('crypto')
            const randomBytes = crypto.randomBytes(32)
            array.set(randomBytes)
        } catch {
            // Fallback: Math.random (güvenli değil ama çalışır)
            for (let i = 0; i < array.length; i++) {
                array[i] = Math.floor(Math.random() * 256)
            }
        }
    }
    // Fallback for older browsers
    else {
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256)
        }
    }
    
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * CSRF Token doğrula
 */
export function verifyCSRFToken(token: string, sessionToken: string | null): boolean {
    if (!token || !sessionToken) return false
    return token === sessionToken
}
