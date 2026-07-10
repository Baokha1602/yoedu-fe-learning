import React, { useState } from "react";
import UserItemNew from "./UserItemNew";
import type { User } from "./UserItemNew";

const UserListNew: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [newUser, setNewUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddUser = () => {
    if (!newUser.trim()) return;
    setUsers([...users, { id: Date.now(), name: newUser.trim() }]);
    setNewUser("");
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditValue("");
    }
  };

  const handleEditUser = (user: User) => {
    setEditId(user.id);
    setEditValue(user.name);
  };

  const handleSaveEdit = () => {
    if (!editValue.trim() || editId === null) return;
    setUsers(
      users.map((user) =>
        user.id === editId ? { ...user, name: editValue.trim() } : user
      )
    );
    setEditId(null);
    setEditValue("");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>User List (New)</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "8px 12px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />

      {/* Add User Input & Button */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Add new user..."
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add</button>
      </div>

      {/* List */}
      <ul>
        {filteredUsers.map((user) => (
          <UserItemNew
            key={user.id}
            user={user}
            isEditing={editId === user.id}
            editValue={editValue}
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
            onChangeEdit={setEditValue}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={() => setEditId(null)}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserListNew;
