import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export function Header({ currentMonth, onPrevMonth, onNextMonth }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6">
      <div className="flex flex-col relative justify-center">
        <span className="text-xl md:text-2xl font-black text-rose-500/80 tracking-[0.4em] uppercase mb-1">
          {format(currentMonth, "yyyy")}
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth.toISOString()}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {format(currentMonth, "MMMM")}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex space-x-4 z-20 self-end sm:self-auto">
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevMonth} 
          className="p-4 rounded-2xl bg-white/[0.05] text-white/80 transition-all border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:text-rose-400 hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] backdrop-blur-md"
        >
          <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextMonth} 
          className="p-4 rounded-2xl bg-white/[0.05] text-white/80 transition-all border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:text-rose-400 hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] backdrop-blur-md"
        >
          <ChevronRight className="w-8 h-8 stroke-[2.5]" />
        </motion.button>
      </div>
    </div>
  );
}
