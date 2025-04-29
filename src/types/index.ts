
export interface VacationItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'clothing' | 'accessories' | 'electronics' | 'toiletries' | 'essentials';
}

export interface SavedItem extends VacationItem {
  savedAt: Date;
}