import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { TasksPage } from "./components/TasksPage";
import { RemindersPage } from "./components/RemindersPage";
import { SettingsPage } from "./components/SettingsPage";
import { AddTaskModal } from "./components/AddTaskModal";
import { AddReminderModal } from "./components/AddReminderModal";
import { BottomNav } from "./components/BottomNav";

interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  completed: boolean;
}

interface Reminder {
  id: string;
  text: string;
  time?: string;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<"tasks" | "reminders" | "settings">("tasks");
  const [darkMode, setDarkMode] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);

  // Sample data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "اجتماع الفريق الأسبوعي",
      description: "مناقشة تقدم المشروع والخطة القادمة",
      date: "2025-11-16",
      time: "10:00",
      completed: false,
    },
    {
      id: "2",
      title: "إنهاء تقرير المبيعات",
      description: "تجهيز التقرير الشهري للإدارة",
      date: "2025-11-17",
      time: "14:30",
      completed: false,
    },
    {
      id: "3",
      title: "مراجعة الكود البرمجي",
      date: "2025-11-15",
      time: "16:00",
      completed: true,
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      text: "شراء هدية عيد ميلاد أحمد",
      time: "18:00",
    },
    {
      id: "2",
      text: "الاتصال بالعميل الجديد للمتابعة",
      time: "15:30",
    },
    {
      id: "3",
      text: "تجديد اشتراك الخدمة السحابية",
    },
  ]);

  // Hide splash screen after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Apply font size
  useEffect(() => {
    const sizes = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };
    document.documentElement.style.setProperty("--font-size", sizes[fontSize]);
  }, [fontSize]);

  const handleAddTask = (taskData: { title: string; description: string; date: string; time: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddReminder = (reminderData: { text: string; time?: string }) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...reminderData,
    };
    setReminders([newReminder, ...reminders]);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="h-screen flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "tasks" && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <TasksPage
                tasks={tasks}
                onAddTask={() => setShowAddTaskModal(true)}
                onCompleteTask={handleCompleteTask}
                onDeleteTask={handleDeleteTask}
              />
            </motion.div>
          )}

          {activeTab === "reminders" && (
            <motion.div
              key="reminders"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <RemindersPage
                reminders={reminders}
                onAddReminder={() => setShowAddReminderModal(true)}
              />
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <SettingsPage
                darkMode={darkMode}
                notificationSound={notificationSound}
                fontSize={fontSize}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
                onToggleNotificationSound={() => setNotificationSound(!notificationSound)}
                onChangeFontSize={setFontSize}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onAdd={handleAddTask}
      />

      <AddReminderModal
        isOpen={showAddReminderModal}
        onClose={() => setShowAddReminderModal(false)}
        onAdd={handleAddReminder}
      />
    </div>
  );
}
