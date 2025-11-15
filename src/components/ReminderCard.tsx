import { motion } from "motion/react";
import { Bell } from "lucide-react";

interface ReminderCardProps {
  reminder: {
    id: string;
    text: string;
    time?: string;
  };
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-card rounded-3xl p-5 shadow-sm border border-border mb-3"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 text-right">
          <p className="text-card-foreground mb-2">{reminder.text}</p>
          {reminder.time && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bell className="w-4 h-4" />
              <span>{reminder.time}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
