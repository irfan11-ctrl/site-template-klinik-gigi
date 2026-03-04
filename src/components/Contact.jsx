import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, CheckCircle } from 'lucide-react';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            // Reset after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="section-padding bg-slate-50 dark:bg-slate-950/50">
            <div className="container mx-auto px-6">
                <div className="glass rounded-[3rem] p-12 lg:p-20 overflow-hidden relative border-none shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
                                Konsultasikan <br />
                                <span className="text-gradient">Senyum Anda</span> Hari Ini
                            </h2>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Lokasi Utama</h4>
                                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                            Samratulangi Raya No 216, Walikota <br />
                                            Ruko Flobamora Mall, Kupang, NTT
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Jam Operasional</h4>
                                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                            Senin - Sabtu: 10.00 - 21.00 <br />
                                            Menerima Janji Temu Pagi & Sore
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Hubungi Kami</h4>
                                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                            Telepon: 0817-4988-525 <br />
                                            WhatsApp: +62 817-4988-525
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass flex items-center justify-center rounded-2xl hover:text-emerald-500 transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass flex items-center justify-center rounded-2xl hover:text-blue-600 transition-colors">
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="glass bg-white/20 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/30 relative">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <h3 className="text-2xl font-black mb-8">Kirim Pesan Cepat</h3>
                                        <form className="space-y-6" onSubmit={handleSubmit}>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Nama Lengkap</label>
                                                    <input required type="text" className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/20 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Masukkan nama..." />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">WhatsApp</label>
                                                    <input required type="tel" className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/20 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="08..." />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Layanan yang Diinginkan</label>
                                                <select className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/20 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                                                    <option>Pembersihan Karang Gigi</option>
                                                    <option>Penambalan Gigi</option>
                                                    <option>Behel Gigi</option>
                                                    <option>Lainnya</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Pesan</label>
                                                <textarea required className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/20 rounded-2xl p-4 h-32 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" placeholder="Tuliskan keluhan atau jadwal yang diinginkan..." />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="btn-primary w-full justify-center disabled:opacity-50"
                                            >
                                                {isLoading ? 'Mengirim...' : 'Daftar Sekarang'}
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="text-2xl font-black mb-4">Pesan Terkirim!</h3>
                                        <p className="text-[var(--text-muted)]">
                                            Terima kasih telah menghubungi kami. <br />
                                            Tim kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="mt-8 text-sm font-bold text-emerald-500 hover:underline"
                                        >
                                            Kirim Pesan Lain
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Abstract SVG Background */}
                    <svg className="absolute top-0 right-0 opacity-10 pointer-events-none" width="600" height="600" viewBox="0 0 600 600" fill="none">
                        <circle cx="450" cy="150" r="300" stroke="#10b981" strokeWidth="1" />
                        <circle cx="450" cy="150" r="200" stroke="#10b981" strokeWidth="1" />
                        <circle cx="450" cy="150" r="100" stroke="#10b981" strokeWidth="1" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
