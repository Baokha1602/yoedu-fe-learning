import React from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type CartItemProps = {
  product: Product;
  isEditing: boolean;
  editName: string;
  editPrice: number | "";
  onChangeEditName: (name: string) => void;
  onChangeEditPrice: (price: number | "") => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  product,
  isEditing,
  editName,
  editPrice,
  onChangeEditName,
  onChangeEditPrice,
  onSaveEdit,
  onCancelEdit,
  onEdit,
  onDelete,
  onIncrease,
  onDecrease,
}) => {
  return (
    <li className="modern-list-item" style={{ padding: "16px 20px" }}>
      {isEditing ? (
        <div className="flex-row" style={{ width: "100%", marginBottom: 0 }}>
          <input
            type="text"
            className="modern-input flex-1"
            style={{ marginBottom: 0 }}
            value={editName}
            onChange={(e) => onChangeEditName(e.target.value)}
            placeholder="Product name"
          />
          <input
            type="number"
            className="modern-input"
            style={{ marginBottom: 0, width: "120px" }}
            value={editPrice}
            onChange={(e) => onChangeEditPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Price"
          />
          <button
            className="modern-btn"
            style={{ padding: "6px 12px", fontSize: "0.875rem" }}
            onClick={onSaveEdit}
          >
            Save
          </button>
          <button
            className="modern-btn modern-btn-secondary"
            style={{ padding: "6px 12px", fontSize: "0.875rem" }}
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          {/* Thông tin sản phẩm bên trái */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontWeight: 600, fontSize: "1.1rem", color: "#1f2937" }}>
              {product.name}
            </span>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              ${product.price.toLocaleString()} × {product.quantity}
            </span>
          </div>

          {/* Thành tiền & Các nút hành động bên phải */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontWeight: 600, fontSize: "1.1rem", color: "var(--primary)" }}>
              ${(product.price * product.quantity).toLocaleString()}
            </span>
            
            <div className="actions" style={{ display: "flex", gap: "6px" }}>
              <button
                className="modern-btn modern-btn-secondary"
                style={{ padding: "6px 12px", fontSize: "0.875rem", fontWeight: "bold" }}
                onClick={() => onIncrease(product.id)}
              >
                +
              </button>
              <button
                className="modern-btn modern-btn-secondary"
                style={{ padding: "6px 12px", fontSize: "0.875rem", fontWeight: "bold" }}
                onClick={() => onDecrease(product.id)}
              >
                -
              </button>
              <button
                className="modern-btn modern-btn-warning"
                style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                onClick={() => onEdit(product)}
              >
                ✏️
              </button>
              <button
                className="modern-btn modern-btn-danger"
                style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                onClick={() => onDelete(product.id)}
              >
                ❌
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default CartItem;