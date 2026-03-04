import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section id="home" className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full -ml-64 -mb-64" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-[#10b981]/20 text-[#10b981] font-bold text-sm mb-6">
                        <ShieldCheck size={16} />
                        <span>Klinik Gigi Terpercaya di Kupang</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8">
                        Senyum Sempurna <br />
                        Dimulai Dari <br />
                        <span className="text-gradient">Perawatan Terbaik</span>
                    </h1>

                    <p className="text-lg text-[var(--text-muted)] mb-10 max-w-lg leading-relaxed">
                        Klinik Gigi Frisma Dental Care menghadirkan standar baru perawatan gigi di Kupang dengan teknologi modern dan kenyamanan pasien sebagai prioritas utama.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#services" className="btn-primary">
                            Mulai Perawatan Kami
                            <ArrowRight size={20} />
                        </a>
                        <a href="#about" className="btn-outline">
                            Kenali Klinik Kami
                            <Sparkles size={18} />
                        </a>
                    </div>

                    <div className="mt-12 flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-3xl font-black">10+</span>
                            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">Tahun Pengalaman</span>
                        </div>
                        <div className="w-px h-12 bg-[var(--glass-border)]" />
                        <div className="flex flex-col">
                            <span className="text-3xl font-black">5000+</span>
                            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">Pasien Puas</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "backOut" }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50 dark:border-slate-800/50">
                        <img
                            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2670&auto=format&fit=crop"
                            alt="Frisma Dental Care"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating badges */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-6 -right-6 glass p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Calendar size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">Mudah & Cepat</span>
                            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-tighter">Booking Online Aktif</span>
                        </div>
                    </motion.div>

                    <div className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 max-w-[240px]">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="avatar" />
                                </div>
                            ))}
                        </div>
                        <span className="text-xs font-bold leading-tight">Dipercayai oleh Ribuan Warga Kupang</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
