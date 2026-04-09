import { motion, AnimatePresence } from "framer-motion";

export function HeroPanel({ monthIndex }) {
  // Using high-contrast abstract images
  const imageUrl = `https://picsum.photos/id/${1020 + monthIndex}/1000/1500`;

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[900px] flex-shrink-0 bg-black flex items-end group overflow-hidden">
      {/* Dynamic Background Noise/Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0, scale: 1.5, filter: "brightness(0) blur(20px)" }}
          animate={{ opacity: 0.7, scale: 1, filter: "brightness(1) blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "brightness(2) blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={imageUrl}
            alt="Calendar Hero Theme"
            className="w-full h-full object-cover mix-blend-lighten grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Advanced Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

      {/* Glass Distortion Path */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-10">
        <filter id="distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
        </filter>
        <rect width="100%" height="100%" filter="url(#distort)" fill="none" />
      </svg>

      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-20 p-10 sm:p-14 text-white w-full"
      >
        <div className="mb-6 flex items-center space-x-4">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_15px_#8b5cf6]"
          />
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-violet-400">Tempo.Core / Synchronized</span>
        </div>
        
        <h2 className="text-7xl sm:text-8xl font-black tracking-tighter mb-6 leading-[0.85] text-white">
          TIME<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-indigo-400 to-white">FLUID</span>
        </h2>
        
        <div className="h-[2px] w-32 bg-gradient-to-r from-violet-500 to-transparent mb-10"></div>
        
        <p className="text-white/50 font-medium text-lg leading-relaxed max-w-[320px] backdrop-blur-sm">
          Experience a calendar that breathes. Every second, meticulously rendered in glass.
        </p>

        {/* Decorative elements */}
        <div className="mt-12 flex space-x-2">
            {[1,2,3,4].map(i => (
                <div key={i} className="h-1 w-8 bg-white/10 rounded-full" />
            ))}
        </div>
      </motion.div>
      
      {/* Corner Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[100px] -mr-32 -mt-32" />
    </div>
  );
}

