import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
                <div className="cta-badge animate-pulse">✨ Unlimited Customization</div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-center">
                    Ready to Create Your
                    <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">Perfect AI Advisor?</span>
                </h2>
                <p className="text-base md:text-lg opacity-90 leading-relaxed text-center max-w-2xl">
                    Design a custom advisor tailored to your needs. Choose the voice, personality, expertise, and conversation style that works best for you.
                </p>
                
                <div className="grid grid-cols-3 gap-6 my-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl hover:scale-110 transition-transform">🎤</div>
                        <span className="text-sm font-medium">Custom Voice</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl hover:scale-110 transition-transform">🎭</div>
                        <span className="text-sm font-medium">Personality</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl hover:scale-110 transition-transform">🎯</div>
                        <span className="text-sm font-medium">Expertise</span>
                    </div>
                </div>
                
                <Link href="/companions/new" className="w-full max-w-md">
                    <button className="bg-white text-primary rounded-xl px-8 py-4 font-bold text-lg hover:bg-opacity-95 hover:scale-105 transition-all w-full flex items-center justify-center gap-3 shadow-2xl">
                        <Image src="/icons/plus.svg" alt="plus" width={20} height={20}/>
                        <span>Create Your Advisor Now</span>
                        <span className="text-2xl">→</span>
                    </button>
                </Link>
            </div>
        </section>
    )
}
export default Cta