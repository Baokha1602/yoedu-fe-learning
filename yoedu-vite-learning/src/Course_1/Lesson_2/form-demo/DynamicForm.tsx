import { useState } from "react";

const fields = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "age", label: "Age" },
  { name: "score", label: "Score" },
];

function DynamicForm() {
  const [form, setForm] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            value={form[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;