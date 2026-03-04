import { motion } from 'framer-motion';
import { Microscope, Activity, Gem, Layers, HeartPulse, Sparkles, ArrowRight } from 'lucide-react';

const services = [
    {
        title: 'Pembersihan Karang Gigi',
        desc: 'Layanan Scaling profesional untuk menjaga kesehatan gusi dan gigi tetap bersih.',
        icon: <Sparkles className="w-8 h-8" />,
        color: 'emerald'
    },
    {
        title: 'Penambalan Gigi estetik',
        desc: 'Sempurnakan struktur gigi yang rusak dengan bahan resin komposit sewarna gigi.',
        icon: <Gem className="w-8 h-8" />,
        color: 'sky'
    },
    {
        title: 'Behel / Orthodontics',
        desc: 'Wujudkan susunan gigi rapi untuk fungsional dan kepercayaan diri maksimal.',
        icon: <Layers className="w-8 h-8" />,
        color: 'indigo'
    },
    {
        title: 'Pencabutan Gigi',
        desc: 'Prosedur aman dan minim trauma untuk kondisi gigi yang sudah tidak dipertahankan.',
        icon: <HeartPulse className="w-8 h-8" />,
        color: 'red'
    },
    {
        title: 'Implan Gigi',
        desc: 'Solusi permanen menggantikan gigi yang hilang dengan teknologi terkini.',
        icon: <Microscope className="w-8 h-8" />,
        color: 'blue'
    },
    {
        title: 'Perawatan Akar Gigi',
        desc: 'Penyelamatan gigi dari infeksi saraf untuk menjaga fungsionalitas gigi asli.',
        icon: <Activity className="w-8 h-8" />,
        color: 'emerald'
    }
];

export default function Services() {
    return (
        <section id="services" className="section-padding relative">
            <div className="container mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-6"
                    >
                        Layanan <span className="text-gradient">Komprehensif</span> Kami
                    </motion.h2>
                    <p className="text-lg text-[var(--text-muted)] font-medium">
                        Kami menyediakan berbagai solusi kesehatan gigi dengan standar medis tertinggi untuk semua kelompok usia.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-premium group"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                                item.color === 'sky' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30' :
                                    item.color === 'indigo' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30' :
                                        item.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                            'bg-red-100 text-red-600 dark:bg-red-900/30'
                                }`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                                {item.desc}
                            </p>
                            <a href="#contact" className="text-sm font-bold text-[#10b981] flex items-center gap-2 group-hover:gap-4 transition-all">
                                Daftar Sekarang
                                <ArrowRight size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
