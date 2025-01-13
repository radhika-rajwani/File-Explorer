import React from "react";

// Modal Component
const InputModal = ({ isOpen, onClose, onConfirm, inputValue, onInputChange }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{inputValue ? "Rename Item" : "Enter Name"}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          placeholder="Enter item name"
          className="input-field"
        />
        <div className="modal-actions">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
