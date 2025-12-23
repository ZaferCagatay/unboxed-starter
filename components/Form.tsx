'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { TrendingUp } from 'lucide-react';

export default function ApplySection() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const followers = formData.get('followers')?.toString().trim();

    // Basic empty check
    for (let [_, value] of formData.entries()) {
      if (!value.toString().trim()) {
        toast.error('Lütfen tüm alanları doldurunuz.');
        return;
      }
    }

    // Numeric validation for followers
    if (!/^\d+$/.test(followers!)) {
      toast.error('Takipçi sayısı sadece rakamlardan oluşmalıdır.');
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success('Başvurun alındı! 🚀');
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="py-20 md:py-32 px-4 md:px-6 scroll-mt-20">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Erken Erişim Başvurusu</h2>
          <p className="text-slate-400">
            Şu anda sadece davetiye ile influencer kabul ediyoruz.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="first_name"
              maxLength={30}
              required
              className="input"
              placeholder="Adınız"
            />
            <input
              name="last_name"
              maxLength={30}
              required
              className="input"
              placeholder="Soyadınız"
            />
          </div>

          <input
            type="email"
            name="email"
            required
            maxLength={100}
            className="input"
            placeholder="E-posta Adresiniz"
          />

          <select name="platform" required className="input">
            <option value="">Lütfen bir platform seçiniz</option>
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
            <option value="Youtube">Youtube</option>
            <option value="Other">Diğer</option>
          </select>

          <input
            name="username"
            required
            maxLength={50}
            className="input"
            placeholder="Seçilen Platform Kullanıcı Adınız"
          />

          <input
            name="followers"
            required
            maxLength={10}
            inputMode="numeric"
            className="input"
            placeholder="Yaklaşık takipçi sayınız"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-4 bg-white text-black hover:bg-slate-200 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? 'Gönderiliyor...' : 'Başvuru Gönder'}
            <TrendingUp size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
