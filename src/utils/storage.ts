// Local Storage Manager for TaskMe App

export interface Task {
  id: string;
  title: string;
  description: string;
  day: string; // "saturday", "sunday", "monday", etc.
  time: string;
  completed: boolean;
  category?: string;
}

export interface Reminder {
  id: string;
  text: string;
  time?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: string;
}

export interface AppSettings {
  darkMode: boolean;
  notificationSound: boolean;
  fontSize: "small" | "medium" | "large";
  selectedTone: string;
  customToneFile?: string;
  customToneStartTime?: number;
  customToneEndTime?: number;
}

// Storage Keys
const TASKS_KEY = "taskme_tasks";
const REMINDERS_KEY = "taskme_reminders";
const NOTES_KEY = "taskme_notes";
const SETTINGS_KEY = "taskme_settings";

// Tasks Management
export const getTasks = (): Task[] => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

export const addTask = (task: Omit<Task, "id">): Task => {
  const tasks = getTasks();
  const newTask: Task = {
    ...task,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id: string, updates: Partial<Task>): void => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    saveTasks(tasks);
  }
};

export const deleteTask = (id: string): void => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter((t) => t.id !== id);
  saveTasks(filteredTasks);
};

export const completeTask = (id: string): void => {
  updateTask(id, { completed: true });
};

// Reminders Management
export const getReminders = (): Reminder[] => {
  try {
    const reminders = localStorage.getItem(REMINDERS_KEY);
    return reminders ? JSON.parse(reminders) : [];
  } catch (error) {
    console.error("Error loading reminders:", error);
    return [];
  }
};

export const saveReminders = (reminders: Reminder[]): void => {
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  } catch (error) {
    console.error("Error saving reminders:", error);
  }
};

export const addReminder = (reminder: Omit<Reminder, "id">): Reminder => {
  const reminders = getReminders();
  const newReminder: Reminder = {
    ...reminder,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  };
  reminders.push(newReminder);
  saveReminders(reminders);
  return newReminder;
};

export const deleteReminder = (id: string): void => {
  const reminders = getReminders();
  const filteredReminders = reminders.filter((r) => r.id !== id);
  saveReminders(filteredReminders);
};

// Notes Management
export const getNotes = (): Note[] => {
  try {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
};

export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
};

export const addNote = (note: Omit<Note, "id">): Note => {
  const notes = getNotes();
  const newNote: Note = {
    ...note,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  };
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
};

export const updateNote = (id: string, updates: Partial<Note>): void => {
  const notes = getNotes();
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...updates };
    saveNotes(notes);
  }
};

export const deleteNote = (id: string): void => {
  const notes = getNotes();
  const filteredNotes = notes.filter((n) => n.id !== id);
  saveNotes(filteredNotes);
};

// Settings Management
export const getSettings = (): AppSettings => {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings
      ? JSON.parse(settings)
      : {
          darkMode: true,
          notificationSound: true,
          fontSize: "medium",
          selectedTone: "default",
        };
  } catch (error) {
    console.error("Error loading settings:", error);
    return {
      darkMode: true,
      notificationSound: true,
      fontSize: "medium",
      selectedTone: "default",
    };
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings:", error);
  }
};

// Utility functions for day filtering
export const DAYS = [
  { id: "saturday", nameAr: "السبت", shortAr: "سبت" },
  { id: "sunday", nameAr: "الأحد", shortAr: "أحد" },
  { id: "monday", nameAr: "الاثنين", shortAr: "اثن" },
  { id: "tuesday", nameAr: "الثلاثاء", shortAr: "ثلا" },
  { id: "wednesday", nameAr: "الأربعاء", shortAr: "أرب" },
  { id: "thursday", nameAr: "الخميس", shortAr: "خمي" },
  { id: "friday", nameAr: "الجمعة", shortAr: "جمع" },
];

export const getCurrentDay = (): string => {
  const dayIndex = new Date().getDay();
  // Convert JS day (0=Sunday) to our format (0=Saturday)
  const mapping = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return mapping[dayIndex];
};

export const getTomorrowDay = (): string => {
  const currentDay = getCurrentDay();
  const currentIndex = DAYS.findIndex(d => d.id === currentDay);
  const nextIndex = (currentIndex + 1) % 7;
  return DAYS[nextIndex].id;
};

export const getDayNameAr = (dayId: string): string => {
  const day = DAYS.find(d => d.id === dayId);
  return day ? day.nameAr : dayId;
};

export const filterTasksByDay = (tasks: Task[], dayId: string | null): Task[] => {
  if (!dayId) {
    return tasks;
  }
  return tasks.filter((task) => task.day === dayId);
};