import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CreditCard, ShieldCheck, Zap } from 'lucide-react';

export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        setLoading(true);
        // Simulate payment processing
        setTimeout(async () => {
            const { data: { user } } = await supabase.auth.getUser();

            // In a real app, this would be handled by a webhook from Stripe/Midtrans
            // Here we simulate updating user metadata to reflect premium status
            await supabase.auth.updateUser({
                data: { is_premium: true }
            });

            alert('Pembayaran Berhasil! Akun Anda telah diupgrade ke PRO.');
            navigate('/dashboard');
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-40 pb-20">
            <div className="max-w-xl mx-auto px-6">
                <div className="glass rounded-[3rem] p-12 border border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-emerald-500/10">
                        <Zap size={120} />
                    </div>

                    <h2 className="text-3xl font-black mb-8">Selesaikan Pembayaran</h2>

                    <div className="space-y-6 mb-12">
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="text-[var(--text-muted)]">Plan</span>
                            <span className="font-bold">Pro Membership</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="text-[var(--text-muted)]">Durasi</span>
                            <span className="font-bold">1 Bulan</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-emerald-500/20">
                            <span className="text-xl font-black">Total</span>
                            <span className="text-3xl font-black text-emerald-500">Rp 149.000</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                'Memproses...'
                            ) : (
                                <>
                                    <CreditCard size={20} />
                                    Bayar Sekarang (Simulasi)
                                </>
                            )}
                        </button>
                        <p className="text-center text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-2">
                            <ShieldCheck size={12} />
                            Pembayaran aman & terenkripsi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
