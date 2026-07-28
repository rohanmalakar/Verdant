import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Sprout, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs print:hidden"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 p-8 text-left text-stone-800 print:shadow-none print:border-none print:w-full"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-200 print:hidden">
            <h3 className="font-serif font-bold text-lg text-[#2E7D32]">
              Official Tax Invoice
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="mt-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-[#2E7D32]">
                  <Sprout className="w-6 h-6" />
                  <span className="font-serif text-2xl font-bold">Verdant Botanical</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  100 Greenhouse Way, Botanical District, OR 97201 <br />
                  Tax ID: VRD-998214-US • support@verdant.com
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                  INVOICE PAID
                </span>
                <p className="text-xs font-bold text-stone-900">Order #{order.id}</p>
                <p className="text-[10px] text-stone-500">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 text-xs">
              <div>
                <p className="font-bold text-stone-400 uppercase tracking-wider text-[10px] mb-1">
                  Billed & Shipped To:
                </p>
                <p className="font-bold text-stone-900">{order.customerName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>

              <div>
                <p className="font-bold text-stone-400 uppercase tracking-wider text-[10px] mb-1">
                  Payment Details:
                </p>
                <p className="font-bold text-stone-900">{order.paymentMethod}</p>
                <p className="text-stone-500">Tracking: {order.trackingNumber}</p>
                <p className="text-stone-500">Status: {order.status}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-bold">
                  <th className="py-2">Botanical Item</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3">
                      <p className="font-bold text-stone-900">{item.plant.name}</p>
                      <p className="text-[10px] text-stone-400">{item.selectedSize || item.plant.size} Size</p>
                    </td>
                    <td className="py-3 text-center font-medium">{item.quantity}</td>
                    <td className="py-3 text-right">${item.plant.price}</td>
                    <td className="py-3 text-right font-bold">${item.plant.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Breakdown */}
            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <div className="w-48 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-${order.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Tax (8%)</span>
                  <span>${order.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-[#2E7D32]">
                  <span>Total Paid</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
