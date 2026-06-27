import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (  
    <div className="white-card" style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "2rem" }}>
        Counter: {count}
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <button className="modern-btn modern-btn-secondary" onClick={decrease}> 
          Decrease
        </button>
        <button className="modern-btn" onClick={increase}>
          Increase
        </button>
      </div>
    </div>
  );
}    

export default Counter;
