import React, { useState } from "react";
import CartItem from "./CartItem";
import type { Product } from "./CartItem";

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([
    { id: 1, name: "Iphone", price: 1000, quantity: 1 },
    { id: 2, name: "Macbook", price: 2000, quantity: 2 },
    { id: 3, name: "AirPods", price: 250, quantity: 3 },
  ]);

  // Khởi tạo các state tìm kiếm và ô thêm mới
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState<number | "">("");

  // Khởi tạo các state chỉnh sửa
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number | "">("");

  // Hàm thêm sản phẩm mới
  const handleAddProduct = () => {
    if (!newName.trim() || newPrice === "" || newPrice <= 0) return;
    setCart([
      ...cart,
      {
        id: Date.now(),
        name: newName.trim(),
        price: Number(newPrice),
        quantity: 1,
      },
    ]);
    setNewName("");
    setNewPrice("");
  };

  // Hàm  sửa sản phẩm
  const handleEditProduct = (product: Product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  // Lưu chỉnh sửa sản phẩm
  const handleSaveEdit = () => {
    if (!editName.trim() || editPrice === "" || editPrice <= 0 || editId === null) return;
    setCart(
      cart.map((item) =>
        item.id === editId
          ? { ...item, name: editName.trim(), price: Number(editPrice) }
          : item
      )
    );
    setEditId(null);
    setEditName("");
    setEditPrice("");
  };

  // Hàm Xóa sản phẩm khỏi giỏ hàng
  const handleDeleteProduct = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditName("");
      setEditPrice("");
    }
  };

  // Hàm tăng số lượng (+)
  const handleIncrease = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng (-)
  const handleDecrease = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm Tìm kiếm lọc sản phẩm theo tên
  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính Tổng tiền giỏ hàng 
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="white-card" style={{ maxWidth: "600px" }}>
      <h1>Shopping Cart</h1>

      {/* Search Input */}
      <input
        type="text"
        className="modern-input"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Product Row */}
      <div className="flex-row">
        <input
          type="text"
          className="modern-input flex-1"
          style={{ marginBottom: 0 }}
          placeholder="Product name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          className="modern-input"
          style={{ marginBottom: 0, width: "120px" }}
          placeholder="Price..."
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value === "" ? "" : Number(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleAddProduct()}
        />
        <button className="modern-btn" onClick={handleAddProduct}>
          Add
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <ul className="modern-list">
        {filteredCart.length > 0 ? (
          filteredCart.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              isEditing={editId === item.id}
              editName={editName}
              editPrice={editPrice}
              onChangeEditName={setEditName}
              onChangeEditPrice={setEditPrice}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={() => setEditId(null)}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          ))
        ) : (
          <li className="modern-list-item" style={{ justifyContent: "center", color: "#9ca3af" }}>
            No products found.
          </li>
        )}
      </ul>

      {/* Hiển thị tổng tiền */}
      <div
        style={{
          marginTop: "20px",
          paddingTop: "15px",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>Total:</span>
        <span style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--primary)" }}>
          ${totalAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ShoppingCart;
