import { CareGuide } from '../types';

export const CARE_GUIDES: CareGuide[] = [
  {
    id: 'guide-1',
    title: 'How to Water Your Monstera for Maximum Split Leaves',
    subtitle: 'Master the moisture balance and light conditions for healthy fenestration.',
    category: 'Watering & Light',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
    overview: 'Monstera Deliciosa is a vigorous tropical climber. To produce those signature split leaves (fenestrations), it requires adequate indirect light, proper soil moisture cycling, and support like a moss pole.',
    tips: [
      {
        icon: 'Droplets',
        title: 'The Finger Test',
        detail: 'Insert your index finger 2 inches into the soil. Water only when it feels dry and cool to the touch.'
      },
      {
        icon: 'Sun',
        title: 'Light Equals Splits',
        detail: 'Leaves remain solid in dim conditions. Place near a bright east or south window with sheer curtains.'
      },
      {
        icon: 'Sparkles',
        title: 'Wipe the Dust',
        detail: 'Dust blocks photosynthesis. Wipe broad leaves monthly with a damp microfiber cloth.'
      }
    ]
  },
  {
    id: 'guide-2',
    title: 'Top 5 Pet-Safe Houseplants for Dog & Cat Owners',
    subtitle: 'Keep your furry friends safe while filling your home with green warmth.',
    category: 'Safety & Pets',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&q=80&w=800',
    overview: 'Many popular houseplants contain calcium oxalate crystals that irritate pets. Thankfully, varieties like Calathea, Peperomia, Parlor Palms, and Succulents are 100% non-toxic and pet approved!',
    tips: [
      {
        icon: 'ShieldCheck',
        title: 'ASPCA Verified',
        detail: 'Always cross-reference new additions against the ASPCA non-toxic plant database.'
      },
      {
        icon: 'Heart',
        title: 'Calathea Magic',
        detail: 'Calatheas offer intricate silvery pattern art without any toxicity risks to curious cats.'
      }
    ]
  },
  {
    id: 'guide-3',
    title: 'Winter Succulent Survival: Preventing Root Rot',
    subtitle: 'Simple adjustments to light and watering when sunlight drops.',
    category: 'Seasonal Care',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1520302638584-89b50d173799?auto=format&fit=crop&q=80&w=800',
    overview: 'During colder dormant months, succulents drastically slow their growth. Reduce watering frequency to once a month or less to protect delicate root systems from fungal rot.',
    tips: [
      {
        icon: 'Thermometer',
        title: 'Temperature Guard',
        detail: 'Move plants away from frosty windowpanes overnight.'
      },
      {
        icon: 'Wind',
        title: 'Air Circulation',
        detail: 'Ensure pot drainage holes are clear and soil drains water in seconds.'
      }
    ]
  }
];
