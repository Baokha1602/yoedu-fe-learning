import { useState } from 'react';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn); 
  };

  return (
    <div className="white-card" style={{ textAlign: "center", maxWidth: "300px" }}>
      <h2 style={{ marginBottom: "1rem", color: isOn ? "var(--primary)" : "#6b7280", transition: "color 0.3s ease" }}>
        Status: {isOn ? "ON" : "OFF"}
      </h2>
      
      <button 
        className={`modern-btn ${isOn ? '' : 'modern-btn-secondary'}`} 
        onClick={handleToggle}
        style={{ width: "100%", padding: "12px" }}
      >
        {isOn ? "Turn Off" : "Turn On"}
      </button>
    </div>
  );
};

export default ToggleButton;