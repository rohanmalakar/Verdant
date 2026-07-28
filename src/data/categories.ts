import { Category } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Indoor Plants',
    slug: 'indoor-plants',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=600',
    description: 'Lush lush green foliage designed to thrive inside your home or office space.',
    itemCount: 18
  },
  {
    id: 'cat-2',
    name: 'Outdoor Plants',
    slug: 'outdoor-plants',
    image: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=600',
    description: 'Sun-loving shrubs, patio trees, and vibrant garden focal points.',
    itemCount: 12
  },
  {
    id: 'cat-3',
    name: 'Succulents',
    slug: 'succulents',
    image: 'https://images.unsplash.com/photo-1520302638584-89b50d173799?auto=format&fit=crop&q=80&w=600',
    description: 'Low-maintenance desert gems that retain water in fleshy, sculptural leaves.',
    itemCount: 15
  },
  {
    id: 'cat-4',
    name: 'Bonsai',
    slug: 'bonsai',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600',
    description: 'Artfully shaped miniature trees rooted in ancient Japanese serenity traditions.',
    itemCount: 6
  },
  {
    id: 'cat-5',
    name: 'Air Purifying Plants',
    slug: 'air-purifying-plants',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=600',
    description: 'NASA-studied varieties proven to cleanse airborne toxins and boost oxygen.',
    itemCount: 14
  },
  {
    id: 'cat-6',
    name: 'Flower Plants',
    slug: 'flower-plants',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=600',
    description: 'Fragrant blossoms and colorful floral stems that brighten any setting.',
    itemCount: 10
  }
];

export const CATEGORIES = INITIAL_CATEGORIES;
