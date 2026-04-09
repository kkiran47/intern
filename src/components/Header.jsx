import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export function Header({ currentMonth, onPrevMonth, onNextMonth }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
            <span className="text-xs font-black text-violet-500 tracking-[0.5em] uppercase mb-1 opacity-80">
                {format(currentMonth, "yyyy")}
            </span>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentMonth.toISOString()}
                    initial={{ opacity: 0, x: -20, filter: "blur(10px) brightness(2)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px) brightness(1)" }}
                    exit={{ opacity: 0, x: 20, filter: "blur(10px) brightness(0)" }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                >
                    <h2 className="text-6xl sm:text-7xl font-black text-white tracking-tighter mix-blend-difference">
                    {format(currentMonth, "MMMM")}
                    </h2>
                </motion.div>
            </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-3 p-1.5 bg-white/[0.03] backdrop-blur-3xl rounded-3xl border border-white/5 shadow-inner">
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrevMonth} 
          className="p-4 rounded-2xl text-white/40 hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <div className="w-[1px] h-8 bg-white/10" />

        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onNextMonth} 
          className="p-4 rounded-2xl text-white/40 hover:text-white transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}

