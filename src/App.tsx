
import React, { useState } from 'react';
import { Sun, ThumbsUp, ThumbsDown, Suitcase, X } from 'lucide-react';

// Define types
interface VacationItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface SavedItem extends VacationItem {
  savedAt: Date;
}

// Sample vacation items
const vacationItems: VacationItem[] = [
  {
    id: '1',
    name: 'Lightweight Summer Dress',
    description: 'Perfect for beach days and casual outings. Breathable fabric keeps you cool in hot weather.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'clothing'
  },
  {
    id: '2',
    name: 'Polarized Sunglasses',
    description: 'Protect your eyes with style. These sunglasses reduce glare and enhance visibility.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'accessories'
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker perfect for beach days or pool parties. 10-hour battery life.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'electronics'
  },
  {
    id: '4',
    name: 'Quick-Dry Beach Towel',
    description: 'Compact, absorbent, and fast-drying. Perfect for beach trips and poolside lounging.',
    image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'essentials'
  },
  {
    id: '5',
    name: 'Reef-Safe Sunscreen',
    description: 'SPF 50 protection that\'s gentle on your skin and ocean-friendly.',
    image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'toiletries'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const currentItem = vacationItems[currentIndex];
  const isFinished = currentIndex >= vacationItems.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Save the item
      if (!savedItems.some(item => item.id === currentItem.id)) {
        const newItem: SavedItem = {
          ...currentItem,
          savedAt: new Date()
        };
        setSavedItems([...savedItems, newItem]);
        
        // Show toast
        setToastMessage(`${currentItem.name} added to your packing list!`);
        setToastType('success');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }
    
    // Move to next item
    if (currentIndex < vacationItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const removeItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
    
    // Show toast
    setToastMessage('Item removed from your packing list');
    setToastType('error');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const resetItems = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Sun className="h-6 w-6" />
              <h1 className="text-xl font-bold">Vacation Packer</h1>
            </div>
            <div className="flex items-center gap-2">
              <Suitcase className="h-5 w-5" />
              <span className="text-sm font-medium">{savedItems.length} items</span>
            </div>
          </div>
          
          <div className="flex bg-white/20 rounded-lg overflow-hidden">
            <button 
              className={`flex-1 py-2 px-4 text-center transition-colors ${activeTab === 'discover' ? 'bg-white text-blue-600' : ''}`}
              onClick={() => setActiveTab('discover')}
            >
              Discover
            </button>
            <button 
              className={`flex-1 py-2 px-4 text-center transition-colors ${activeTab === 'saved' ? 'bg-white text-blue-600' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              My List
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        {activeTab === 'discover' ? (
          <div className="relative h-[500px] w-full max-w-md mx-auto">
            {isFinished ? (
              <div className="flex flex-col items-center justify-center h-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">All done!</h2>
                <p className="text-gray-600 mb-6">You've gone through all the vacation items.</p>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={resetItems}
                >
                  Start Over
                </button>
              </div>
            ) : (
              <div className="relative h-[400px] w-full">
                <div className="absolute w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="relative h-[400px] w-full">
                    <img 
                      src={currentItem.image} 
                      alt={currentItem.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h2 className="text-xl font-bold mb-1">{currentItem.name}</h2>
                      <p className="text-sm opacity-90 line-clamp-2">{currentItem.description}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                        {currentItem.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-[-80px] left-0 right-0 flex justify-center gap-8">
                  <button 
                    className="rounded-full h-16 w-16 bg-white border-2 border-red-400 text-red-500 flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                    onClick={() => handleSwipe('left')}
                  >
                    <ThumbsDown className="h-8 w-8" />
                  </button>
                  
                  <button 
                    className="rounded-full h-16 w-16 bg-white border-2 border-green-400 text-green-500 flex items-center justify-center shadow-lg hover:bg-green-50 transition-colors"
                    onClick={() => handleSwipe('right')}
                  >
                    <ThumbsUp className="h-8 w-8" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">My Packing List</h2>
            {savedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-500 mb-2">No saved items yet</h3>
                <p className="text-gray-400">Swipe right on items you want to pack for your trip!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
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
                          onClick={() => removeItem(item.id)}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Toast */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;