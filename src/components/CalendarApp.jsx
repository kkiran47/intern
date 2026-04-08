import { useState, useEffect } from "react";
import { format, addMonths, subMonths, isBefore } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./Header.jsx";
import { CalendarGrid } from "./CalendarGrid.jsx";
import { NotesPanel } from "./NotesPanel.jsx";
import { HeroPanel } from "./HeroPanel.jsx";

export function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [direction, setDirection] = useState(0);
  const [allNotes, setAllNotes] = useState({});

  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar_notes");
    if (savedNotes) {
      try {
        setAllNotes(JSON.parse(savedNotes));
      } catch (e) { }
    }
  }, []);

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date) => {
    if (startDate && endDate) {
      setStartDate(null);
      setEndDate(null);
    } else if (!startDate) {
      setStartDate(date);
    } else {
      if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const syncNotes = (newNotes) => {
    setAllNotes(newNotes);
    localStorage.setItem("calendar_notes", JSON.stringify(newNotes));
  };

  let notesKey = `month_${format(currentMonth, "yyyy-MM")}`;
  let notesTitle = `Notes for ${format(currentMonth, "MMMM yyyy")}`;

  if (startDate && endDate) {
    notesKey = `range_${format(startDate, "yyyy-MM-dd")}_${format(endDate, "yyyy-MM-dd")}`;
    notesTitle = `Plans for ${format(startDate, "MMM do")} - ${format(endDate, "MMM do")}`;
  } else if (startDate) {
    notesKey = `day_${format(startDate, "yyyy-MM-dd")}`;
    notesTitle = `Notes for ${format(startDate, "MMMM do, yyyy")}`;
  }

  const tearingVariants = {
    enter: (dir) => {
      if (dir > 0) {
        return {
          opacity: 0,
          scale: 0.95,
          y: 0,
          rotateZ: 0,
          rotateX: 0,
          filter: "blur(4px)",
        };
      } else {

        return {
          opacity: 0,
          y: -300,
          rotateZ: 8,
          scale: 1.05,
          filter: "blur(2px)",
        };
      }
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateZ: 0,
      rotateX: 0,
      filter: "blur(0px)",
    },
    exit: (dir) => {
      if (dir > 0) {
        // Tearing off current month
        return {
          opacity: 0,
          y: 500,
          rotateZ: -12,
          rotateX: 30,
          scale: 0.9,
          filter: "blur(4px)",
        };
      } else {
        // Pushing current month back under
        return {
          opacity: 0,
          scale: 0.95,
          y: 20,
          filter: "blur(2px)",
        };
      }
    },
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#030303] flex items-center justify-center p-4 sm:p-8 overflow-hidden font-sans">
      {/* Dynamic Ambient Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/30 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], x: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-rose-600/20 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="relative w-full max-w-[1400px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Bento: Hero Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="lg:col-span-4 h-full min-h-[400px] lg:min-h-[850px] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative group"
        >
          <HeroPanel monthIndex={currentMonth.getMonth()} />
          {/* Glass overlay shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>

        {/* Right Bento Column */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
          
          {/* Header Bento Tile */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
            className="rounded-[40px] p-6 sm:p-10 bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
          >
            <Header currentMonth={currentMonth} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
          </motion.div>

          {/* Calendar Grid Bento Tile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            className="flex flex-col flex-1 rounded-[40px] p-6 sm:p-10 bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative overflow-hidden perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentMonth.toISOString()}
                custom={direction}
                variants={tearingVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 180, damping: 22, duration: 0.6 }}
                className="w-full relative z-10"
                style={{ transformOrigin: "top center" }}
              >
                <CalendarGrid
                  currentMonth={currentMonth}
                  startDate={startDate}
                  endDate={endDate}
                  onDateClick={handleDateClick}
                  allNotes={allNotes}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Notes Panel Bento Tile */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <NotesPanel dateKey={notesKey} title={notesTitle} allNotes={allNotes} syncNotes={syncNotes} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
