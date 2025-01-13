import React, { useState } from "react";
import InputModal from "./InputModel";

const ActionButtons = ({ onCreateFile, onCreateFolder, onDelete, onRename }) => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Restore modal state
  const [currentAction, setCurrentAction] = useState(null);

  const openModal = (action) => {
    setCurrentAction(action);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setInputValue(""); // Clear input field
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  const handleConfirm = () => {
    if (currentAction === "CreateFile") onCreateFile(inputValue);
    if (currentAction === "CreateFolder") onCreateFolder(inputValue);
    if (currentAction === "Rename") onRename(inputValue);
    setIsModalOpen(false); // Close modal
    setInputValue(""); // Clear input field
  };

  return (
    <div className="button-container">
      <button
        className="create-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => openModal("CreateFile")}
      >
        Create File
      </button>
      <button
        className="create-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        onClick={() => openModal("CreateFolder")}
      >
        Create Folder
      </button>
      <button
        className="create-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={() => onDelete()}
      >
        Delete
      </button>
      <button
        className="create-button bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        onClick={() => openModal("Rename")}
      >
        Rename
      </button>

      {/* Modal */}
      <InputModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default ActionButtons;
