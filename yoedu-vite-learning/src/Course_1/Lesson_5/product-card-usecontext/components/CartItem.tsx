import { useCart } from "../context/CartContext";
import type { CartItem as CartItemType } from "../context/CartContext";
import { formatVND } from "../constants";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="l5-cart-item">
      <p className="l5-cart-item-name">{item.product.name}</p>
      <div className="l5-cart-item-controls">
        <button
          className="l5-qty-btn"
          onClick={() => decreaseQty(item.product.id)}
        >
          -
        </button>
        <input
          className="l5-qty-input"
          type="number"
          value={item.quantity}
          readOnly
        />
        <button
          className="l5-qty-btn"
          onClick={() => increaseQty(item.product.id)}
        >
          +
        </button>
        <button
          className="l5-btn-remove"
          onClick={() => removeFromCart(item.product.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
