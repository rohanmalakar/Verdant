import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, LockKeyhole, Mail, Sprout, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const success =
      mode === 'login'
        ? await login(email, password)
        : await signup(name, email, password);

    setIsSubmitting(false);

    if (success) {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-neutral-950 text-stone-900 dark:text-neutral-100 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#D9EAD3]/70 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-stretch">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-4xl bg-[#234f25] text-white p-8 sm:p-10 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,white,transparent_35%),radial-gradient(circle_at_bottom_right,#d9ead3,transparent_35%)]" />
          <div className="relative space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <Sprout className="w-8 h-8 text-[#D9EAD3]" />
            </div>

            <div className="space-y-3 max-w-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-100/70 font-semibold">
                Verdant Customer Access
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
                Sign in to your plant shop account.
              </h1>
              <p className="text-emerald-50/80 text-sm sm:text-base leading-6">
                Create a customer account, sign back in anytime, and keep your profile data in local storage on this device.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-3">
              {[
                'Saved customer profile on this browser',
                'Login with email and password',
                'Orders, wishlist, and profile stay available',
                'No admin access in this version'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 border border-white/10 p-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-[#D9EAD3]" />
                  </div>
                  <p className="text-sm text-white/90 leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-4xl bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8"
        >
          <div className="flex gap-2 p-1 rounded-2xl bg-stone-100 dark:bg-neutral-800 mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                mode === 'login'
                  ? 'bg-white dark:bg-neutral-700 text-[#2E7D32] dark:text-emerald-300 shadow-sm'
                  : 'text-stone-500 dark:text-neutral-400'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                mode === 'signup'
                  ? 'bg-white dark:bg-neutral-700 text-[#2E7D32] dark:text-emerald-300 shadow-sm'
                  : 'text-stone-500 dark:text-neutral-400'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-neutral-400">
                  Full Name
                </span>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    required
                  />
                </div>
              </label>
            )}

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-neutral-400">
                Email Address
              </span>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  required
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-neutral-400">
                Password
              </span>
              <div className="relative">
                <LockKeyhole className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  required
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#2E7D32] hover:bg-[#3f9142] text-white font-semibold py-3.5 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
            </button>

            <p className="text-xs text-stone-500 dark:text-neutral-400 text-center leading-6">
              Customer accounts only. Your login state and saved profile data stay in local storage on this device.
            </p>
          </form>
        </motion.section>
      </div>
    </div>
  );
}