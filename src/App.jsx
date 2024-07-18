import FileExplorer from "./components/FileExplorer";
import folderData from "./FileData.json";

const App = () => {
  return (
    <div>
      <FileExplorer folderData={folderData} />
    </div>
  );
};

export default App;
