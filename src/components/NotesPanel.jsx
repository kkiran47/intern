import { useState, useEffect } from "react";
import { Save, Trash2, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NotesPanel({ dateKey, title, allNotes, syncNotes }) {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (allNotes[dateKey]) {
      setContent(allNotes[dateKey].content);
    } else {
      setContent("");
    }
  }, [dateKey, allNotes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveNote(content);
    }, 600);
    return () => clearTimeout(timer);
  }, [content, dateKey]);

  const saveNote = (newContent) => {
    setIsSaving(true);
    const parsed = { ...allNotes };
    if (newContent.trim() === "") {
      delete parsed[dateKey];
    } else {
      parsed[dateKey] = { id: dateKey, dateKey, content: newContent, updatedAt: Date.now() };
    }
    syncNotes(parsed);
    setTimeout(() => setIsSaving(false), 300);
  };

  const clearNote = () => {
    setContent("");
    saveNote("");
  };

  return (
    <motion.div 
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col flex-1 p-6 md:p-10 mb-6 sm:mb-0 bg-white/[0.03] backdrop-blur-3xl rounded-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden transition-all duration-500 w-full min-h-[300px] ring-1 ring-white/5"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 opacity-50" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 mt-2 relative z-10 gap-4 sm:gap-0">
        <motion.div 
          className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <PenLine className="w-6 h-6 text-white drop-shadow-[0_0_8px_white] flex-shrink-0" />
          </motion.div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white/90 tracking-tight break-words">
            {title}
          </h3>
        </motion.div>

        <div className="flex items-center self-end sm:self-auto space-x-4 md:space-x-6 text-xs md:text-sm font-bold uppercase tracking-widest min-w-max">
          <AnimatePresence mode="wait">
            {isSaving ? (
              <motion.span 
                key="saving"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-amber-300 flex items-center bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl shadow-[0_0_15px_rgba(251,191,36,0.2)]"
              >
                <Save className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 animate-spin" /> Saving...
              </motion.span>
            ) : (
              <motion.span 
                key="saved"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-green-400 flex items-center bg-green-500/10 border border-green-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl shadow-[0_0_15px_rgba(74,222,128,0.2)]"
              >
                <Save className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" /> Saved
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -10, backgroundColor: "rgba(244,63,94,0.1)", borderColor: "rgba(244,63,94,0.3)" }}
            whileTap={{ scale: 0.9 }}
            onClick={clearNote} 
            className="text-white/50 hover:text-rose-400 transition-colors p-2.5 md:p-3 bg-white/5 disabled:opacity-50 border border-white/10 rounded-2xl shadow-sm" 
            title="Clear Note"
          >
            <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </div>
      
      <div className="relative flex-1 group">
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-t-2xl z-20" />
        <motion.textarea
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Design your perfect schedule securely and beautifully right here..."
          className="w-full flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 outline-none resize-none text-white/90 placeholder:text-white/20 font-medium text-lg leading-loose relative z-10 custom-scrollbar min-h-[150px] focus:bg-white/[0.04] focus:border-white/20 transition-all shadow-inner"
        />
      </div>
    </motion.div>
  );
}
