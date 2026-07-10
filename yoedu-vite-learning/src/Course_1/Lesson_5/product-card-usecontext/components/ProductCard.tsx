import { useCart } from "../context/CartContext";
import type { Product } from "../constants";
import { formatVND } from "../constants";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Lấy hàm addToCart từ Context 
  const { addToCart } = useCart();

  return (
    <div className="l5-product-card">
      <h3 className="l5-product-name">{product.name}</h3>
      <p className="l5-product-price">{formatVND(product.price)}</p>
      <button
        className="l5-btn-add"
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
