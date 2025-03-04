import React, { useState, useEffect } from 'react';
import './ModalInventoryBio.css';
import { ModalCheckList } from '../ModalCheckList/ModalChecklist';

export const ModalInventoryBio = ({ isOpen, closeModal, selectedSupply, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpenList, setIsOpList] = useState(false);

  const [edit, setEdit] = useState({
    equipo: '',
    serial: '',
    modelo: '',
    ubicacion: '',
    fechaMantenimiento: '',
    fechaProximoM: ''
  });

  useEffect(() => {
    if (selectedSupply) {
      setEdit({
        equipo: selectedSupply.equipo,
        serial: selectedSupply.serial,
        modelo: selectedSupply.modelo,
        ubicacion: selectedSupply.ubicacion,
      });
    }
  }, [selectedSupply]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const guardarCambios = async () => {
    try {
      const response = await fetch(`http://localhost:3000/inventorybRoutes/${selectedSupply._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edit),
      });

      if (!response.ok) throw new Error('Error al guardar los cambios');

      const updatedSupply = await response.json();
      onUpdate(updatedSupply);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const deleteSupplie = async () => {
    try {
      const response = await fetch(`http://localhost:3000/inventorybRoutes/${selectedSupply._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Error al eliminar los insumos');

      const deletedSupply = await response.json();
      alert('Insumo eliminado');
      if (typeof onDelete === 'function') {
        onDelete(deletedSupply);
      }
      setIsDeleting(false);
      closeModal();
    } catch (error) {
      console.error('Error al eliminar el insumo:', error);
      setIsDeleting(true);
    }
  };

  return (
    <>
      {!isOpenList && isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal} className="close-button">X</button>
            {isEditing ? (
              <>
                <h1>
                  <input type="text" name="equipo" value={edit.equipo} onChange={manejarCambio} />
                </h1>
                <p><strong>Serial:</strong>
                  <input type="text" name="serial" value={edit.serial} onChange={manejarCambio} />
                </p>
                <p><strong>Modelo:</strong>
                  <input type="text" name="modelo" value={edit.modelo} onChange={manejarCambio} />
                </p>
                <p><strong>Ubicación:</strong>
                  <input type="text" name="ubicacion" value={edit.ubicacion} onChange={manejarCambio} />
                </p>
                <button className="buttonsCrud" onClick={guardarCambios}>Guardar Cambios</button>
              </>
            ) : (
              <>
                <h1>{edit.equipo}</h1>
                <p><strong>Serial:</strong> {edit.serial}</p>
                <p><strong>Modelo:</strong> {edit.modelo}</p>
                <p><strong>Ubicación:</strong> {edit.ubicacion}</p>
                <p><strong>Fecha última actualización:</strong> {selectedSupply.updatedAt}</p>
                <button className="button-link" onClick={() => setIsOpList(true)}>Listado →</button>
              </>
            )}
            <button className="buttonsCrud" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="buttonsCrud" onClick={deleteSupplie}>Eliminar</button>
          </div>
        </div>
      )}

      {isOpenList && (
        <ModalCheckList
          id={selectedSupply._id}
          isOpen={isOpenList}
          isClose={() => setIsOpList(false)}
        />
      )}
    </>
  );
};