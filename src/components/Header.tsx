
import { Suitcase, Sun } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

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
        
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="w-full bg-white/20">
            <TabsTrigger 
              value="discover" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              My List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}