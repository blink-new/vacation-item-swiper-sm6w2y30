
import { useState, useEffect } from 'react';
import { SwipeCard } from './SwipeCard';
import { VacationItem } from '../types';
import { Button } from './ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface SwipeDeckProps {
  items: VacationItem[];
  onSwipe: (direction: 'left' | 'right', item: VacationItem) => void;
}

export function SwipeDeck({ items, onSwipe }: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState<VacationItem[]>([]);
  
  useEffect(() => {
    // Show the top 3 cards for stacking effect
    setDisplayedItems(items.slice(currentIndex, currentIndex + 3));
  }, [items, currentIndex]);

  const handleSwipe = (direction: 'left' | 'right', item: VacationItem) => {
    onSwipe(direction, item);
    
    // Move to the next card after a short delay
    setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev < items.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (displayedItems.length > 0) {
      handleSwipe(direction, displayedItems[0]);
    }
  };

  // Check if we've gone through all items
  const isFinished = currentIndex >= items.length;

  return (
    <div className="relative h-[500px] w-full max-w-md mx-auto">
      {isFinished ? (
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">All done!</h2>
          <p className="text-gray-600 mb-6">You've gone through all the vacation items.</p>
          <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
        </div>
      ) : (
        <>
          <div className="relative h-[400px] w-full">
            {displayedItems.map((item, index) => (
              <SwipeCard
                key={item.id}
                item={item}
                onSwipe={handleSwipe}
                active={index === 0}
              />
            )).reverse()}
          </div>
          
          <div className="flex justify-center gap-8 mt-6">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full h-16 w-16 bg-white border-red-400 text-red-500 hover:bg-red-50"
              onClick={() => handleButtonSwipe('left')}
            >
              <ThumbsDown className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full h-16 w-16 bg-white border-green-400 text-green-500 hover:bg-green-50"
              onClick={() => handleButtonSwipe('right')}
            >
              <ThumbsUp className="h-6 w-6" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}