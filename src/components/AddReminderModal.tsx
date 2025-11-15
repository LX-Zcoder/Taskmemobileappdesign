import { motion, AnimatePresence } from "motion/react";
import { X, Clock } from "lucide-react";
import { useState } from "react";

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (reminder: { text: string; time?: string }) => void;
}

export function AddReminderModal({ isOpen, onClose, onAdd }: AddReminderModalProps) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [hasTime, setHasTime] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({ 
        text, 
        time: hasTime && time ? time : undefined 
      });
      setText("");
      setTime("");
      setHasTime(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
            dir="rtl"
          >
            <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl text-card-foreground">تذكير جديد</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Text */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    اكتب التذكير
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="أدخل نص التذكير"
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-input-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    required
                  />
                </div>

                {/* Time option toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <Clock className="w-4 h-4" />
                    <span>إضافة وقت للتنبيه</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setHasTime(!hasTime)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      hasTime ? 'bg-primary' : 'bg-switch-background'
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md ${
                        hasTime ? 'right-0.5' : 'right-6'
                      }`}
                    />
                  </button>
                </div>

                {/* Time picker (conditional) */}
                <AnimatePresence>
                  {hasTime && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-sm text-muted-foreground mb-2">
                        اختيار الوقت
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-input-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all text-center"
                >
                  إضافة التذكير
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
