'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Instagram,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  PackageCheck,
} from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ApplySection from '@/components/Form';

// --- Utility for cleaner tailwind classes ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Smooth Scroll Helper ---
const scrollToSection = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Components ---

const Navbar = () => (
  <motion.nav
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center border-b border-white/5 bg-slate-950/60 backdrop-blur-md"
  >
    <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
      {/* Logo Area */}
      <div
        onClick={(e) => scrollToSection(e, 'hero')}
        className="flex items-center gap-2 group cursor-pointer"
      >
        <div className="bg-blue-600/20 p-1.5 rounded-lg text-blue-500 group-hover:text-blue-400 group-hover:bg-blue-600/30 transition-colors">
          <Box size={20} strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Unboxed
        </span>
      </div>

      {/* Mobile-ready "Apply" button for Navbar */}
      <a
        href="#apply"
        onClick={(e) => scrollToSection(e, 'apply')}
        className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
      >
        Başvur
      </a>
    </div>
  </motion.nav>
);

// A sleek card with a subtle border gradient and hover effect
const BentoCard = ({ children, className, title, icon: Icon }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={cn(
      'group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 p-6 md:p-8 hover:border-blue-500/50 transition-colors duration-500',
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      {Icon && (
        <div className="mb-4 inline-flex p-3 rounded-2xl bg-blue-500/10 text-blue-400">
          <Icon size={24} />
        </div>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      )}
      <div className="text-slate-400 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </div>
  </motion.div>
);

const StepItem = ({ number, title, desc }: any) => (
  <div className="flex gap-4 md:gap-6 relative group">
    {/* Line connector */}
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] z-10 border border-blue-400 text-sm md:text-base">
        {number}
      </div>
      {/* Dynamic line height */}
      {number !== '5' && (
        <div className="w-0.5 h-full bg-slate-800 my-2 group-last:hidden" />
      )}
    </div>
    <div className="pb-12 pt-1">
      <h4 className="text-lg md:text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-slate-400 text-sm md:text-base leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

// --- Main Page ---

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  // Util
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen selection:bg-blue-500/30 overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND NOISE & GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[500px] bg-blue-600/20 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[400px] md:w-[800px] h-[600px] bg-purple-900/10 blur-[80px] md:blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-medium mb-8"
            >
              <Sparkles size={14} />
              <span>Influencer'lar için Erken Erişim</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 md:mb-8 leading-[1.1]"
            >
              İncelediğin ürünleri <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                güvenle nakite çevir
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 md:mt-6 text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed px-4"
            >
              <strong>Unbox</strong>, sadece kutusunu açtığın PR ürünlerini,
              video inceleme linkinle birlikte satışa sunabileceğin, doğrulanmış
              pazar yeridir.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0 w-full"
            >
              <a
                href="#apply"
                onClick={(e) => scrollToSection(e, 'apply')}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Influencer olarak başvur{' '}
                  <ArrowRight
                    size={20}
                    className={
                      isHovering ? 'translate-x-1 transition-transform' : ''
                    }
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-600" />
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className="w-full sm:w-auto px-8 py-4 text-slate-300 font-medium hover:text-white transition-colors text-center"
              >
                Nasıl çalışır?
              </a>
            </motion.div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center">
            {[
              { label: 'Doğrulanmış Ürün', val: '100%' },
              { label: 'Güvenli Ödeme', val: '7/24' },
              { label: 'Kargo Desteği', val: 'Tam' },
              { label: 'Komisyon', val: "%0'dan" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.val}
                </div>
                <div className="text-xs md:text-sm text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              PR ürünleri evde birikmesin
            </h2>
            <p className="text-slate-400 text-lg">
              DM'den satış yapmaya çalışmak yorucu ve risklidir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard
              title="Biriken Kargaşa"
              icon={Layers}
              className="md:col-span-2"
            >
              Markalardan gelen yüzlerce ürün zamanla evinizde yer kaplar.
              Bunları tek tek fotoğraflamak ve listelemek ciddi zaman kaybıdır.
            </BentoCard>
            <BentoCard
              title="Güven Sorunu"
              icon={ShieldCheck}
              className="bg-red-900/10 border-red-500/10 hover:border-red-500/30"
            >
              Alıcılar "sadece kutusu açıldı" söylemine her zaman güvenmez. DM
              üzerinden yapılan satışlarda iade ve dolandırılma riski yüksektir.
            </BentoCard>
            <BentoCard title="Operasyonel Yük" icon={PackageCheck}>
              Fiyat pazarlığı, IBAN paylaşımı, kargo takibi... İçerik üretmeye
              ayıracağınız vakti lojistiğe harcamayın.
            </BentoCard>
            <BentoCard
              title="Video Kanıtı"
              icon={Instagram}
              className="md:col-span-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
            >
              UnBoxed'da ürününüzü incelediğiniz videonuz (Reels/TikTok/YouTube)
              ürününüzün "sıfır ayarında" olduğunun en büyük kanıtıdır.
            </BentoCard>
          </div>
        </section>

        {/* SOLUTION - TIMELINE */}
        <section
          id="how-it-works"
          className="bg-slate-900/30 border-y border-white/5 py-20 md:py-32 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
              Süreç nasıl işliyor?
            </h2>

            <div className="pl-0 md:pl-0 mt-12">
              <StepItem
                number="1"
                title="İçeriğini Üret"
                desc="Ürün sana gelir, kutu açılışını veya incelemeni yapıp sosyal medyanda paylaşırsın."
              />
              <StepItem
                number="2"
                title="UnBoxed'a Gönder"
                desc="Satmak istediğin ürünü ücretsiz kargo koduyla depomuza gönderirsin."
              />
              <StepItem
                number="3"
                title="Ekspertiz & Fiyatlama"
                desc="Ekibimiz ürünü kontrol eder, videonla eşleştirir ve piyasa değerine göre fiyatlar."
              />
              <StepItem
                number="4"
                title="Yayına Alınır"
                desc="Ürün, inceleme videonla birlikte 'Influencer Onaylı' etiketiyle listelenir."
              />
              <StepItem
                number="5"
                title="Gelirini Al"
                desc="Ürün satıldığında, hizmet bedeli düşüldükten sonra ödemen hesabına yatar."
              />
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12">
                Neden UnBoxed?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 text-left max-w-3xl mx-auto">
                {[
                  "Alıcılarla DM'den muhatap olmazsın",
                  'Videon, ürünün garantisi olur',
                  'Kargo ve iade süreçlerini biz yönetiriz',
                  'Ekstra gelir modeli oluşturursun',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start md:items-center gap-4 text-white/90 text-lg font-medium"
                  >
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-md flex-shrink-0">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <ApplySection />

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-12 text-center text-slate-600 text-sm">
          <p>&copy; 2024 UnBoxed Inc. İstanbul.</p>
        </footer>
      </div>
    </main>
  );
}
