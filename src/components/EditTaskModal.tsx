import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, FileText, Bell } from "lucide-react";
import type { Task } from "../utils/storage";
import { DAYS, getCurrentDay, getTomorrowDay } from "../utils/storage";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Task>) => void;
  task: Task | null;
}

export function EditTaskModal({ isOpen, onClose, onSave, task }: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [time, setTime] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setSelectedDay(task.day);
      setTime(task.time);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && selectedDay && time && task) {
      onSave(task.id, {
        title,
        description,
        day: selectedDay,
        time,
      });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full bg-background rounded-t-[32px] shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-foreground">تعديل المهمة</h2>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    عنوان المهمة
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="أدخل عنوان المهمة"
                    className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:outline-none text-foreground transition-colors text-right"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    الوصف
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="أدخل وصف المهمة (اختياري)"
                    className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:outline-none text-foreground transition-colors min-h-[100px] resize-none text-right"
                  />
                </div>

                {/* Day Selection */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    اليوم
                  </label>
                  
                  {/* Quick Select */}
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDay(getCurrentDay())}
                      className="flex-1 py-2 rounded-xl bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all text-center text-sm"
                    >
                      اليوم
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDay(getTomorrowDay())}
                      className="flex-1 py-2 rounded-xl bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 transition-all text-center text-sm"
                    >
                      غداً
                    </button>
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {DAYS.map((day) => (
                      <motion.button
                        key={day.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDay(day.id)}
                        className={`py-2.5 rounded-xl border transition-all text-center text-sm ${
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
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    الوقت
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:outline-none text-foreground transition-colors"
                    required
                  />
                </div>

                {/* Alarm notice */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-accent/30 border border-accent">
                  <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    سيتم تذكيرك في الوقت المحدد
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-4 rounded-2xl bg-muted/30 text-foreground border border-border transition-all text-center"
                  >
                    إلغاء
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all text-center"
                  >
                    حفظ التعديلات
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
