import React, { useState } from "react";

// Recursive File Explorer Component
const FileExplorer = ({ folderData, parentPath, onNavigate, isRoot }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If we are at the root, ensure folders are collapsed
  React.useEffect(() => {
    if (isRoot) {
      setIsExpanded(false); // Collapse all folders at the root
    }
  }, [isRoot]);

  const handleFolderClick = () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);

    // When expanding a folder, append the folder name to the current path
    const newPath = `${parentPath}/${folderData.name}`.replace(/\/+/g, "/"); // Prevent double slashes
    onNavigate(newPath);
  };

  return (
    <div className="ml-6">
      <div>
        <span className="cursor-pointer" onClick={handleFolderClick}>
          {folderData.type === "folder" ? (
            isExpanded ? (
              <span>📂 🔺</span> // Down arrow when expanded
            ) : (
              <span>📁 🔻</span> // Right arrow when collapsed
            )
          ) : (
            <span>📄</span> // For files, just display file icon
          )}
          {folderData.name}
        </span>
      </div>

      {/* Render child folders or files */}
      {isExpanded &&
        folderData.children?.map((child, index) => (
          <FileExplorer
            key={index}
            folderData={child}
            parentPath={parentPath}  // Pass the current parent path, not full path
            onNavigate={onNavigate}
            isRoot={isRoot}  // Pass isRoot flag
          />
        ))}
    </div>
  );
};

// Main File Explorer with Path Bar Component
const FileExplorerWithPathBar = ({ folderData }) => {
  const [currentPath, setCurrentPath] = useState("/");
  const [pathHistory, setPathHistory] = useState(["/"]); // Track navigation history
  const [isRoot, setIsRoot] = useState(true); // Track whether we're at the root level

  const navigateToPath = (path) => {
    setCurrentPath(path);
    setPathHistory((prevHistory) => [...prevHistory, path]); // Add to history
    setIsRoot(path === "/"); // Set isRoot to true if we're at the root
  };

  // Function to clean up and manage the path bar segments
  const getPathSegments = () => {
    const segments = currentPath.split("/").filter(Boolean); // Splitting and removing empty segments
    return segments;
  };

  const handleBackNavigation = () => {
    // Split the path into segments, remove the last one, and join them back into a string
    const segments = currentPath.split("/").filter(Boolean);
    segments.pop(); // Remove the last segment
    const newPath = segments.length > 0 ? `/${segments.join("/")}` : "/"; // Rebuild the path

    setCurrentPath(newPath); // Update the path
    setPathHistory((prevHistory) => [...prevHistory, newPath]); // Optional: Keep the history updated
    setIsRoot(newPath === "/"); // Set isRoot based on whether we're at the root
  };

  return (
    <div>
      {/* Path Bar */}
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
          const segmentPath = `/${getPathSegments().slice(0, index + 1).join("/")}`; // Relative path for each segment

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

      {/* File Explorer */}
      <FileExplorer
        folderData={folderData}
        parentPath={currentPath} // Pass the current path as parentPath, not full path
        onNavigate={(newPath) => {
          if (currentPath !== newPath) {
            setCurrentPath(newPath); // Update path only when changed
          }
        }}
        isRoot={isRoot}  // Pass isRoot flag to FileExplorer to reset expanded state
      />
    </div>
  );
};

export default FileExplorerWithPathBar;
