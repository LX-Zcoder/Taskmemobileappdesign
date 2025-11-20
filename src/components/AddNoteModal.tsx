import { motion, AnimatePresence } from "motion/react";
import { X, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import type { Note } from "./NotesPage";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, "id" | "createdAt">) => void;
  onDelete?: (id: string) => void;
  note?: Note | null;
}

const NOTE_COLORS = [
  { id: "yellow", bg: "bg-yellow-100", border: "border-yellow-300", active: "ring-yellow-400" },
  { id: "green", bg: "bg-green-100", border: "border-green-300", active: "ring-green-400" },
  { id: "blue", bg: "bg-blue-100", border: "border-blue-300", active: "ring-blue-400" },
  { id: "pink", bg: "bg-pink-100", border: "border-pink-300", active: "ring-pink-400" },
  { id: "purple", bg: "bg-purple-100", border: "border-purple-300", active: "ring-purple-400" },
];

export function AddNoteModal({ isOpen, onClose, onSave, onDelete, note }: AddNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [customColor, setCustomColor] = useState("#FFE082");
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedColor(note.color);
      // Check if it's a custom color (starts with #)
      if (note.color.startsWith('#')) {
        setCustomColor(note.color);
        setShowColorPicker(false);
      }
    } else {
      setTitle("");
      setContent("");
      setSelectedColor("yellow");
      setCustomColor("#FFE082");
      setShowColorPicker(false);
    }
  }, [note, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave({ title: title.trim(), content: content.trim(), color: selectedColor });
      setTitle("");
      setContent("");
      setSelectedColor("yellow");
      setCustomColor("#FFE082");
      setShowColorPicker(false);
      onClose();
    }
  };

  const handleDelete = () => {
    if (note && onDelete) {
      if (window.confirm("هل تريد حذف هذه الملاحظة؟")) {
        onDelete(note.id);
        onClose();
      }
    }
  };

  const handleCustomColorSelect = () => {
    setSelectedColor(customColor);
    setShowColorPicker(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="relative w-full max-w-md mx-4 bg-card rounded-3xl shadow-2xl max-h-[85vh] flex flex-col"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xl text-card-foreground">
              {note ? "تعديل الملاحظة" : "ملاحظة جديدة"}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {/* Title */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="العنوان (اختياري)"
                  className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-right text-card-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Content */}
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="اكتب ملاحظتك هنا..."
                  rows={8}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-right text-card-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">اللون:</label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {NOTE_COLORS.map((color) => (
                    <motion.button
                      key={color.id}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedColor(color.id);
                        setShowColorPicker(false);
                      }}
                      className={`w-12 h-12 rounded-full ${color.bg} ${color.border} border-2 transition-all ${
                        selectedColor === color.id && !selectedColor.startsWith('#') ? `ring-4 ${color.active}` : ""
                      }`}
                    />
                  ))}
                  
                  {/* Custom Color Button */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className={`w-12 h-12 rounded-full border-2 border-border transition-all flex items-center justify-center ${
                      selectedColor.startsWith('#') ? 'ring-4 ring-primary' : ''
                    }`}
                    style={{ 
                      backgroundColor: selectedColor.startsWith('#') ? selectedColor : customColor 
                    }}
                  >
                    <Palette className="w-5 h-5 text-white drop-shadow-md" />
                  </motion.button>
                </div>

                {/* Custom Color Picker Section */}
                <AnimatePresence>
                  {showColorPicker && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="bg-muted/20 rounded-2xl p-4 space-y-3">
                        <label className="block text-sm text-muted-foreground text-center">
                          اختر لون مخصص
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            className="w-16 h-16 rounded-xl border-2 border-border cursor-pointer"
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              value={customColor}
                              onChange={(e) => setCustomColor(e.target.value)}
                              placeholder="#FFE082"
                              className="w-full px-3 py-2 rounded-xl bg-background border border-border text-center text-card-foreground"
                            />
                          </div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCustomColorSelect}
                            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm whitespace-nowrap"
                          >
                            تطبيق
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-border flex gap-3">
              {note && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                >
                  حذف
                </motion.button>
              )}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-muted/30 text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                إلغاء
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!content.trim()}
                className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {note ? "تحديث" : "حفظ"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
