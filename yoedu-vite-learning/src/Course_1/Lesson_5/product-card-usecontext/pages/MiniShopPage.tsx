

import { CartProvider, useCart } from "../context/CartContext";
import { PRODUCTS } from "../constants";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";


const ShopHeader = () => {
  const { totalItems, openCart } = useCart();

  return (
    <header className="l5-shop-header">
      <span className="l5-shop-title">Mini Shop</span>
      <button className="l5-cart-btn" onClick={openCart}>
        Cart
        {totalItems > 0 && (
          <span className="l5-cart-badge">{totalItems}</span>
        )}
      </button>
    </header>
  );
};

// Danh sách sản phẩm
const ProductList = () => {
  return (
    <div className="l5-product-list">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// Page chính 
const MiniShopPage = () => {
  return (
    <CartProvider>
      <div className="l5-shop-container">
        <ShopHeader />
        <ProductList />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default MiniShopPage;
