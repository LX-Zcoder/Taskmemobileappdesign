import { motion } from "motion/react";
import { Bell, Trash2 } from "lucide-react";
import { useState } from "react";

interface ReminderCardProps {
  reminder: {
    id: string;
    text: string;
    time?: string;
  };
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, onDelete }: ReminderCardProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    
    // Swipe in any direction to delete
    if (Math.abs(info.offset.x) > 100) {
      if (window.confirm("هل تريد حذف هذا التذكير؟")) {
        onDelete(reminder.id);
      }
    }
    
    setDragX(0);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-3">
      {/* Delete indicator - Both sides */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <motion.div
          style={{ opacity: dragX > 50 ? Math.min((dragX - 50) / 50, 1) : 0 }}
          className="flex items-center gap-2 text-red-500"
        >
          <Trash2 className="w-6 h-6" />
          <span>حذف</span>
        </motion.div>
        
        <motion.div
          style={{ opacity: dragX < -50 ? Math.min((Math.abs(dragX) - 50) / 50, 1) : 0 }}
          className="flex items-center gap-2 text-red-500"
        >
          <span>حذف</span>
          <Trash2 className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Reminder card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDrag={(_, info) => {
          setDragX(info.offset.x);
          setIsDragging(true);
        }}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
        className="bg-card rounded-3xl p-5 shadow-sm border border-border cursor-grab active:cursor-grabbing relative"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 text-right">
            <p className="text-card-foreground mb-2">{reminder.text}</p>
            {reminder.time && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bell className="w-4 h-4" />
                <span>{reminder.time}</span>
              </div>
            )}
          </div>
          {/* Swipe hint icon */}
          <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0 opacity-50">
            <div className="text-xs">⇄</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}