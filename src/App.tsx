
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SwipeDeck } from './components/SwipeDeck';
import { SavedItemsList } from './components/SavedItemsList';
import { vacationItems } from './data/vacationItems';
import { VacationItem, SavedItem } from './types';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const { toast } = useToast();

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
        
        toast({
          title: "Item saved!",
          description: `${item.name} added to your packing list.`,
          variant: "default",
        });
      }
    }
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "Item removed from your packing list.",
      variant: "destructive",
    });
  };

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
            >
              <SwipeDeck items={vacationItems} onSwipe={handleSwipe} />
            </motion.div>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">My Packing List</h2>
                <SavedItemsList items={savedItems} onRemove={handleRemoveSavedItem} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;