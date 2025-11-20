import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { DAYS, getCurrentDay } from "../utils/storage";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: { title: string; description: string; day: string; time: string }) => void;
}

export function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && selectedDay && time) {
      onAdd({ 
        title, 
        description, 
        day: selectedDay, 
        time
      });
      setTitle("");
      setDescription("");
      setSelectedDay(getCurrentDay());
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
            <div className="bg-card rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-center p-6 border-b border-border sticky top-0 bg-card z-10 relative">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors absolute right-6"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl text-card-foreground">إضافة المهمة</h2>
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

                {/* Day Selection */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    اختيار اليوم
                  </label>

                  {/* Days Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {DAYS.map((day) => (
                      <motion.button
                        key={day.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDay(day.id)}
                        className={`py-3 rounded-xl border transition-all text-center text-sm ${
                          selectedDay === day.id
                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                            : 'bg-muted/30 text-muted-foreground border-border hover:border-primary/50'
                        }`}
                      >
                        {day.shortAr}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    الوقت
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-input-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 rounded-2xl bg-muted/30 text-foreground border border-border hover:bg-muted/50 transition-all text-center"
                  >
                    إلغاء
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all text-center"
                  >
                    إضافة المهمة
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}