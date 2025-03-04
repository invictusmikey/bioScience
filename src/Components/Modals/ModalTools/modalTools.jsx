import React, { useState, useEffect } from 'react';

export const ModalTools = ({ isOpen, closeModal, selectedSupply, onUpdate, onDelete }) => {
    if (!isOpen) return null;

    const [isEditing, setIsEditing] = useState(false);
    const [isDelete, setIsDeleting] = useState(false)

    const [edit, setEdit] = useState({
        herramienta: '',
        cantidad: ''
    });

    useEffect(() => {
        if (selectedSupply) {
            setEdit({
                herramienta: selectedSupply.herramienta,
                cantidad: selectedSupply.cantidad,
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
            const response = await fetch(`http://localhost:3000/inventoryiRoutes/${selectedSupply._id}`, {
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
            const response = await fetch(`http://localhost:3000/inventoryiRoutes/${selectedSupply._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar las herramientas');
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
            <div className="modal-content" >
                <button onClick={closeModal} className="close-button">X</button>
                {isEditing ? (
                    < >
                        <h1>
                            <input
                                type="text"
                                name="herramienta"
                                value={edit.herramienta}
                                onChange={manejarCambio}
                            />
                        </h1>
                        <p>
                            <strong>cantidad:</strong>
                            <input
                                type="text"
                                name="cantidad"
                                value={edit.cantidad}
                                onChange={manejarCambio}
                            />
                        </p>
                        <button className="buttonsCrud" onClick={guardarCambios}>Guardar Cambios</button>
                    </>
                ) : (
                    <>
                        <h1>{edit.herramienta}</h1>
                        <p><strong>Cantidad_incial:</strong> {edit.cantidad}</p>
                        <p><strong>Fecha ultima actualizacion <br/></strong>{selectedSupply.updatedAt}</p>
                        <button className="buttonsCrud" onClick={() => setIsEditing(true)}>Editar</button>
                    </>
                )}
                <button className="buttonsCrud" onClick={deleteSupplie}>Eliminar</button>
            </div>
        </div>
    );
};
