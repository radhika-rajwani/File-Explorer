/* eslint-disable react/prop-types */

import { useState } from "react";

const FileExplorer = ({ folderData }) => {
  const [showChildren, setShowChildren] = useState(false);
  const handleChildrenData = () => setShowChildren(!showChildren);

  return (
    <div className="ml-10 my-3">
      <div className="bdr">
        <h2 className=" pl-2">
          <span className="cursor-pointer ml-2" onClick={handleChildrenData}>
            {folderData.type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}
            {folderData.name}
            {folderData.type === "folder" ? (showChildren ? "🔺" : "🔻") : ""}
          </span>
        </h2>

        {/* Render child folders or files */}

        {showChildren &&
          folderData?.children?.map((childData, index) => (
            <FileExplorer key={index} folderData={childData} />
          ))}
      </div>
    </div>
  );
};

export default FileExplorer;
