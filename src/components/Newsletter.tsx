import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, ArrowRight, Tag } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function Newsletter() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Subscribed! Coupon GREENSPRING (15% OFF) unlocked.');
    }
  };

  return (
    <section className="py-16 bg-[#2E7D32] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-amber-300">
            <Tag className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-xl mx-auto">
            Get 15% Off Your First Plant Order
          </h2>

          <p className="text-emerald-100 text-sm max-w-lg mx-auto">
            Subscribe to our weekly botanical journal for secret plant sales, repotting guides, and indoor plant care tips.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 p-4 rounded-2xl bg-white text-[#2E7D32] font-bold text-sm shadow-xl">
              <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" />
              <span>Use code <strong className="underline text-stone-900">GREENSPRING</strong> at checkout for 15% OFF!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-emerald-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Unlock 15% OFF</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
