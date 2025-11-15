import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Bell } from "lucide-react";
import { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: { title: string; description: string; date: string; time: string }) => void;
}

export function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && date && time) {
      onAdd({ title, description, date, time });
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
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
                <h2 className="text-xl text-card-foreground">مهمة جديدة</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    عنوان المهمة
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="أدخل عنوان المهمة"
                    className="w-full px-4 py-3 rounded-2xl bg-input-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    الوصف (اختياري)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="أدخل وصف المهمة"
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl bg-input-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    اختيار التاريخ
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-input-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    اختيار الوقت
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-input-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                {/* Alarm notice */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-accent/30 border border-accent">
                  <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    يتم ضبط تنبيه قبل ساعة و5 دقائق تلقائيًا
                  </p>
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all text-center"
                >
                  إضافة المهمة
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
