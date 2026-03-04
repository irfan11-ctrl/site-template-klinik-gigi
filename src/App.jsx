import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthForm from './components/auth/AuthForm';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import WhatsAppButton from './components/WhatsAppButton';

// Main Landing Page Component
const LandingPage = () => (
  <>
    <Hero />
    <Services />
    <section id="about" className="section-padding overflow-hidden relative">
      <div className="container mx-auto">
        <div className="glass rounded-[3rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-[#10b981] font-bold text-xs mb-6 uppercase tracking-widest">
              Sejarah & Visi
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
              Dedikasi untuk <br />
              <span className="text-gradient">Kesehatan Gigi</span> Anda
            </h2>
            <div className="space-y-6 text-lg text-[var(--text-muted)] leading-relaxed">
              <p>
                Klinik Gigi Frisma Dental Care didirikan dengan visi untuk memberikan akses perawatan gigi berkualitas tinggi yang dipadukan dengan kenyamanan modern bagi masyarakat Kupang.
              </p>
              <p>
                Kami percaya bahwa setiap pasien layak mendapatkan perhatian personal dan solusi medis yang akurat. Dengan tim dokter yang berpengalaman dan fasilitas pendukung terkini, kami siap membantu Anda meraih senyum sehat yang Anda impikan.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2">
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2680&auto=format&fit=crop" alt="Interior Klinik" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Contact />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<div className="pt-32 px-4"><AuthForm isSignUp={false} /></div>} />
            <Route path="/signup" element={<div className="pt-32 px-4"><AuthForm isSignUp={true} /></div>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
