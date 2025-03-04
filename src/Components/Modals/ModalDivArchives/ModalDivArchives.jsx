import { useState, useEffect } from 'react';
import './ModalDivArchives.css';

export const ModalDivArchives = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/directorysRoutes", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener archivos");
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta API:", data);
        setFiles(Array.isArray(data.directory) ? data.directory : []);
      })
      .catch((err) => setError(err.message));
  }, []);

  const truncateFileName = (name, maxLength = 7) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

  const openFileInNewTab = (file) => {
    const fileUrl = `http://localhost:3000/directorysRoutes/${file}`;
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="modal-archives">
      <button className="closeButton" onClick={onClose}>X</button>
      <div className="modal-content-archives">
        <h2>Lista de archivos 📂</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul className="list-archives">
          {files.length > 0 ? (
            files.map((file, index) => (
              <li 
                key={index} 
                className="list-interna" 
                title={file}
                onClick={() => openFileInNewTab(file)}
              >
                {truncateFileName(file)}
              </li>
            ))
          ) : (
            <p>No hay archivos disponibles</p>
          )}
        </ul>
      </div>
    </div>
  );
};