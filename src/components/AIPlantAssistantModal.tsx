import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Bot, User as UserIcon, RefreshCw, Sprout } from 'lucide-react';

interface AIPlantAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export function AIPlantAssistantModal({ isOpen, onClose }: AIPlantAssistantModalProps) {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I'm **Sprout**, your AI Botanical Care Doctor. Ask me anything about yellowing leaves, lighting requirements, repotting, or pet-safe plant suggestions!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgText = input.trim();
    setInput('');

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/plant-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: userMsgText })
      });
      const data = await res.json();

      const aiReplyText =
        data.reply ||
        'Yellowing leaves are usually caused by overwatering or uneven drainage. Let the top 2 inches of soil dry completely before watering again!';

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: '🌿 *Plant Doctor Tip*: Ensure your plant pot has drainage holes at the bottom and receives bright indirect sunlight!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Why are my Monstera leaves turn yellow?',
    'Best low-light plants for a dark bedroom?',
    'How often should I water succulents in winter?',
    'Top pet-safe plants for cats?'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-stone-200 dark:border-neutral-700 overflow-hidden z-10 flex flex-col h-[600px] max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-4 bg-[#2E7D32] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-left">
                <h3 className="font-serif font-bold text-base flex items-center gap-2">
                  <span>Sprout AI Botanical Doctor</span>
                </h3>
                <p className="text-[10px] text-emerald-100">Powered by Gemini 3.6 • Instant Care Remedies</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-left bg-stone-50 dark:bg-neutral-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-stone-800 text-white'
                      : 'bg-[#2E7D32] text-white'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <UserIcon className="w-4 h-4" />
                  ) : (
                    <Sprout className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2E7D32] text-white rounded-tr-none'
                        : 'bg-white dark:bg-neutral-800 text-stone-800 dark:text-neutral-100 shadow-sm border border-stone-200 dark:border-neutral-700 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-stone-400 mt-1 block px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium p-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#2E7D32]" />
                <span>Analyzing plant diagnosis with Gemini...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-stone-100 dark:bg-neutral-800/80 border-t border-stone-200/80 dark:border-neutral-700 overflow-x-auto flex gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInput(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white dark:bg-neutral-700 text-stone-700 dark:text-neutral-200 hover:bg-[#D9EAD3] border border-stone-200/80 dark:border-neutral-600 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white dark:bg-neutral-800 border-t border-stone-200 dark:border-neutral-700 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your plant condition or ask for advice..."
              className="flex-1 px-4 py-2.5 text-xs rounded-full bg-stone-100 dark:bg-neutral-900 text-stone-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-full bg-[#2E7D32] hover:bg-[#4CAF50] text-white disabled:opacity-50 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
