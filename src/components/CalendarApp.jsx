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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar_notes");
    if (savedNotes) {
      try {
        setAllNotes(JSON.parse(savedNotes));
      } catch (e) { }
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

  const warpVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 0.8,
      z: -500,
      rotateX: dir > 0 ? 45 : -45,
      filter: "blur(20px)",
    }),
    center: {
      opacity: 1,
      scale: 1,
      z: 0,
      rotateX: 0,
      filter: "blur(0px)",
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 1.2,
      z: 500,
      rotateX: dir > 0 ? -45 : 45,
      filter: "blur(20px)",
    }),
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#020205] flex items-center justify-center p-4 sm:p-8 overflow-hidden font-sans perspective-2000">
      {/* Hyper-Modern Dynamic Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15) 0%, transparent 60%)`
        }}
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-violet-600/20 blur-[180px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.3, 0.1], 
          x: [0, -80, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 blur-[180px] rounded-full pointer-events-none"
      />

      <div className="relative w-full max-w-[1500px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Bento: Hero Panel with Hover Distortion */}
        <motion.div 
          initial={{ opacity: 0, x: -100, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          className="lg:col-span-4 rounded-[48px] overflow-hidden glass-card relative group hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-all duration-500"
        >
          <HeroPanel monthIndex={currentMonth.getMonth()} />
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>

        {/* Right Bento Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Header Tile */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[40px] p-8 glass-card neon-border"
          >
            <Header currentMonth={currentMonth} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
          </motion.div>

          {/* Calendar Grid - Warp Transition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 rounded-[48px] p-6 sm:p-10 glass-card relative overflow-hidden perspective-2000"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentMonth.toISOString()}
                custom={direction}
                variants={warpVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  mass: 0.8,
                  opacity: { duration: 0.2 } 
                }}
                className="w-full relative z-10"
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
            
            {/* Ambient inner glow that follows mouse */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 transition-opacity group-hover:opacity-40"
              style={{
                background: `radial-gradient(circle at ${mousePos.x - (window.innerWidth / 2)}px ${mousePos.y - (window.innerHeight / 2)}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
              }}
            />
          </motion.div>
          
          {/* Notes Panel */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            className="rounded-[40px] glass-card neon-border p-2"
          >
            <NotesPanel dateKey={notesKey} title={notesTitle} allNotes={allNotes} syncNotes={syncNotes} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

