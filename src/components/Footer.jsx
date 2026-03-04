import { MapPin, Phone, Instagram, Facebook, Mail, Shield } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-black text-xl">F</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-lg leading-none tracking-tight text-white">Frisma</span>
                                <span className="text-[10px] uppercase tracking-widest text-[#10b981] font-bold">Dental Care</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            Pelayanan kesehatan gigi modern dan terpercaya di Kupang, NTT. Kami berkomitmen memberikan senyum terbaik bagi Anda dan keluarga.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Layanan Populer</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#services" className="hover:text-emerald-500 transition-colors">Pembersihan Karang</a></li>
                            <li><a href="#services" className="hover:text-emerald-500 transition-colors">Penambalan Gigi</a></li>
                            <li><a href="#services" className="hover:text-emerald-500 transition-colors">Pasang Behel (Ortho)</a></li>
                            <li><a href="#services" className="hover:text-emerald-500 transition-colors">Pencabutan Gigi</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Info Praktis</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Tentang Klinik</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Jadwal Praktik</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Testimoni Pasien</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Blog Kesehatan</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Kontak Langsung</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-emerald-500 shrink-0" />
                                <span>Samratulangi Raya No 216, Kupang</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-emerald-500 shrink-0" />
                                <span>0817-4988-525</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-emerald-500 shrink-0" />
                                <span>frisma@dentalcare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="h-px bg-slate-800 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} Klinik Gigi Frisma Dental Care. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
