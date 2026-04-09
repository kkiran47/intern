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
    }, 400); // Shorter delay for faster feel
    return () => clearTimeout(timer);
  }, [content, dateKey]);

  const saveNote = (newContent) => {
    if (newContent === (allNotes[dateKey]?.content || "")) return;
    
    setIsSaving(true);
    const parsed = { ...allNotes };
    if (newContent.trim() === "") {
      delete parsed[dateKey];
    } else {
      parsed[dateKey] = { id: dateKey, dateKey, content: newContent, updatedAt: Date.now() };
    }
    syncNotes(parsed);
    setTimeout(() => setIsSaving(false), 200);
  };

  const clearNote = () => {
    setContent("");
    saveNote("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col flex-1 p-6 sm:p-8 bg-transparent transition-all duration-300 w-full min-h-[350px]"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-2">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            <PenLine className="w-5 h-5 text-violet-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white/90 tracking-tighter">
            {title}
          </h3>
        </motion.div>

        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isSaving ? (
              <motion.div 
                key="saving"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-[10px] uppercase tracking-[0.3em] font-black text-violet-400"
              >
                Syncing.Core...
              </motion.div>
            ) : (
                <motion.div 
                key="saved"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.5, scale: 1 }}
                className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40"
              >
                Data.Stable
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,50,50,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={clearNote} 
            className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl text-white/20 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      <div className="group relative flex-1">
        <div className="absolute inset-0 bg-violet-500/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 -z-10" />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Inject your thoughts into the stream..."
          className="w-full flex-1 min-h-[200px] bg-white/[0.02] border border-white/5 rounded-[32px] p-8 outline-none resize-none text-white/80 placeholder:text-white/10 font-bold text-xl leading-relaxed transition-all focus:bg-white/[0.04] focus:border-white/20 focus:shadow-[0_0_40px_rgba(255,255,255,0.02)_inset]"
        />
      </div>
    </motion.div>
  );
}
