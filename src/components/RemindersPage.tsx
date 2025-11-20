import { motion } from "motion/react";
import { Plus, Bell } from "lucide-react";
import { ReminderCard } from "./ReminderCard";

interface Reminder {
  id: string;
  text: string;
  time?: string;
}

interface RemindersPageProps {
  reminders: Reminder[];
  onAddReminder: () => void;
  onDeleteReminder: (id: string) => void;
}

export function RemindersPage({ reminders, onAddReminder, onDeleteReminder }: RemindersPageProps) {
  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 text-right">
        <h1 className="text-3xl text-foreground">تذكيرات</h1>
      </div>

      {/* Reminders list */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {reminders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لا توجد تذكيرات</p>
            <p className="text-sm text-muted-foreground mt-1">اضغط على الزر لإضافة تذكير جديد</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ReminderCard reminder={reminder} onDelete={onDeleteReminder} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddReminder}
        className="fixed left-6 bottom-24 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-10"
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
