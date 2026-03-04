import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ isSignUp = false }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = isSignUp
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md w-full mx-auto p-8 rounded-[2rem] glass border border-white/10">
            <h2 className="text-3xl font-black mb-8 text-gradient text-center">
                {isSignUp ? 'Buat Akun Baru' : 'Selamat Datang Kembali'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold mb-2 text-[var(--text-muted)] uppercase tracking-widest">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="nama@email.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2 text-[var(--text-muted)] uppercase tracking-widest">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

                <button
                    disabled={loading}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                    {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
                </button>
            </form>

            <p className="mt-8 text-center text-[var(--text-muted)]">
                {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}
                <button
                    onClick={() => navigate(isSignUp ? '/login' : '/signup')}
                    className="ml-2 text-emerald-400 font-bold hover:underline"
                >
                    {isSignUp ? 'Login di sini' : 'Daftar sekarang'}
                </button>
            </p>
        </div>
    );
}
