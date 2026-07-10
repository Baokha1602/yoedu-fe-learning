
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Coupon {
  code: string;
  discount: number; 
  label: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "iPhone 15", price: 20_000_000 },
  { id: 2, name: "Macbook M2", price: 35_000_000 },
  { id: 3, name: "AirPods Pro", price: 5_000_000 },
];

export const COUPONS: Coupon[] = [
  { code: "DISCOUNT10", discount: 10, label: "DISCOUNT10 (-10%)" },
  { code: "DISCOUNT20", discount: 20, label: "DISCOUNT20 (-20%)" },
  { code: "DISCOUNT30", discount: 30, label: "DISCOUNT30 (-30%)" },
];

export const formatVND = (amount: number): string => {
  return amount.toLocaleString("vi-VN") + " VND";
};
