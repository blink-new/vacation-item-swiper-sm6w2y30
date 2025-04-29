
import { Suitcase, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  savedItemsCount: number;
}

export function Header({ activeTab, onTabChange, savedItemsCount }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6" />
            <h1 className="text-xl font-bold">Vacation Packer</h1>
          </div>
          <div className="flex items-center gap-2">
            <Suitcase className="h-5 w-5" />
            <span className="text-sm font-medium">{savedItemsCount} items</span>
          </div>
        </div>
        
        <div className="flex bg-white/20 rounded-lg overflow-hidden">
          <button 
            className={`flex-1 py-2 px-4 text-center transition-colors ${activeTab === 'discover' ? 'bg-white text-blue-600' : ''}`}
            onClick={() => onTabChange('discover')}
          >
            Discover
          </button>
          <button 
            className={`flex-1 py-2 px-4 text-center transition-colors ${activeTab === 'saved' ? 'bg-white text-blue-600' : ''}`}
            onClick={() => onTabChange('saved')}
          >
            My List
          </button>
        </div>
      </div>
    </header>
  );
}