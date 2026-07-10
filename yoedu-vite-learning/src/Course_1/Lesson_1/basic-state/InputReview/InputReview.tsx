import { useState } from "react";

const InputReview = () => {
  const [text, setText] = useState("");

  return (
    <div className="white-card">
      <h1>Input Review</h1>
      <input
        type="text"
        className="modern-input"
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div 
        style={{ 
          marginTop: "1.5rem", 
          padding: "1rem", 
          backgroundColor: "#f3f4f6", 
          borderRadius: "8px",
          minHeight: "3rem",
          color: text ? "#1f2937" : "#9ca3af",
          fontWeight: 500,
          wordBreak: "break-word"
        }}
      >
        {text ? `You entered: ${text}` : "Waiting for input..."}
      </div>
    </div>
  );
};

export default InputReview;
