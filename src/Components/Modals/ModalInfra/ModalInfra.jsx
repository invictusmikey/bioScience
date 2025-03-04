import React, { useState, useEffect } from 'react';
import './ModalInfra.css';

export const ModalInfra = ({ isOpen, closeModal, selectedSupply, onUpdate , onDelete }) => {
  if (!isOpen || !selectedSupply) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDeleting] = useState(false)

  const [edit, setEdit] = useState({
    Nombre: '',
    Descripcion: '',
    Estado: '',
    InventarioInicial: ''
  });


  useEffect(() => {
    if (selectedSupply) {
      setEdit({
        Nombre: selectedSupply.Nombre,
        Descripcion: selectedSupply.Descripcion,
        Estado: selectedSupply.Estado,
        InventarioInicial: selectedSupply.InventarioInicial,
      });
    }
  }, [selectedSupply]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const guardarCambios = async () => {
    try {
      const response = await fetch(`http://localhost:3000/suppliesiRoutes/${selectedSupply._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(edit),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      const updatedSupply = await response.json();
      onUpdate(updatedSupply);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const deleteSupplie = async () => {
    try {
      const response = await fetch(`http://localhost:3000/suppliesiRoutes/${selectedSupply._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar los insumos');
      }
  
      const deletedSupply = await response.json();  
      
      
      onDelete(deletedSupply);
      
      setIsDeleting(false);   
      alert('insumo eliminado') 
      closeModal()
    } catch (error) {
      console.error('Error al eliminar el insumo:', error); 
      setIsDeleting(false); 
    }
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={closeModal}>X</button>
          {isEditing ? (
            <>
              <h1>
                <input
                  type="text"
                  name="Nombre"
                  value={edit.Nombre}
                  onChange={manejarCambio}
                />
              </h1>
              <p>
                <strong>Descripción:</strong>
                <input
                  type="text"
                  name="Descripcion"
                  value={edit.Descripcion}
                  onChange={manejarCambio}
                />
              </p>
              <p>
                <strong>Estado:</strong>
                <input
                  type="text"
                  name="Estado"
                  value={edit.Estado}
                  onChange={manejarCambio}
                />
              </p>
              <p>
                <strong>Inventario Inicial:</strong>
                <input
                  type="text"
                  name="InventarioInicial"
                  value={edit.InventarioInicial}
                  onChange={manejarCambio}
                />
              </p>
              <button className="buttonsCrud" onClick={guardarCambios}>Guardar Cambios</button>
            </>
          ) : (
          <>
            <h1>{edit.Nombre}</h1>
            <p><strong>Descripción:</strong> {edit.Descripcion}</p>
            <p><strong>Estado:</strong> {edit.Estado}</p>
            <p><strong>Inventario Inicial:</strong> {edit.InventarioInicial}</p>
            <p><strong>Última fecha de cambio en el inventario :</strong> <br /> {selectedSupply.updatedAt}</p>
            <button className="buttonsCrud" onClick={() => setIsEditing(true)}>Editar</button>
          </>
        )}
        <button  onClick={deleteSupplie} className="buttonsCrud" >Eliminar</button>
      </div>
    </div>
  );
};
