
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Sun, Suitcase, X } from 'lucide-react';

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
  },
  {
    id: '6',
    name: 'Waterproof Phone Case',
    description: 'Keep your phone safe during water activities. Touchscreen works underwater.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'accessories'
  },
  {
    id: '7',
    name: 'Compact Travel Adapter',
    description: 'Universal adapter works in over 150 countries. Includes USB ports for multiple devices.',
    image: 'https://images.unsplash.com/photo-1621972660772-6a0427a5ec04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'electronics'
  },
  {
    id: '8',
    name: 'Packable Sun Hat',
    description: 'Foldable wide-brim hat that provides excellent sun protection and packs flat.',
    image: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'clothing'
  },
  {
    id: '9',
    name: 'Travel-Size Dry Shampoo',
    description: 'Refresh your hair between washes. Perfect for long travel days.',
    image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'toiletries'
  },
  {
    id: '10',
    name: 'Inflatable Travel Pillow',
    description: 'Ergonomic design for neck support during long flights. Packs down small when not in use.',
    image: 'https://images.unsplash.com/photo-1520996729250-7d888a835cc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'essentials'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

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

  const currentItem = vacationItems[currentIndex];
  const isFinished = currentIndex >= vacationItems.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
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
      
      setSwipeDirection(null);
    }, 300);
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
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
          
          <div className="flex gap-2">
            <button 
              className={`tab-button ${activeTab === 'discover' ? 'active' : ''}`}
              onClick={() => setActiveTab('discover')}
            >
              Discover
            </button>
            <button 
              className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
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
          <div className="relative flex flex-col items-center">
            {isFinished ? (
              <div className="all-done">
                <h2 className="text-2xl font-bold mb-4">All done!</h2>
                <p className="text-gray-600 mb-6">You've gone through all the vacation items.</p>
                <button 
                  className="reset-button"
                  onClick={resetItems}
                >
                  Start Over
                </button>
              </div>
            ) : (
              <>
                <div 
                  className="swipe-card"
                  style={{
                    transform: swipeDirection === 'left' 
                      ? 'translateX(-150%) rotate(-30deg)' 
                      : swipeDirection === 'right' 
                        ? 'translateX(150%) rotate(30deg)' 
                        : 'translateX(0) rotate(0)'
                  }}
                >
                  <img 
                    src={currentItem.image} 
                    alt={currentItem.name} 
                  />
                  <div className="swipe-card-content">
                    <h2 className="text-xl font-bold mb-1">{currentItem.name}</h2>
                    <p className="text-sm opacity-90">{currentItem.description}</p>
                    <div className="category-tag">
                      {currentItem.category}
                    </div>
                  </div>
                </div>
                
                <div className="swipe-buttons">
                  <button 
                    className="swipe-button swipe-button-reject"
                    onClick={() => handleSwipe('left')}
                  >
                    <ThumbsDown size={24} />
                  </button>
                  
                  <button 
                    className="swipe-button swipe-button-accept"
                    onClick={() => handleSwipe('right')}
                  >
                    <ThumbsUp size={24} />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Packing List</h2>
            {savedItems.length === 0 ? (
              <div className="empty-state">
                <h3 className="text-xl font-medium mb-2">No saved items yet</h3>
                <p>Swipe right on items you want to pack for your trip!</p>
              </div>
            ) : (
              <div>
                {savedItems.map((item) => (
                  <div key={item.id} className="saved-item">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                    />
                    <div className="saved-item-content">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="category-tag">
                          {item.category}
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(item.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button 
                        className="remove-button"
                        onClick={() => removeItem(item.id)}
                      >
                        <X size={16} />
                      </button>
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
        <div className={`toast ${toastType === 'success' ? 'toast-success' : 'toast-error'}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;