import React, { useState, useEffect } from "react";
import ActionButtons from "./ActionButtons";
import FileData from "../FileData.json"
const FileExplorer = ({ folderData, parentPath, onNavigate, isRoot, resetState }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isRoot || resetState) {
      setIsExpanded(false); // Collapse all folders at the root or if resetState is triggered
    }
  }, [isRoot, resetState]);

  const handleFolderClick = () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);

    const newPath = `${parentPath}/${folderData.name}`.replace(/\/+/g, "/"); // Prevent double slashes
    onNavigate(newPath);
  };

  return (
    <div className="ml-6">
      <div>
        <span className="cursor-pointer" onClick={handleFolderClick}>
          {folderData.type === "folder" ? (
            isExpanded ? (
              <span>📂 🔺</span>
            ) : (
              <span>📁 🔻</span>
            )
          ) : (
            <span>📄</span>
          )}
          {folderData.name}
        </span>
      </div>

      {isExpanded &&
        folderData.children?.map((child, index) => (
          <FileExplorer
            key={index}
            folderData={child}
            parentPath={parentPath}
            onNavigate={onNavigate}
            isRoot={false}
            resetState={false}
          />
        ))}
    </div>
  );
};

const FileExplorerWithPathBar = () => {
  const [folderData, setFolderData] = useState(FileData); // Initialize with JSON data
  const [currentPath, setCurrentPath] = useState("/");
  const [isRoot, setIsRoot] = useState(true);
  const [resetState, setResetState] = useState(false);

  const navigateToPath = (path) => {
    const cleanedPath = path.replace(/\/+/g, "/");
    setCurrentPath(cleanedPath);
    setIsRoot(cleanedPath === "/");
    setResetState(cleanedPath === "/");
  };

  const getPathSegments = () => {
    return currentPath.split("/").filter(Boolean);
  };

  const handleBackNavigation = () => {
    const segments = currentPath.split("/").filter(Boolean);
    segments.pop();
    const newPath = segments.length > 0 ? `/${segments.join("/")}` : "/";
    navigateToPath(newPath);
  };

  const findTarget = (path, data) => {
    const segments = path.split("/").filter(Boolean); // Split path into segments
    let current = { children: data }; // Start from the root

    for (const segment of segments) {
      current = current.children?.find((item) => item.name === segment);
      if (!current) return null; // If no match is found, return null
    }
    return current;
  };

  const onCreateFile = (name) => {
    const target = findTarget(currentPath, folderData.children);
    if (target && target.type === "folder") {
      target.children.push({ name, type: "file", children: [] }); // Add file to target folder
      setFolderData({ ...folderData }); // Trigger re-render
    } else {
      console.error("Invalid target: Cannot create file here.");
    }
  };

  const onCreateFolder = (name) => {
    const target = findTarget(currentPath, folderData.children);
    if (target && target.type === "folder") {
      target.children.push({ name, type: "folder", children: [] }); // Add folder to target folder
      setFolderData({ ...folderData }); // Trigger re-render
    } else {
      console.error("Invalid target: Cannot create folder here.");
    }
  };

  const onDelete = (name) => {
    const target = findTarget(currentPath, folderData.children);
    if (target) {
      target.children = target.children.filter((child) => child.name !== name); // Remove item
      setFolderData({ ...folderData }); // Trigger re-render
    } else {
      console.error("Invalid target: Cannot delete.");
    }
  };

  const onRename = (oldName, newName) => {
    const target = findTarget(currentPath, folderData.children);
    if (target) {
      const item = target.children.find((child) => child.name === oldName);
      if (item) {
        item.name = newName; // Rename item
        setFolderData({ ...folderData }); // Trigger re-render
      } else {
        console.error("Item not found for renaming.");
      }
    } else {
      console.error("Invalid target: Cannot rename.");
    }
  };

  return (
    <div>
      <ActionButtons
        onCreateFile={onCreateFile}
        onCreateFolder={onCreateFolder}
        onDelete={() => console.log("Delete")} // Replace with logic to get the selected file/folder
        onRename={(newName) => console.log(`Rename to: ${newName}`)} // Replace with logic for renaming
      />
      <div className="path-bar bg-gray-200 p-2 flex items-center space-x-2">
        <button
          className="go-back cursor-pointer text-blue-500"
          onClick={handleBackNavigation}
        >
          Go Back
        </button>
        <button
          className="cursor-pointer text-blue-500"
          onClick={() => navigateToPath("/")}
        >
          /
        </button>
        {getPathSegments().map((segment, index) => {
          const segmentPath = `/${getPathSegments().slice(0, index + 1).join("/")}`;
          return (
            <span key={index}>
              {" / "}
              <button
                className="cursor-pointer text-blue-500"
                onClick={() => navigateToPath(segmentPath)}
              >
                {segment}
              </button>
            </span>
          );
        })}
      </div>
      <FileExplorer
        folderData={folderData}
        parentPath={currentPath}
        onNavigate={(newPath) => {
          if (currentPath !== newPath) {
            setCurrentPath(newPath);
          }
        }}
        isRoot={isRoot}
        resetState={resetState}
      />
    </div>
  );
};

export default FileExplorerWithPathBar;
