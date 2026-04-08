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
    <div 
      onClick={() => onClick(date)} 
      onMouseEnter={() => { onMouseEnter(date); setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center h-20 sm:h-24 w-full cursor-pointer group"
    >
      {(isInRange || isHoverRange) && !isSelected && (
        <div className="absolute inset-0 bg-white/[0.05] shadow-[0_0_20px_rgba(255,255,255,0.05)_inset] my-2 mx-[-4px] rounded-lg" />
      )}
      {isSelectedStart && (isInRange || isHoverRange || isSelectedEnd) && (
        <div className="absolute top-2 bottom-2 right-[-4px] w-[calc(50%+4px)] bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)] rounded-l-2xl" />
      )}
      {isSelectedEnd && (isSelectedStart || isInRange) && (
        <div className="absolute top-2 bottom-2 left-[-4px] w-[calc(50%+4px)] bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)] rounded-r-2xl" />
      )}
      {isSelected && (
        <motion.div 
          className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/30 z-0" 
          initial={{ scale: 0, rotate: -45 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: "spring", stiffness: 350, damping: 20 }} 
        />
      )}
      {!isSelected && isCurrentMonth && (
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-transparent group-hover:border-white/20 group-hover:bg-white/[0.03] transition-all duration-300 z-0" />
      )}
      <span className={cn(
        "relative z-10 text-2xl font-black transition-all duration-200",
        !isCurrentMonth && "text-white/20",
        isCurrentMonth && !isWeekend && !today && !isSelected && "text-white/70 group-hover:text-white drop-shadow-md",
        isCurrentMonth && isWeekend && !isSelected && "text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]",
        today && !isSelected && "text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] font-black",
        isSelected && "text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
      )}>
        {format(date, "d")}
      </span>
      {today && !isSelected && (
        <div className="absolute bottom-2 sm:bottom-3 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_10px_purple] z-10" />
      )}
      {notePreview && !isSelected && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <MessageSquareText className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>
      )}
      <AnimatePresence>
        {isHovered && notePreview && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: -10, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(5px)" }}
            className="absolute bottom-full mb-3 w-56 p-5 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 pointer-events-none"
          >
            <p className="text-sm font-bold text-white/90 line-clamp-3 leading-relaxed">
              {notePreview}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
