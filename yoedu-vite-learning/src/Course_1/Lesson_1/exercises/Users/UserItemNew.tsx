import React from "react";

export interface User {
  id: number;
  name: string;
}

export interface UserItemNewProps {
  user: User;
  isEditing: boolean;
  editValue: string;
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
  onChangeEdit: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const UserItemNew: React.FC<UserItemNewProps> = ({
  user,
  isEditing,
  editValue,
  onDelete,
  onEdit,
  onChangeEdit,
  onSaveEdit,
  onCancelEdit,
}) => {
  if (isEditing) {
    return (
      <li style={{ marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input
            value={editValue}
            onChange={(e) => onChangeEdit(e.target.value)}
          />
          <button onClick={onSaveEdit}>✓</button>
          <button onClick={onCancelEdit}>X</button>
        </div>
      </li>
    );
  }

  return (
    <li style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span>{user.name}</span>
        <button onClick={() => onEdit(user)}>✏️</button>
        <button onClick={() => onDelete(user.id)}>❌</button>
      </div>
    </li>
  );
};

export default UserItemNew;