import { motion } from "motion/react";
import { CheckSquare } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-[#3D5AFE] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        {/* Glow effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-white rounded-full blur-3xl"
        />
        
        {/* App icon */}
        <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl">
          <CheckSquare className="w-20 h-20 text-[#3D5AFE]" strokeWidth={2} />
        </div>
        
        {/* App name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <h1 className="text-white text-3xl font-semibold tracking-wide">TaskMe</h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
