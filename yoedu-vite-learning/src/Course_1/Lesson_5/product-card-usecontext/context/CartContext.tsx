import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product, Coupon } from "../constants";


export interface CartItem {
  product: Product;
  quantity: number;
}
// định nghĩa kiểu dữ liệu cho Context
interface CartContextType {
  
  cartItems: CartItem[];
  isCartOpen: boolean;
  selectedCoupon: Coupon | null;

  
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  applyCoupon: (coupon: Coupon | null) => void;
  openCart: () => void;
  closeCart: () => void;

  
  totalItems: number;
  subtotal: number;
  discount: number;
  totalAfterDiscount: number;
}

// tạo Context
const CartContext = createContext<CartContextType | null>(null);

// cartProvider component để bọc các component con  
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // Nếu đã có thì tăng số lượng
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
   
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

// tăng số lượng sản phẩm trong giỏ hàng
  const increaseQty = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

// giảm số lượng sản phẩm trong giỏ hàng
  const decreaseQty = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

 // áp coupon vào giỏ hàng
  const applyCoupon = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Tính toán tổng số lượng sản phẩm, subtotal, discount và totalAfterDiscount
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = selectedCoupon
    ? Math.round((subtotal * selectedCoupon.discount) / 100)
    : 0;

  const totalAfterDiscount = subtotal - discount;

  // Giá trị context
  const contextValue: CartContextType = {
    cartItems,
    isCartOpen,
    selectedCoupon,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    applyCoupon,
    openCart,
    closeCart,
    totalItems,
    subtotal,
    discount,
    totalAfterDiscount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được dùng bên trong CartProvider!");
  }
  return context;
};
