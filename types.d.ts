type RequestState = "pending" | "fulfilled" | "rejected";

interface CategoryObj {
  categoryName: string;
  isSelected: boolean;
}

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[] | [];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

interface Cart {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId?: number;
  totalProducts: number;
  totalQuantity: number;
}

interface FetchProductResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

interface FetchCartResponse {
  carts: Cart[];
  limit: number;
  skip: number;
  total: number;
}
