/**
 * YouTube URL'lerini embed formatına çevirir
 * Farklı YouTube URL formatlarını destekler:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID (zaten doğru format)
 * - https://youtube.com/watch?v=VIDEO_ID
 */
export function convertToYouTubeEmbed(url: string | null | undefined): string | null {
    if (!url || typeof url !== 'string') {
        return null
    }

    // Trim whitespace
    url = url.trim()

    // Zaten embed formatındaysa olduğu gibi döndür
    if (url.includes('/embed/')) {
        // Eğer tam URL değilse, https:// ekle
        if (url.startsWith('/embed/')) {
            return `https://www.youtube.com${url}`
        }
        if (!url.startsWith('http')) {
            return `https://www.youtube.com/${url}`
        }
        return url
    }

    // Video ID'yi çıkar
    let videoId: string | null = null

    // Format 1: https://www.youtube.com/watch?v=VIDEO_ID veya https://youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (watchMatch && watchMatch[1]) {
        videoId = watchMatch[1]
    }

    // Format 2: https://youtu.be/VIDEO_ID (eğer ilk regex yakalamadıysa)
    if (!videoId) {
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
        if (shortMatch && shortMatch[1]) {
            videoId = shortMatch[1]
        }
    }

    // Format 3: Sadece video ID girilmişse (11 karakter)
    if (!videoId && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
        videoId = url
    }

    // Video ID bulunamadıysa null döndür
    if (!videoId) {
        console.warn('YouTube video ID could not be extracted from URL:', url)
        return null
    }

    // Embed URL'ini oluştur
    return `https://www.youtube.com/embed/${videoId}`
}
