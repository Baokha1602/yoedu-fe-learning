import { useState } from "react";

interface ToDo {
  id: number;
  text: string;
  isDeleted: boolean;
}

const ToDoList = () => {
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
        todo.id === id ? { ...todo, text: editToDoText } : todo,
      ),
    );
    setEditingToDoId(null);
  };

  // ham xoa mem todo
  const softDeleteToDo = (id: number) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, isDeleted: true } : todo,
      ),
    );

    if (editingToDoId === id) {
      setEditingToDoId(null);
    }
  };

  // ham loc danh sach todo theo tu khoa tim kiem

  const filteredTodos = toDos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="white-card">
      <h1>To-Do List</h1>

      <input
        className="modern-input"
        placeholder="Search todo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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

      <ul className="modern-list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <li key={todo.id} className="modern-list-item">
              {editingToDoId === todo.id ? (
                <div
                  className="flex-row"
                  style={{ width: "100%", marginBottom: 0 }}
                >
                  <input
                    className="modern-input flex-1"
                    style={{ marginBottom: 0 }}
                    value={editToDoText}
                    onChange={(e) => setEditToDoText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                  />
                  <button
                    className="modern-btn"
                    style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                    onClick={() => saveEdit(todo.id)}
                  >
                    Save
                  </button>
                  <button
                    className="modern-btn modern-btn-secondary"
                    style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                    onClick={() => setEditingToDoId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className="user-name"
                    style={{
                      textDecoration: todo.isDeleted ? "line-through" : "none",
                      color: todo.isDeleted ? "#9ca3af" : "inherit",
                    }}
                  >
                    {todo.text}
                  </span>
                  <div className="actions">
                    <button
                      className="modern-btn modern-btn-warning"
                      style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                      onClick={() => startEditToDo(todo)}
                      disabled={todo.isDeleted}
                      style={
                        todo.isDeleted
                          ? {
                              opacity: 0.5,
                              cursor: "not-allowed",
                              padding: "6px 12px",
                              fontSize: "0.875rem",
                            }
                          : { padding: "6px 12px", fontSize: "0.875rem" }
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="modern-btn modern-btn-danger"
                      style={{ padding: "6px 12px", fontSize: "0.875rem" }}
                      onClick={() => softDeleteToDo(todo.id)}
                      disabled={todo.isDeleted}
                      style={
                        todo.isDeleted
                          ? {
                              opacity: 0.5,
                              cursor: "not-allowed",
                              padding: "6px 12px",
                              fontSize: "0.875rem",
                            }
                          : { padding: "6px 12px", fontSize: "0.875rem" }
                      }
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li
            className="modern-list-item"
            style={{ justifyContent: "center", color: "#9ca3af" }}
          >
            No todos found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
