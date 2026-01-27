/**
 * Logging ve Monitoring Helper
 * Admin işlemlerini ve şüpheli aktiviteleri loglar
 */

export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    SECURITY = 'security',
}

export interface LogEntry {
    timestamp: string
    level: LogLevel
    message: string
    userId?: string
    email?: string
    ip?: string
    userAgent?: string
    action?: string
    metadata?: Record<string, any>
}

/**
 * Log kaydet (memory-based, production'da database veya external service kullanılmalı)
 */
const logs: LogEntry[] = []
const MAX_LOGS = 1000 // Son 1000 log'u tut

export function log(entry: Omit<LogEntry, 'timestamp'>) {
    const logEntry: LogEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
    }

    logs.push(logEntry)

    // Max log sayısını aşarsa eski log'ları sil
    if (logs.length > MAX_LOGS) {
        logs.shift()
    }

    // Console'a yazdır (production'da external service'e gönder)
    const logMessage = `[${logEntry.level.toUpperCase()}] ${logEntry.timestamp} - ${logEntry.message}`
    
    switch (logEntry.level) {
        case LogLevel.ERROR:
        case LogLevel.SECURITY:
            console.error(logMessage, logEntry.metadata || '')
            break
        case LogLevel.WARN:
            console.warn(logMessage, logEntry.metadata || '')
            break
        default:
            console.log(logMessage, logEntry.metadata || '')
    }

    // Production'da burada external logging service'e gönder
    // Örnek: Sentry, LogRocket, CloudWatch, vb.
    if (process.env.NODE_ENV === 'production') {
        // sendToExternalService(logEntry)
    }
}

/**
 * Admin işlemi logla
 */
export function logAdminAction(
    action: string,
    userId: string,
    email: string,
    metadata?: Record<string, any>
) {
    log({
        level: LogLevel.INFO,
        message: `Admin action: ${action}`,
        userId,
        email,
        action,
        metadata,
    })
}

/**
 * Failed login attempt logla
 */
export function logFailedLogin(
    email: string,
    ip?: string,
    userAgent?: string,
    reason?: string
) {
    log({
        level: LogLevel.SECURITY,
        message: `Failed login attempt: ${email}`,
        email,
        ip,
        userAgent,
        action: 'login_failed',
        metadata: { reason },
    })
}

/**
 * Şüpheli aktivite logla
 */
export function logSuspiciousActivity(
    message: string,
    userId?: string,
    email?: string,
    ip?: string,
    metadata?: Record<string, any>
) {
    log({
        level: LogLevel.SECURITY,
        message: `Suspicious activity: ${message}`,
        userId,
        email,
        ip,
        action: 'suspicious_activity',
        metadata,
    })
}

/**
 * Error logla
 */
export function logError(
    message: string,
    error: Error | unknown,
    userId?: string,
    metadata?: Record<string, any>
) {
    log({
        level: LogLevel.ERROR,
        message,
        userId,
        action: 'error',
        metadata: {
            ...metadata,
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        },
    })
}

/**
 * Log'ları getir (admin panel için)
 */
export function getLogs(limit: number = 100): LogEntry[] {
    return logs.slice(-limit).reverse()
}

/**
 * Security log'larını getir
 */
export function getSecurityLogs(limit: number = 50): LogEntry[] {
    return logs
        .filter(log => log.level === LogLevel.SECURITY)
        .slice(-limit)
        .reverse()
}

/**
 * Son X dakika içindeki failed login attempt'leri say
 */
export function getFailedLoginCount(email: string, minutes: number = 5): number {
    const cutoffTime = new Date(Date.now() - minutes * 60 * 1000)
    
    return logs.filter(log => 
        log.action === 'login_failed' &&
        log.email === email &&
        new Date(log.timestamp) > cutoffTime
    ).length
}
