import React from "react";

const ViewToggleIcon = ({ active, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className="d-flex align-items-center justify-content-center"
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
        padding: "8px 16px",
        height: "40px",
        cursor: "pointer",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1="12"
          y1="3"
          x2="12"
          y2="21"
          stroke="black"
          strokeWidth="2"
          opacity={active ? "1" : "0.2"}
        />
      </svg>
      <span className="ms-2 fw-medium" style={{ fontSize: "15px" }}>
        {active ? "List" : "Grid"}
      </span>
    </div>
  );
};

export default ViewToggleIcon;
