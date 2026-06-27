import { useState } from "react";

// khoi tao state de luu danh sach sinh vien
const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // ham them hoac cap nhat sinh vien
  const handleSaveUser = () => {
    if (!userName.trim()) return;

    if (editingUserId !== null) {
      setUsers(
        users.map((user) =>
          user.id === editingUserId ? { ...user, name: userName } : user
        )
      );
      setEditingUserId(null);
    } else {
      const newUserObj = { id: Date.now(), name: userName };
      setUsers([...users, newUserObj]);
    }
    setUserName(""); // Clear input after save
  };

  // ham sua
  const startEditUser = (user: { id: number; name: string }) => {
    setEditingUserId(user.id);
    setUserName(user.name);
  };

  // ham xoa sinh vien khoi danh sach
  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    if (editingUserId === id) {
      setEditingUserId(null);
      setUserName("");
    }
  };

  // ham loc danh sach sinh vien theo tu khoa tim kiem
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  );

  return (
    <div className="white-card">
      <h1>Student List</h1>

      <input
        className="modern-input"
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex-row">
        <input
          className="modern-input flex-1"
          style={{ marginBottom: 0 }}
          placeholder="Enter student name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSaveUser()}
        />
        <button className="modern-btn" onClick={handleSaveUser}>
          {editingUserId !== null ? "Update" : "Add"}
        </button>
        {editingUserId !== null && (
          <button
            className="modern-btn modern-btn-secondary"
            onClick={() => {
              setEditingUserId(null);
              setUserName("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="modern-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} className="modern-list-item">
              <span className="user-name">{user.name}</span>
              <div className="actions">
                <button
                  className="modern-btn modern-btn-warning"
                  style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                  onClick={() => startEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="modern-btn modern-btn-danger"
                  style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="modern-list-item" style={{ justifyContent: "center", color: "#9ca3af" }}>
            No students found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
