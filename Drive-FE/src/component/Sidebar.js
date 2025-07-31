import React, { useRef } from "react";
import "./Sidebar.css";

function Sidebar({ onFileSelect, onTrashClick, onMyDriveClick,onStarredClick  }) {
  const hiddenFileInput = useRef(null);

  const handleClick = () => hiddenFileInput.current.click();

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="sidebar">
      <button className="new-btn" onClick={handleClick}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
          alt="New"
          width="20"
          style={{ marginRight: "8px" }}
        />
        New
      </button>

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <ul>
        <li onClick={onMyDriveClick}>📁 My Drive</li>
        <li>💻 Computers</li>
        <li>👥 Shared with me</li>
        <li>🕒 Recent</li>
        <li onClick={onStarredClick}>⭐ Starred</li>

        <li onClick={onTrashClick}>🗑️ Trash</li>
        <li>☁️ Storage</li>
      </ul>
    </div>
  );
}

export default Sidebar;
