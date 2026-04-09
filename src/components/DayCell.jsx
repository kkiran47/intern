import { useState } from "react";
import { format, isToday } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { cn } from "../lib/utils.js";

export function DayCell({ date, isCurrentMonth, isSelectedStart, isSelectedEnd, isInRange, isHoverRange, isWeekend, notePreview, onClick, onMouseEnter }) {
  const today = isToday(date);
  const isSelected = isSelectedStart || isSelectedEnd;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onClick={() => onClick(date)} 
      onMouseEnter={() => { onMouseEnter(date); setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05, 
        rotateX: 10,
        rotateY: -10,
        z: 20
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative flex items-center justify-center h-20 sm:h-24 w-full cursor-pointer group perspective-1000"
    >
      {/* Range Background */}
      {(isInRange || isHoverRange) && !isSelected && (
        <motion.div 
          layoutId="range"
          className="absolute inset-0 bg-violet-500/10 backdrop-blur-sm mx-[-2px] my-[2px] rounded-xl border border-violet-500/20" 
        />
      )}
      
      {/* Selection Backgrounds */}
      {isSelectedStart && (isInRange || isHoverRange || isSelectedEnd) && (
        <div className="absolute top-2 bottom-2 right-[-4px] w-[calc(50%+4px)] bg-violet-500/20 rounded-l-2xl" />
      )}
      {isSelectedEnd && (isSelectedStart || isInRange) && (
        <div className="absolute top-2 bottom-2 left-[-4px] w-[calc(50%+4px)] bg-violet-500/20 rounded-r-2xl" />
      )}

      {/* Main Selection Bubble */}
      {isSelected && (
        <motion.div 
          layoutId="selection"
          className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.5)] z-0" 
          initial={{ scale: 0, rotate: -45 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: "spring", stiffness: 500, damping: 30 }} 
        />
      )}

      {/* Hover Ring */}
      {!isSelected && isCurrentMonth && (
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-transparent group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-200 z-0" />
      )}

      {/* Date Number */}
      <span className={cn(
        "relative z-10 text-2xl font-black transition-all duration-200 tracking-tighter",
        !isCurrentMonth && "text-white/10",
        isCurrentMonth && !isWeekend && !today && !isSelected && "text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]",
        isCurrentMonth && isWeekend && !isSelected && "text-rose-500/80 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]",
        today && !isSelected && "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 font-black",
        isSelected && "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
      )}>
        {format(date, "d")}
      </span>

      {/* Indicators */}
      {today && !isSelected && (
        <motion.div 
          layoutId="today-indicator"
          className="absolute bottom-2 sm:bottom-3 w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_10px_#8b5cf6] z-10" 
        />
      )}
      
      {notePreview && !isSelected && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageSquareText className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          </motion.div>
        </div>
      )}

      {/* Note Tooltip */}
      <AnimatePresence>
        {isHovered && notePreview && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, y: -12, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.8, rotateX: 20 }}
            className="absolute bottom-full mb-4 w-64 p-5 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 pointer-events-none"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Planned Insight</span>
              <p className="text-sm font-medium text-white/90 leading-relaxed italic">
                "{notePreview}"
              </p>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/80 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

