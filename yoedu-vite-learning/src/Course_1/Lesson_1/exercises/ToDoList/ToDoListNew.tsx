import React, { useState } from "react";
import ToDoItemNew from "./ToDoItemNew";
import type { ToDo } from "./ToDoItemNew";

const ToDoListNew: React.FC = () => {
  const [toDos, setToDos] = useState<ToDo[]>([
    {
      id: 1,
      text: "Learn React",
      isDeleted: false,
    },
    {
      id: 2,
      text: "Learn TypeScript",
      isDeleted: true,
    },
  ]);

  const [newToDoText, setNewToDoText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingToDoId, setEditingToDoId] = useState<number | null>(null);
  const [editToDoText, setEditToDoText] = useState("");

  // ham them todo
  const handleAddToDo = () => {
    if (!newToDoText.trim()) return;
    setToDos([
      ...toDos,
      { id: Date.now(), text: newToDoText, isDeleted: false },
    ]);
    setNewToDoText("");
  };

  // ham sua todo
  const startEditToDo = (toDo: ToDo) => {
    setEditingToDoId(toDo.id);
    setEditToDoText(toDo.text);
  };

  // ham luu todo sau khi sua
  const saveEdit = (id: number) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, text: editToDoText } : todo
      )
    );
    setEditingToDoId(null);
    setEditToDoText("");
  };

  // ham xoa mem todo
  const softDeleteToDo = (id: number) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, isDeleted: true } : todo
      )
    );
    if (editingToDoId === id) {
      setEditingToDoId(null);
      setEditToDoText("");
    }
  };

  const filteredTodos = toDos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="white-card">
      <h1>To-Do List (New)</h1>

      {/* Search Input */}
      <input
        className="modern-input"
        placeholder="Search todo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Todo Input & Button */}
      <div className="flex-row">
        <input
          className="modern-input flex-1"
          style={{ marginBottom: 0 }}
          placeholder="Add new todo..."
          value={newToDoText}
          onChange={(e) => setNewToDoText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddToDo()}
        />
        <button className="modern-btn" onClick={handleAddToDo}>
          Add
        </button>
      </div>

      {/* List */}
      <ul className="modern-list">
        {filteredTodos.map((todo) => (
          <ToDoItemNew
            key={todo.id}
            toDo={todo}
            isEditing={editingToDoId === todo.id}
            editValue={editToDoText}
            onDelete={softDeleteToDo}
            onEdit={startEditToDo}
            onChangeEdit={setEditToDoText}
            onSaveEdit={() => saveEdit(todo.id)}
            onCancelEdit={() => setEditingToDoId(null)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoListNew;
