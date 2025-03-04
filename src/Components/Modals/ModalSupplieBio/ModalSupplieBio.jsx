import React, { useState, useEffect } from 'react';

export const ModalSupplieBio = ({ isOpen, closeModal, selectedSupply, onUpdate, onDelete }) => {
  if (!isOpen) return null; 

  const [isEditing, setIsEditing] = useState(false);
  const [isDelete,setIsDeleting] = useState(false)

  const [edit, setEdit] = useState({
    Nombre: '',
    cantidad_utilizada: '',
    inventario_inicial: '',
    inventario_final: ''
  });

  useEffect(() => {
    if (selectedSupply) {
      setEdit({
        Nombre: selectedSupply.Nombre,
        cantidad_utilizada: selectedSupply.cantidad_utilizada,
        inventario_inicial: selectedSupply.inventario_inicial,
        inventario_final: selectedSupply.inventario_final,
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
      const response = await fetch(`http://localhost:3000/suppliesbRoutes/${selectedSupply._id}`, {
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
      const response = await fetch(`http://localhost:3000/suppliesbRoutes/${selectedSupply._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar los insumos');
      }
  
      const deletedSupply = await response.json();  
      alert('insumo eliminado')
      
      onDelete(deletedSupply); 
      setIsDeleting(false);   
      closeModal()
    } catch (error) {
      console.error('Error al eliminar el insumo:', error); 
      setIsDeleting(false); 
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={closeModal} className="close-button">X</button>
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
              <strong>cantidad_utilizada:</strong>
              <input 
                type="text" 
                name="cantidad_utilizada" 
                value={edit.cantidad_utilizada} 
                onChange={manejarCambio} 
              />
            </p>
            <p>
              <strong>inventario_inicial:</strong>
              <input 
                type="text" 
                name="inventario_inicial" 
                value={edit.inventario_inicial} 
                onChange={manejarCambio} 
              />
            </p>
            <p>
              <strong>inventario_final:</strong>
              <input 
                type="text" 
                name="inventario_final" 
                value={edit.inventario_final}
                onChange={manejarCambio} 
              />
            </p>
            <button className="buttonsCrud" onClick={guardarCambios}>Guardar Cambios</button>
          </>
        ) : (
          <>
            <h1>{edit.Nombre}</h1>
            <p><strong>cantidad_utilizada:</strong> {edit.cantidad_utilizada}</p>
            <p><strong>inventario_inicial:</strong> {edit.inventario_inicial}</p>
            <p><strong>inventario_final: </strong> {edit.inventario_final}</p>
            <p><strong>Fecha ultima actualizacion <br/></strong>{selectedSupply.updatedAt}</p>
            <button className="buttonsCrud" onClick={() => setIsEditing(true)}>Editar</button>
          </>
        )}
        <button className="buttonsCrud" onClick={deleteSupplie}>Eliminar</button>
      </div>
    </div>
  );
};
