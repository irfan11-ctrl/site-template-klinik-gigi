import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Generator } from '../core/generator';
import { LANDING_PAGE_PRESET } from '../core/presets/landing-page';
import { Save, ChevronLeft, Layout, Palette, Type, Download, Eye } from 'lucide-react';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function Editor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [config, setConfig] = useState(LANDING_PAGE_PRESET);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isUserPremium, setIsUserPremium] = useState(false);
    const [activeTab, setActiveTab] = useState('content');
    const iframeRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.is_premium) {
                setIsUserPremium(true);
                setConfig(prev => ({ ...prev, isPremium: true }));
            }

            if (id !== 'new') {
                await fetchSite();
            } else {
                setLoading(false);
            }
        };
        init();
    }, [id]);

    useEffect(() => {
        updatePreview();
    }, [config]);

    const fetchSite = async () => {
        const { data, error } = await supabase
            .from('sites')
            .select('*')
            .eq('id', id)
            .single();

        if (data && !error) {
            setConfig(data.config);
        }
        setLoading(false);
    };

    const updatePreview = () => {
        if (!iframeRef.current) return;
        const generator = new Generator(config);
        const files = generator.generate();

        const html = files['index.html'];
        const css = files['style.css'];
        const js = files['script.js'];

        const combinedDoc = html
            .replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`)
            .replace('<script src="script.js"></script>', `<script>${js}</script>`);

        iframeRef.current.srcdoc = combinedDoc;
    };

    const handleSave = async () => {
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (id === 'new') {
            const { data, error } = await supabase.from('sites').insert({
                user_id: user.id,
                name: config.meta.title,
                config: config
            }).select().single();

            if (data) navigate(`/editor/${data.id}`);
        } else {
            await supabase.from('sites').update({
                config: config,
                name: config.meta.title
            }).eq('id', id);
        }
        setSaving(false);
    };

    const handleExport = async () => {
        const generator = new Generator(config);
        const files = generator.generate();
        const zip = new JSZip();

        Object.keys(files).forEach(filename => {
            zip.file(filename, files[filename]);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${config.meta.title.toLowerCase().replace(/\s+/g, '-')}-source.zip`);
    };

    if (loading) return <div className="h-screen bg-[#020617] flex items-center justify-center font-black text-2xl">Loading Engine...</div>;

    return (
        <div className="h-screen bg-[#020617] flex flex-col">
            {/* Editor Header */}
            <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#020617] z-50">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-xl text-[var(--text-muted)] transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="font-black text-white text-lg leading-tight">{config.meta.title}</h1>
                        <p className="text-[10px] uppercase tracking-widest text-[#10b981] font-bold">Status: {isUserPremium ? 'Premium' : 'Trial'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl glass border border-white/10 text-sm font-bold hover:bg-white/5 transition-all text-white"
                    >
                        <Download size={18} />
                        Export ZIP
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Site'}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Controls */}
                <aside className="w-80 border-r border-white/10 flex flex-col bg-[#020617]">
                    <div className="flex border-b border-white/10">
                        {['content', 'style'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-white/40 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {activeTab === 'content' ? (
                            <>
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Layout size={14} /> Basic Info
                                    </h3>
                                    <div>
                                        <label className="text-xs font-bold text-white/60 mb-2 block">Site Title</label>
                                        <input
                                            type="text"
                                            value={config.meta.title}
                                            onChange={(e) => setConfig({ ...config, meta: { ...config.meta, title: e.target.value } })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {config.content.map((section, idx) => (
                                    <div key={idx} className="space-y-4 pt-6 border-t border-white/5">
                                        <h3 className="text-xs font-bold text-emerald-500/80 uppercase tracking-[0.2em]">{section.type} Section</h3>
                                        {section.data.headline !== undefined && (
                                            <div>
                                                <label className="text-xs font-bold text-white/60 mb-2 block">Headline</label>
                                                <textarea
                                                    value={section.data.headline}
                                                    onChange={(e) => {
                                                        const newContent = [...config.content];
                                                        newContent[idx].data.headline = e.target.value;
                                                        setConfig({ ...config, content: newContent });
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none h-24"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Palette size={14} /> Theme Colors
                                    </h3>
                                    <div>
                                        <label className="text-xs font-bold text-white/60 mb-2 block">Primary Color</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={config.meta.theme.primary}
                                                onChange={(e) => setConfig({ ...config, meta: { ...config.meta, theme: { ...config.meta.theme, primary: e.target.value } } })}
                                                className="w-12 h-12 bg-transparent border-none cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={config.meta.theme.primary}
                                                onChange={(e) => setConfig({ ...config, meta: { ...config.meta, theme: { ...config.meta.theme, primary: e.target.value } } })}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Live Preview Area */}
                <main className="flex-1 bg-[#050b18] p-12 relative flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                                preview.aether-engine.app/live-render
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 glass rounded-[2rem] overflow-hidden shadow-2xl relative">
                        <iframe
                            ref={iframeRef}
                            title="Preview"
                            className="w-full h-full bg-white"
                            sandbox="allow-scripts"
                        />

                        {/* Overlay for "Premium" feel */}
                        <div className="absolute top-6 right-6 px-4 py-2 rounded-full glass border border-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase tracking-tighter shadow-lg pointer-events-none">
                            Elite Preview Mode
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
