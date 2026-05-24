export interface Product {
  id: string;
  name: string;
  category: string; // 'living-room' | 'bedroom' | 'dining-room' | 'office' | 'outdoor'
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: 'New' | 'Sale' | 'Bestseller' | 'Only 3 left!';
  material: string;
  colors: { name: string; hex: string }[];
  image: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  description: string;
  specs: {
    Dimensions: string;
    Weight: string;
    Material: string;
    Color: string;
    Assembly: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: { name: string; hex: string };
  selectedSize: 'Standard' | 'Compact' | 'Grand';
}

export type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'cart' | 'checkout';
