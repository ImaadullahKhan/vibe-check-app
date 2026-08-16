import { Review, InstagramReel } from '../types';

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Zaid Quadri',
    rating: 5,
    date: '2 days ago',
    avatar: 'ZQ',
    comment: 'Hands down the crispiest smash edges in Hyderabad! The Lamb Smash OG and Nashville Chicken Double are on another level. Extremely juicy and sauces are top tier.',
    verified: true,
    favoriteDish: 'Lamb Smash OG',
  },
  {
    id: 'rev-2',
    author: 'Ananya Sharma',
    rating: 5,
    date: '1 week ago',
    avatar: 'AS',
    comment: 'Ordered via WhatsApp pickup and food was ready in 10 mins sharp! Loved the Biscoff shake and the Smoked Shroom Wich. Vegetarian options are unexpectedly gourmet!',
    verified: true,
    favoriteDish: 'Biscoff Shake & Smoked Shroom'
  },
  {
    id: 'rev-3',
    author: 'Mirza Faisal Baig',
    rating: 5,
    date: '2 weeks ago',
    avatar: 'MF',
    comment: 'Double Smash B**F is pure umami explosion. Malakpet finally got a legit American-style smash joint with high hygiene standards and FSSAI transparency. 10/10 recommend.',
    verified: true,
    favoriteDish: 'Double Smash B**F',
  },
  {
    id: 'rev-4',
    author: 'Syed Hamza Ali',
    rating: 4,
    date: '3 weeks ago',
    avatar: 'SH',
    comment: 'Fiery Chicken Tenders with the Cheese sauce dip is dangerous! So crunchy outside and tender inside. Also try their Fizzy Jamun cooler for a refreshing kick.',
    verified: true,
    favoriteDish: 'Fiery Chicken Tenders'
  },
  {
    id: 'rev-5',
    author: 'Dr. Rehana Sultana',
    rating: 5,
    date: '1 month ago',
    avatar: 'RS',
    comment: 'Booked a 40-burger party catering box for our clinic celebration. Delivered hot, neatly packaged, and everyone loved the customizable spice levels. Very professional team!',
    verified: true,
    favoriteDish: 'Party Catering Sliders'
  }
];

export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: 'reel-1',
    author: 'Hyderabad Food Safari',
    handle: '@hydfoodsafari',
    avatar: 'HF',
    title: 'The Legendary Smash Caramelization at Malakpet!',
    views: '142K',
    likes: '12.4K',
    thumbnail: '/menu/Double-Smash-Lamb.jpeg',
    tag: 'Smash Technique 🔥',
    quote: 'Listen to that sizzling lace crunch! Vibe Check is setting serious burger standards in Old City.'
  },
  {
    id: 'reel-2',
    author: 'Fat Guy In Hyd',
    handle: '@fatguyinhyderabad',
    avatar: 'FG',
    title: 'Double Smash Lamb + Biscoff Shake Feast Challenge',
    views: '98.5K',
    likes: '8.9K',
    thumbnail: '/menu/Biscoff-Shake-Sugar-Rush.jpeg',
    tag: 'Food Review ⭐',
    quote: 'Cheese pull is insane! That Biscoff thick shake is arguably the best in South Hyderabad.'
  },
  {
    id: 'reel-3',
    author: 'The Hyderabad Cravings',
    handle: '@thehyderabadcravings',
    avatar: 'HC',
    title: 'Cheesy Loaded Fries & Nashville Heat Drop',
    views: '215K',
    likes: '19.1K',
    thumbnail: '/menu/BF-Loaded-Fries.jpeg',
    tag: 'Viral Reels 🚀',
    quote: 'Loaded fries overflowing with beef chunks and homemade signature secret burger sauce!'
  },
  {
    id: 'reel-4',
    author: 'Midnight Munchies Hyd',
    handle: '@midnightmunchies_hyd',
    avatar: 'MM',
    title: 'How Malakpet Burger Lovers Order in Under 10 Seconds',
    views: '76.2K',
    likes: '6.3K',
    thumbnail: '/menu/Spicy-Smoked-Cheese-Wich.jpeg',
    tag: 'Kitchen BTS 👨‍🍳',
    quote: 'Direct WhatsApp ordering and instant pickup without hefty aggregator commissions!'
  }
];
