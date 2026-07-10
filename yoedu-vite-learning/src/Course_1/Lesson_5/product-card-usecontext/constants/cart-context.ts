// cart-context.ts
// File này export lại từ CartContext để tiện import ở các nơi khác
// Ví dụ: import { useCart, CartProvider } from "../constants/cart-context"

export { useCart, CartProvider } from "../context/CartContext";
export type { CartItem } from "../context/CartContext";
