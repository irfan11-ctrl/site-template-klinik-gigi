import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Layanan', href: '#services' },
        { name: 'Tentang', href: '#about' },
        { name: 'Kontak', href: '#contact' },
    ];

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className={`glass rounded-[2rem] px-8 py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl' : ''
                    }`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-xl">F</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg leading-none tracking-tight">Frisma</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#10b981] font-bold">Dental Care</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    {!isAuthPage && (
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                link.href.startsWith('#') ? (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm font-semibold hover:text-[#10b981] transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-sm font-semibold hover:text-[#10b981] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>
                    )}

                    {/* CTA Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-colors"
                        >
                            <User size={16} />
                            Masuk
                        </Link>
                        <Link to="/signup" className="btn-primary py-2 px-6 text-sm">
                            Mulai Sekarang
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-[var(--text-main)]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 p-6 pt-2"
                    >
                        <div className="glass rounded-[2rem] p-8 flex flex-col gap-6 shadow-2xl">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-bold hover:text-[#10b981] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/5" />
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 font-bold text-white/70 py-2"
                            >
                                <User size={18} />
                                Masuk
                            </Link>
                            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full justify-center">
                                Mulai Sekarang
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
