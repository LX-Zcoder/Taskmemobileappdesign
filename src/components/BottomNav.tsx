import { motion } from "motion/react";
import { CheckSquare, Bell, Settings } from "lucide-react";

interface BottomNavProps {
  activeTab: "tasks" | "reminders" | "settings";
  onTabChange: (tab: "tasks" | "reminders" | "settings") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "tasks" as const, icon: CheckSquare, label: "المهام" },
    { id: "reminders" as const, icon: Bell, label: "التذكيرات" },
    { id: "settings" as const, icon: Settings, label: "الإعدادات" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-20" dir="rtl">
      <div className="flex items-center justify-around px-2 py-3 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-2xl"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`w-6 h-6 relative z-10 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs relative z-10 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
