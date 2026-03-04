import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const phoneNumber = "628174988525";
    const message = "Halo Klinik Frisma Dental Care, saya ingin bertanya mengenai layanan perawatan gigi.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: 1,
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            className="fixed bottom-8 right-8 z-[100]"
        >
            <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />

            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    scale: 1.1,
                    boxShadow: "0 20px 25px -5px rgb(16 185 129 / 0.3), 0 8px 10px -6px rgb(16 185 129 / 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center gap-3 bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white p-4 rounded-full shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] group no-underline"
            >
                <div className="flex items-center justify-center w-8 h-8">
                    <MessageCircle size={32} fill="currentColor" className="text-white" />
                </div>

                <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold text-sm group-hover:max-w-xs transition-all duration-500 ease-in-out">
                    Hubungi Kami
                </span>

                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </div>
            </motion.a>
        </motion.div>
    );
}
