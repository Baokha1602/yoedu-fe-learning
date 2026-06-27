import React from "react";

export interface ToDo {
  id: number;
  text: string;
  isDeleted: boolean;
}

export interface ToDoItemNewProps {
  toDo: ToDo;
  isEditing: boolean;
  editValue: string;
  onDelete: (id: number) => void;
  onEdit: (toDo: ToDo) => void;
  onChangeEdit: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const ToDoItemNew: React.FC<ToDoItemNewProps> = ({
    toDo,
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
                <span style={{ textDecoration: toDo.isDeleted ? "line-through" : "none", color: toDo.isDeleted ? "#9ca3af" : "inherit" }}>
                    {toDo.text}
                </span>
                <button onClick={() => onEdit(toDo)} disabled={toDo.isDeleted}>✏️</button>
                <button onClick={() => onDelete(toDo.id)} disabled={toDo.isDeleted}>❌</button>
            </div>
        </li>
    );
};

export default ToDoItemNew;