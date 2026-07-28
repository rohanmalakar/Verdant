export type PlantSize = 'Small' | 'Medium' | 'Large' | 'Extra Large';
export type SunlightRequirement = 'Low Light' | 'Partial Shade' | 'Bright Indirect' | 'Direct Sun';
export type WaterRequirement = 'Weekly' | 'Bi-weekly' | 'Sparse (1-2x/month)' | 'Keep Moist';
export type CareDifficulty = 'Easy' | 'Moderate' | 'Expert';
export type PlantLocation = 'Indoor' | 'Outdoor' | 'Both';

export interface PlantCareDetails {
  light: string;
  water: string;
  soil: string;
  temperature: string;
  humidity: string;
  toxicity: string;
  repotting?: string;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  stock: number;
  size: PlantSize;
  sunlight: SunlightRequirement;
  waterFrequency: WaterRequirement;
  petFriendly: boolean;
  airPurifying: boolean;
  difficulty: CareDifficulty;
  location: PlantLocation;
  careInstructions: PlantCareDetails;
  description: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
  selectedSize?: PlantSize;
}

export interface WishlistItem {
  plant: Plant;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
  phone: string;
}

export type ShippingAddress = Partial<Address> & {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
};

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail?: string;
  email?: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  couponCode?: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Failed';
  createdAt: string;
  trackingNumber: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  addresses: Address[];
  createdAt: string;
  phone?: string;
  isBlocked?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: number;
  expiresAt: string;
  isActive: boolean;
  description: string;
}

export interface Review {
  id: string;
  plantId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface CareGuide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  image: string;
  overview: string;
  content?: string;
  tips: { icon: string; title: string; detail: string }[];
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sunlight: string;
  waterFrequency: string;
  location: string;
  size: string;
  petFriendlyOnly: boolean;
  airPurifyingOnly: boolean;
  minRating: number;
  searchQuery: string;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'newest' | 'rating';
}

export interface WebsiteSettings {
  bannerMessage: string;
  showBanner: boolean;
  freeShippingThreshold: number;
  standardShippingRate: number;
  taxPercent: number;
  storePhone: string;
  storeEmail: string;
}
