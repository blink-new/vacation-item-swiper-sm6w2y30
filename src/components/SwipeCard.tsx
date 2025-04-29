
import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { VacationItem } from '../types';
import { cn } from '../lib/utils';
import { Check, X } from 'lucide-react';

interface SwipeCardProps {
  item: VacationItem;
  onSwipe: (direction: 'left' | 'right', item: VacationItem) => void;
  active: boolean;
}

export function SwipeCard({ item, onSwipe, active }: SwipeCardProps) {
  const [exitX, setExitX] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for the card
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  
  // Transform values for the decision indicators
  const rightOpacity = useTransform(x, [0, 100], [0, 1]);
  const leftOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitX(info.offset.x > 0 ? 1000 : -1000);
      onSwipe(direction, item);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "absolute w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",
        "transition-all duration-300 ease-out",
        active ? "z-10" : "z-0 scale-95 opacity-80"
      )}
      style={{ 
        x, 
        rotate,
        top: 0,
        left: 0,
        right: 0,
        margin: 'auto',
      }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX || 0 }}
      whileTap={{ scale: 1.05 }}
    >
      <div className="relative h-[400px] w-full">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Decision indicators */}
        <div className="absolute top-4 right-4">
          <motion.div 
            className="bg-green-500 text-white rounded-full p-2"
            style={{ opacity: rightOpacity }}
          >
            <Check size={24} />
          </motion.div>
        </div>
        
        <div className="absolute top-4 left-4">
          <motion.div 
            className="bg-red-500 text-white rounded-full p-2"
            style={{ opacity: leftOpacity }}
          >
            <X size={24} />
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-xl font-bold mb-1">{item.name}</h2>
          <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded-full text-xs">
            {item.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}