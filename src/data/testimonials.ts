export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  comment: string;
  rating: number;
  plantPurchased: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Eleanor Vance',
    role: 'Interior Designer',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    comment: 'Verdant delivered the healthiest Monstera I have ever ordered online! The eco-friendly packaging protected every single leaf during transit.',
    rating: 5,
    plantPurchased: 'Monstera Deliciosa'
  },
  {
    id: 't-2',
    name: 'Marcus Thorne',
    role: 'Architect',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    comment: 'The AI Plant Advisor helped me figure out the exact watering schedule for my Fiddle Leaf Fig. It looks like a magazine cover now!',
    rating: 5,
    plantPurchased: 'Fiddle Leaf Fig Tree'
  },
  {
    id: 't-3',
    name: 'Sophia Chen',
    role: 'Software Engineer & Cat Owner',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    comment: 'I love the pet-friendly filter! Finding beautiful, non-toxic plants for my cat-filled apartment was so effortless and fast.',
    rating: 5,
    plantPurchased: 'Calathea Orbifolia'
  }
];
