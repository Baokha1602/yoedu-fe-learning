import { useCart } from "../context/CartContext";
import { COUPONS, formatVND } from "../constants";
import CartItem from "./CartItem";

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    selectedCoupon,
    applyCoupon,
    subtotal,
    discount,
    totalAfterDiscount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay mờ phía sau */}
      <div className="l5-overlay" onClick={closeCart} />

      {/* Drawer panel */}
      <div className="l5-cart-drawer">
        {/* Header */}
        <div className="l5-drawer-header">
          <button className="l5-close-btn" onClick={closeCart}>
            ✕
          </button>
          <h2 className="l5-drawer-title">Your Cart</h2>
        </div>

        {/* Nội dung giỏ hàng */}
        <div className="l5-drawer-body">
          {cartItems.length === 0 ? (
            <p className="l5-empty-cart">Giỏ hàng trống</p>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))
          )}

          {/* Chọn mã giảm giá */}
          {cartItems.length > 0 && (
            <div className="l5-coupon-section">
              <label className="l5-coupon-label">Chọn mã giảm giá</label>
              <select
                className="l5-coupon-select"
                value={selectedCoupon?.code ?? ""}
                onChange={(e) => {
                  const found = COUPONS.find((c) => c.code === e.target.value);
                  applyCoupon(found ?? null);
                }}
              >
                <option value="">Chọn coupon</option>
                {COUPONS.map((coupon) => (
                  <option key={coupon.code} value={coupon.code}>
                    {coupon.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Footer tổng tiền */}
        {cartItems.length > 0 && (
          <div className="l5-drawer-footer">
            <p className="l5-subtotal">
              Tạm tính: <span>{formatVND(subtotal)}</span>
            </p>
            <p className="l5-discount">
              Giảm giá:{" "}
              <span className="l5-discount-value">
                {discount > 0 ? `-${formatVND(discount)}` : `0 VND`}
              </span>
            </p>
            <p className="l5-total">
              Tổng tiền: <strong>{formatVND(totalAfterDiscount)}</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
