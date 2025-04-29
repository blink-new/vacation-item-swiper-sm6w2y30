
import { useState, useRef } from 'react';
import { VacationItem } from '../types';
import { Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SwipeCardProps {
  item: VacationItem;
  onSwipe: (direction: 'left' | 'right', item: VacationItem) => void;
  active: boolean;
}

export function SwipeCard({ item, onSwipe, active }: SwipeCardProps) {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!active) return;
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active) return;
    startX.current = e.clientX;
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !active) return;
    currentX.current = e.touches[0].clientX - startX.current;
    updateCardPosition(currentX.current);
    
    if (currentX.current > 50) {
      setDirection('right');
    } else if (currentX.current < -50) {
      setDirection('left');
    } else {
      setDirection(null);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !active) return;
    currentX.current = e.clientX - startX.current;
    updateCardPosition(currentX.current);
    
    if (currentX.current > 50) {
      setDirection('right');
    } else if (currentX.current < -50) {
      setDirection('left');
    } else {
      setDirection(null);
    }
  };
  
  const handleDragEnd = () => {
    if (!isDragging || !active) return;
    setIsDragging(false);
    
    if (Math.abs(currentX.current) > 100) {
      const swipeDirection = currentX.current > 0 ? 'right' : 'left';
      completeSwipe(swipeDirection);
      onSwipe(swipeDirection, item);
    } else {
      resetCardPosition();
    }
  };
  
  const updateCardPosition = (x: number) => {
    if (!cardRef.current) return;
    const rotate = x * 0.1; // Adjust rotation based on drag distance
    cardRef.current.style.transform = `translateX(${x}px) rotate(${rotate}deg)`;
  };
  
  const resetCardPosition = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.3s ease';
    cardRef.current.style.transform = 'translateX(0) rotate(0)';
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = '';
      }
    }, 300);
    setDirection(null);
  };
  
  const completeSwipe = (direction: 'left' | 'right') => {
    if (!cardRef.current) return;
    const targetX = direction === 'right' ? window.innerWidth + 200 : -window.innerWidth - 200;
    cardRef.current.style.transition = 'transform 0.5s ease';
    cardRef.current.style.transform = `translateX(${targetX}px) rotate(${direction === 'right' ? 30 : -30}deg)`;
  };
  
  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (!active) return;
    completeSwipe(direction);
    onSwipe(direction, item);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "absolute w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",
        "transition-all duration-300 ease-out",
        active ? "z-10" : "z-0 scale-95 opacity-80"
      )}
      style={{ 
        top: 0,
        left: 0,
        right: 0,
        margin: 'auto',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div className="relative h-[400px] w-full">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Decision indicators */}
        <div className={cn(
          "absolute top-4 right-4 transition-opacity duration-200",
          direction === 'right' ? "opacity-100" : "opacity-0"
        )}>
          <div className="bg-green-500 text-white rounded-full p-2">
            <Check size={24} />
          </div>
        </div>
        
        <div className={cn(
          "absolute top-4 left-4 transition-opacity duration-200",
          direction === 'left' ? "opacity-100" : "opacity-0"
        )}>
          <div className="bg-red-500 text-white rounded-full p-2">
            <X size={24} />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-xl font-bold mb-1">{item.name}</h2>
          <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded-full text-xs">
            {item.category}
          </span>
        </div>
      </div>
      
      {active && (
        <div className="absolute bottom-[-80px] left-0 right-0 flex justify-center gap-8">
          <button 
            className="rounded-full h-16 w-16 bg-white border-2 border-red-400 text-red-500 flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
            onClick={() => handleButtonSwipe('left')}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button 
            className="rounded-full h-16 w-16 bg-white border-2 border-green-400 text-green-500 flex items-center justify-center shadow-lg hover:bg-green-50 transition-colors"
            onClick={() => handleButtonSwipe('right')}
          >
            <Check className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
}