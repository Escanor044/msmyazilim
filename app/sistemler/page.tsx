import { SystemsView } from "@/components/systems/systems-view"

export default function SystemsPage() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header Section (Image 1 Style) */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                        Sistem Çözümleri
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Sunucunuzu rakiplerinizden ayıracak modern, performanslı ve oyuncu dostu sistemler.
                    </p>
                </div>

                {/* Systems List Component */}
                <SystemsView />
            </div>
        </div>
    )
}
