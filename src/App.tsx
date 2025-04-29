
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SwipeCard } from './components/SwipeCard';
import { vacationItems } from './data/vacationItems';
import { VacationItem, SavedItem } from './types';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Load saved items from localStorage on initial render
  useEffect(() => {
    const storedItems = localStorage.getItem('savedVacationItems');
    if (storedItems) {
      try {
        setSavedItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('Failed to parse saved items:', error);
      }
    }
  }, []);

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem('savedVacationItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const handleSwipe = (direction: 'left' | 'right', item: VacationItem) => {
    if (direction === 'right') {
      // Check if item is already saved
      if (!savedItems.some(savedItem => savedItem.id === item.id)) {
        const newSavedItem: SavedItem = {
          ...item,
          savedAt: new Date()
        };
        
        setSavedItems(prev => [...prev, newSavedItem]);
        toast.success(`${item.name} added to your packing list!`);
      }
    }
    
    // Move to the next card after a short delay
    setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev < vacationItems.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);
  };

  // Get the items to display (top 3 for stacking effect)
  const displayedItems = vacationItems.slice(currentIndex, currentIndex + 3);
  
  // Check if we've gone through all items
  const isFinished = currentIndex >= vacationItems.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        savedItemsCount={savedItems.length} 
      />
      
      <main className="container mx-auto py-6 px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'discover' ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative h-[500px] w-full max-w-md mx-auto"
            >
              {isFinished ? (
                <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl shadow-xl p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">All done!</h2>
                  <p className="text-gray-600 mb-6">You've gone through all the vacation items.</p>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => setCurrentIndex(0)}
                  >
                    Start Over
                  </button>
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
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">My Packing List</h2>
              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No saved items yet</h3>
                  <p className="text-gray-400">Swipe right on items you want to pack for your trip!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {savedItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-3 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-24 w-24 object-cover"
                        />
                        <div className="flex-1 p-3 pr-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{item.name}</h3>
                            <button 
                              className="h-8 w-8 text-gray-400 hover:text-red-500 flex items-center justify-center"
                              onClick={() => {
                                setSavedItems(prev => prev.filter(i => i.id !== item.id));
                                toast.error("Item removed from your packing list");
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(item.savedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}

export default App;