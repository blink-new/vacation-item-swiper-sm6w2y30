
import { SavedItem } from '../types';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SavedItemsListProps {
  items: SavedItem[];
  onRemove: (id: string) => void;
}

export function SavedItemsList({ items, onRemove }: SavedItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
        <h3 className="text-xl font-medium text-gray-500 mb-2">No saved items yet</h3>
        <p className="text-gray-400">Swipe right on items you want to pack for your trip!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full pr-4">
      <div className="space-y-4">
        {items.map((item) => (
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-red-500"
                  onClick={() => onRemove(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
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
      </div>
    </ScrollArea>
  );
}