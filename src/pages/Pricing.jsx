import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
    const navigate = useNavigate();

    const plans = [
        {
            name: 'Starter',
            price: 'Free',
            features: ['1 Website', 'Standard Templates', 'WebBuilder Watermark', 'Community Support'],
            cta: 'Mulai Gratis',
            premium: false
        },
        {
            name: 'Pro',
            price: 'Rp 149.000',
            period: '/bulan',
            features: ['Unlimited Websites', 'Elite Templates', 'Hapus Watermark', 'Priority Support', 'Custom Domain'],
            cta: 'Upgrade ke Pro',
            premium: true,
            highlight: true
        },
        {
            name: 'Agency',
            price: 'Rp 499.000',
            period: '/bulan',
            features: ['Semua fitur Pro', 'Whitelabel Editor', 'Client Management', 'API Access', 'Dedicated Support'],
            cta: 'Pilih Agency',
            premium: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-black mb-6">Pilih Paket <span className="text-gradient">Terbaik</span> Anda</h1>
                <p className="text-[var(--text-muted)] max-w-2xl mx-auto mb-16 text-lg">
                    Bangun website profesional dengan kecepatan kilat. Upgrade untuk menghapus watermark dan membuka fitur eksklusif.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`glass rounded-[3rem] p-10 flex flex-col border transition-all hover:scale-105 ${plan.highlight ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10' : 'border-white/10'}`}
                        >
                            {plan.highlight && (
                                <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full self-center mb-6">
                                    Paling Populer
                                </div>
                            )}
                            <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                            <div className="mb-8">
                                <span className="text-4xl font-black">{plan.price}</span>
                                <span className="text-[var(--text-muted)] text-sm">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-12 flex-1 text-left">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <Check size={12} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigate(plan.premium ? '/checkout' : '/signup')}
                                className={`w-full py-4 rounded-2xl font-black transition-all active:scale-95 ${plan.highlight ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
