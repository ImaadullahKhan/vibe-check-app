export type CategoryId = 'all' | 'burgers' | 'wiches' | 'sides' | 'wraps' | 'shakes' | 'coolers';

export interface MenuItem {
  id: number;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  description: string;
  isVeg: boolean;
  spicyLevel?: 0 | 1 | 2 | 3; // 0 none, 1 mild, 2 medium, 3 fiery
  isBestseller?: boolean;
  isNew?: boolean;
  image: string;
  fallbackImage?: string;
  allergens?: string[];
  calories?: string;
  preparationTime?: string;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: string;
}

export interface OrderLog {
  id: string;
  timestamp: string;
  type: 'menu_order' | 'catering_inquiry' | 'direct_chat' | 'item_modal';
  items?: string;
  totalAmount?: number;
  orderMode?: 'pickup' | 'rapido' | 'dinein' | 'catering';
  customerName?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  avatar: string;
  comment: string;
  verified: boolean;
  photos?: string[];
  favoriteDish?: string;
}

export interface InstagramReel {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  title: string;
  views: string;
  likes: string;
  thumbnail: string;
  tag: string;
  quote: string;
}
