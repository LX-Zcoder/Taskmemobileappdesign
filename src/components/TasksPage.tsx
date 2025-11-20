import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { DAYS, getCurrentDay } from "../utils/storage";

interface Task {
  id: string;
  title: string;
  description?: string;
  day: string;
  time: string;
  completed: boolean;
}

interface TasksPageProps {
  tasks: Task[];
  onAddTask: () => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  selectedDay: string | null;
  onDayChange: (day: string | null) => void;
}

export function TasksPage({ 
  tasks, 
  onAddTask, 
  onCompleteTask, 
  onDeleteTask, 
  onEditTask, 
  selectedDay,
  onDayChange 
}: TasksPageProps) {
  const currentDay = getCurrentDay();

  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 text-right">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-foreground">مهامي</h1>
          {tasks.length > 0 && (
            <div className="bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-primary font-semibold">{tasks.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Week Days Filter */}
      <div className="pb-4">
        {/* All Tasks Button */}
        <div className="px-6 mb-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDayChange(null)}
            className={`w-full py-3 rounded-2xl transition-all text-center ${
              selectedDay === null
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "bg-muted/30 text-muted-foreground border border-border hover:border-primary/50"
            }`}
          >
            كل المهام
          </motion.button>
        </div>

        {/* Days Scrollable Row */}
        <div className="px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2.5 pb-2" style={{ minWidth: 'min-content' }}>
            {DAYS.map((day) => (
              <motion.button
                key={day.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDayChange(day.id)}
                className={`px-6 py-4 rounded-2xl transition-all text-center whitespace-nowrap flex-shrink-0 ${
                  selectedDay === day.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : day.id === currentDay && selectedDay === null
                    ? "bg-accent text-accent-foreground border-2 border-primary"
                    : "bg-muted/30 text-muted-foreground border border-border hover:border-primary/50"
                }`}
              >
                <div className="text-sm font-medium">{day.nameAr}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Plus className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لا توجد مهام</p>
            <p className="text-sm text-muted-foreground mt-1">اضغط على الزر لإضافة مهمة جديدة</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TaskCard
                  task={task}
                  onComplete={onCompleteTask}
                  onDelete={onDeleteTask}
                  onEdit={onEditTask}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddTask}
        className="fixed left-6 bottom-24 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-10"
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
