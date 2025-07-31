import React, { useState, useEffect } from "react";
import Sidebar from "../src/component/Sidebar";
import Header from "../src/component/Header";
import FileCard from "../src/component/FileCard";
import "./DriveApp.css";
import axios from "axios";

function DriveApp() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewTrash, setViewTrash] = useState(false);
  const [viewStarred, setViewStarred] = useState(false);

  console.log("viewStarred:", viewStarred, "viewTrash:", viewTrash);

  const loadFiles = async () => {
    try {
      let endpoint = "http://localhost:8080/api/files/list";
      if (viewTrash) endpoint = "http://localhost:8080/api/files/trash";
      else if (viewStarred) endpoint = "http://localhost:8080/api/files/starred";

      const res = await axios.get(endpoint);
      setFiles(res.data);
    } catch (error) {
      console.error("Failed to load files:", error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [viewTrash, viewStarred]); // reload when view changes

  const handleUploadFromSidebar = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:8080/api/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    loadFiles(); // refresh view
  };

  const handleDownload = (id) => {
    window.location.href = `http://localhost:8080/api/files/download/${id}`;
  };

  const handleToggleStar = async (id) => {
    await axios.put(`http://localhost:8080/api/files/${id}/star`);
    loadFiles();
  };

  const handleDelete = async (id, fileName) => {
    const confirmed = window.confirm(
      `Are you sure you want to move "${fileName}" to trash?`
    );
    if (!confirmed) return;

    await axios.put(`http://localhost:8080/api/files/${id}/trash`);
    loadFiles();
  };

  // Filter files based on search term & view
  const filteredFiles = files
    .filter((file) => (!viewTrash ? !file.deleted : true))
    .filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="main-layout">
      <Sidebar
        onFileSelect={handleUploadFromSidebar}
        onTrashClick={() => {
          setViewTrash(true);
          setViewStarred(false);
        }}
        onMyDriveClick={() => {
          setViewTrash(false);
          setViewStarred(false);
        }}
        onStarredClick={() => {
          setViewStarred(true);
          setViewTrash(false);
        }}
      />

      <div className="content-area">
        <Header onSearch={setSearchTerm} />

        <h2 style={{ marginBottom: "16px", fontWeight: "600" }}>
          {viewTrash
            ? "🗑️ Trash"
            : viewStarred
            ? "⭐ Starred"
            : "📁 My Drive"}{" "}
          ({filteredFiles.length} files)
        </h2>

        {filteredFiles.length === 0 ? (
          <div className="empty-state">
            <img src="/default.svg" alt="No Files" style={{ width: "500px" }} />
            <p>
              Drag your files and folders here or use the “New” button to upload
            </p>
          </div>
        ) : (
          <div className="files-grid">
            {filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onDownload={handleDownload}
                onDelete={() => handleDelete(file.id, file.name)}
                onToggleStar={() => handleToggleStar(file.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DriveApp;
