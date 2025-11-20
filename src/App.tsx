import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { TasksPage } from "./components/TasksPage";
import { RemindersPage } from "./components/RemindersPage";
import { NotesPage } from "./components/NotesPage";
import { AddTaskModal } from "./components/AddTaskModal";
import { AddReminderModal } from "./components/AddReminderModal";
import { AddNoteModal } from "./components/AddNoteModal";
import { EditTaskModal } from "./components/EditTaskModal";
import { BottomNav } from "./components/BottomNav";
import { toast, Toaster } from "sonner@2.0.3";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask as deleteTaskFromStorage,
  completeTask,
  getReminders,
  addReminder,
  deleteReminder as deleteReminderFromStorage,
  getNotes,
  addNote,
  updateNote,
  deleteNote as deleteNoteFromStorage,
  getSettings,
  saveSettings,
  filterTasksByDay,
  type Task,
  type Reminder,
  type Note,
} from "./utils/storage";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<"tasks" | "reminders" | "notes">("tasks");
  
  // Load settings from localStorage
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  
  // Modals
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  // Data
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Initialize data from localStorage
  useEffect(() => {
    const loadedTasks = getTasks();
    const loadedReminders = getReminders();
    const loadedNotes = getNotes();
    const loadedSettings = getSettings();
    
    setTasks(loadedTasks);
    setReminders(loadedReminders);
    setNotes(loadedNotes);
    setDarkMode(loadedSettings.darkMode);
    setFontSize(loadedSettings.fontSize);

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error));
    }
  }, []);

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

  // Save settings whenever they change
  useEffect(() => {
    saveSettings({
      darkMode,
      notificationSound: true,
      fontSize,
      selectedTone: "default",
    });
  }, [darkMode, fontSize]);

  // Task handlers
  const handleAddTask = (taskData: { title: string; description: string; day: string; time: string }) => {
    const newTask = addTask({ ...taskData, completed: false });
    setTasks([newTask, ...tasks]);
    toast.success("تمت إضافة المهمة بنجاح", {
      position: "top-center",
      duration: 2000,
    });
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setEditingTask(task);
      setShowEditTaskModal(true);
    }
  };

  const handleSaveEditTask = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
    toast.success("تم تحديث المهمة بنجاح", {
      position: "top-center",
      duration: 2000,
    });
  };

  const handleCompleteTask = (id: string) => {
    completeTask(id);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: true } : task)));
    toast.success("تم إنجاز المهمة! 🎉", {
      position: "top-center",
      duration: 2000,
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTaskFromStorage(id);
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("تم حذف المهمة", {
      position: "top-center",
      duration: 2000,
    });
  };

  // Reminder handlers
  const handleAddReminder = (reminderData: { text: string; time?: string }) => {
    const newReminder = addReminder(reminderData);
    setReminders([newReminder, ...reminders]);
    toast.success("تمت إضافة التذكير بنجاح", {
      position: "top-center",
      duration: 2000,
    });
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminderFromStorage(id);
    setReminders(reminders.filter((reminder) => reminder.id !== id));
    toast.error("تم حذف التذكير", {
      position: "top-center",
      duration: 2000,
    });
  };

  // Note handlers
  const handleAddNote = (noteData: { title: string; content: string; color: string }) => {
    const newNote = addNote({ ...noteData, createdAt: new Date().toISOString() });
    setNotes([newNote, ...notes]);
    toast.success("تمت إضافة الملاحظة بنجاح", {
      position: "top-center",
      duration: 2000,
    });
  };

  const handleEditNote = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setEditingNote(note);
      setShowAddNoteModal(true);
    }
  };

  const handleSaveNote = (noteData: { title: string; content: string; color: string }) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      setNotes(notes.map((note) => (note.id === editingNote.id ? { ...note, ...noteData } : note)));
      toast.success("تم تحديث الملاحظة بنجاح", {
        position: "top-center",
        duration: 2000,
      });
      setEditingNote(null);
    } else {
      handleAddNote(noteData);
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteFromStorage(id);
    setNotes(notes.filter((note) => note.id !== id));
    toast.error("تم حذف الملاحظة", {
      position: "top-center",
      duration: 2000,
    });
  };

  // Filter tasks based on selected day
  const filteredTasks = filterTasksByDay(tasks, selectedDay);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="h-screen flex flex-col bg-background max-w-md mx-auto relative overflow-hidden">
      <Toaster richColors />
      
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
                tasks={filteredTasks}
                onAddTask={() => setShowAddTaskModal(true)}
                onCompleteTask={handleCompleteTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
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
                onDeleteReminder={handleDeleteReminder}
              />
            </motion.div>
          )}

          {activeTab === "notes" && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <NotesPage
                notes={notes}
                onAddNote={() => {
                  setEditingNote(null);
                  setShowAddNoteModal(true);
                }}
                onDeleteNote={handleDeleteNote}
                onEditNote={handleEditNote}
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

      <AddNoteModal
        isOpen={showAddNoteModal}
        onClose={() => {
          setShowAddNoteModal(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        note={editingNote}
      />

      <EditTaskModal
        isOpen={showEditTaskModal}
        onClose={() => {
          setShowEditTaskModal(false);
          setEditingTask(null);
        }}
        onSave={handleSaveEditTask}
        task={editingTask}
      />
    </div>
  );
}