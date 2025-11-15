import { motion } from "motion/react";
import { Moon, Volume2, Type } from "lucide-react";

interface SettingsPageProps {
  darkMode: boolean;
  notificationSound: boolean;
  fontSize: "small" | "medium" | "large";
  onToggleDarkMode: () => void;
  onToggleNotificationSound: () => void;
  onChangeFontSize: (size: "small" | "medium" | "large") => void;
}

export function SettingsPage({
  darkMode,
  notificationSound,
  fontSize,
  onToggleDarkMode,
  onToggleNotificationSound,
  onChangeFontSize,
}: SettingsPageProps) {
  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 text-right">
        <h1 className="text-3xl text-foreground">الإعدادات</h1>
      </div>

      {/* Settings list */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-3">
          {/* Dark Mode */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-card rounded-3xl p-5 shadow-sm border border-border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-card-foreground mb-1">الوضع الليلي</h3>
                  <p className="text-sm text-muted-foreground">تفعيل الوضع الداكن</p>
                </div>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  darkMode ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md ${
                    darkMode ? 'right-0.5' : 'right-7'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Notification Sound */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-card rounded-3xl p-5 shadow-sm border border-border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-card-foreground mb-1">صوت الإشعارات</h3>
                  <p className="text-sm text-muted-foreground">تفعيل الصوت للتنبيهات</p>
                </div>
              </div>
              <button
                onClick={onToggleNotificationSound}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notificationSound ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md ${
                    notificationSound ? 'right-0.5' : 'right-7'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Font Size */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-card rounded-3xl p-5 shadow-sm border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Type className="w-6 h-6 text-[#FF9800]" />
              </div>
              <div className="flex-1">
                <h3 className="text-card-foreground mb-1">حجم الخط</h3>
                <p className="text-sm text-muted-foreground mb-4">اختر حجم الخط المناسب</p>
                <div className="flex gap-2">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => onChangeFontSize(size)}
                      className={`flex-1 py-2.5 rounded-xl border transition-all text-center ${
                        fontSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-muted/30 text-muted-foreground border-border hover:border-primary/50'
                      }`}
                    >
                      {size === "small" && "صغير"}
                      {size === "medium" && "متوسط"}
                      {size === "large" && "كبير"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* App Info */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-card rounded-3xl p-5 shadow-sm border border-border mt-6"
          >
            <div className="text-center">
              <h3 className="text-card-foreground mb-2">TaskMe</h3>
              <p className="text-sm text-muted-foreground">الإصدار 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-2">
                تطبيق إدارة المهام بتصميم Material You
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
