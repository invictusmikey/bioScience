
import React from 'react';
import './ReloadButton.css'; 

export const ReloadButton = ({ refreshTable }) => {
  return (
    <div className="containerButtons">
      <button className="buttonsCrud" onClick={refreshTable}>
        Recargar Tabla
      </button>
    </div>
  );
};
