'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ toasts }) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="toast-msg"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6a2c" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
