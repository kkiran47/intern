import { motion, AnimatePresence } from "framer-motion";

export function HeroPanel({ monthIndex }) {
  // Using more abstract/curated images for a premium look
  const imageUrl = `https://picsum.photos/id/${1010 + monthIndex}/800/1200`;

  return (
    <div className="relative w-full h-full min-h-[400px] flex-shrink-0 bg-transparent flex items-end group overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-rose-900/40 z-0" />
      
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          alt="Calendar Hero Theme"
          initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
          animate={{ opacity: 0.6, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay z-0"
        />
      </AnimatePresence>
      
      {/* Dark fade gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Cyber/HUD grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10" />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-20 p-8 sm:p-12 text-white w-full"
      >
        <div className="mb-4 flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rose]" />
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/50">System Active</span>
        </div>
        
        <h2 className="text-6xl sm:text-7xl font-black tracking-tighter mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Time.<br/>Mastered.
        </h2>
        
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-rose-500 mb-8 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.6)]"></div>
        
        <p className="text-white/70 font-medium text-lg sm:text-xl max-w-[90%] leading-relaxed backdrop-blur-sm">
          A new dimension of productivity. Curate your schedule within this responsive glass workspace.
        </p>

        {/* Floating animated orb in the corner */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-10 w-48 h-48 bg-purple-500/30 blur-[50px] rounded-full pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
