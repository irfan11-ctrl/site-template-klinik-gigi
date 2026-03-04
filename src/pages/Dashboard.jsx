import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Plus, Globe, Settings, LogOut, ChevronRight } from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
            } else {
                setUser(user);
                fetchSites(user.id);
            }
        };
        checkUser();
    }, [navigate]);

    const fetchSites = async (userId) => {
        // Note: Table 'sites' will need to be created in Supabase
        const { data, error } = await supabase
            .from('sites')
            .select('*')
            .eq('user_id', userId);

        if (!error) setSites(data || []);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black mb-2">Dashboard</h1>
                        <p className="text-[var(--text-muted)]">Selamat datang, <span className="text-emerald-400">{user?.email}</span></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold text-sm"
                        >
                            <LogOut size={18} />
                            Keluar
                        </button>
                        <button
                            onClick={() => navigate('/editor/new')}
                            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                        >
                            <Plus size={20} />
                            Buat Site Baru
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 rounded-[2rem] glass animate-pulse" />
                        ))}
                    </div>
                ) : sites.length === 0 ? (
                    <div className="glass rounded-[3rem] p-20 text-center border-dashed border-2 border-white/5">
                        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <Globe size={40} />
                        </div>
                        <h2 className="text-2xl font-black mb-4">Belum Ada Website</h2>
                        <p className="text-[var(--text-muted)] max-w-md mx-auto mb-10">
                            Anda belum membuat website apapun. Mulai bangun kehadiran digital Anda hari ini dengan Elite Engine v4.0.
                        </p>
                        <button
                            onClick={() => navigate('/editor/new')}
                            className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black mx-auto shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
                        >
                            Buat Website Pertama Anda
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sites.map(site => (
                            <div key={site.id} className="group glass rounded-[2rem] p-8 border border-white/10 hover:border-emerald-500/30 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                                        <Globe size={24} />
                                    </div>
                                    <button className="text-white/30 hover:text-white transition-colors">
                                        <Settings size={20} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{site.name || 'Untitled Site'}</h3>
                                <p className="text-sm text-[var(--text-muted)] mb-8 truncate">
                                    {site.config?.meta?.description || 'No description provided.'}
                                </p>
                                <button
                                    onClick={() => navigate(`/editor/${site.id}`)}
                                    className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-white/5 group-hover:bg-emerald-500 group-hover:text-white font-bold transition-all"
                                >
                                    Edit Site
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
