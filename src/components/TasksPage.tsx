import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  completed: boolean;
}

interface TasksPageProps {
  tasks: Task[];
  onAddTask: () => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TasksPage({ tasks, onAddTask, onCompleteTask, onDeleteTask }: TasksPageProps) {
  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 text-right">
        <h1 className="text-3xl text-foreground">مهامي</h1>
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
