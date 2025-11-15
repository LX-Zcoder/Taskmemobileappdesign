import { motion } from "motion/react";
import { Clock, CheckCircle2, Trash2, Calendar } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    date: string;
    time: string;
    completed: boolean;
  };
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    
    // Right swipe (for RTL, this is negative values) - complete
    if (info.offset.x < -100) {
      onComplete(task.id);
    }
    // Left swipe (for RTL, this is positive values) - delete
    else if (info.offset.x > 100) {
      onDelete(task.id);
    }
    
    setDragX(0);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-3">
      {/* Action indicators */}
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
          className="flex items-center gap-2 text-green-500"
        >
          <span>تم</span>
          <CheckCircle2 className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Task card */}
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
          <div className="flex-1 min-w-0 text-right">
            <h3 className={`mb-2 ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{task.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{task.time}</span>
              </div>
            </div>
          </div>
          
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
