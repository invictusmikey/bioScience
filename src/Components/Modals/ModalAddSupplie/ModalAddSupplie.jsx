import React, { useState } from 'react';
import './modalAdd.css';

export const ModalAddSupplie = ({ isOpen, closeModal, onAdd }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        Nombre: '',
        Descripcion: '',
        InventarioInicial: '',
        Estado: ''
    });

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  
    const addSupplie = async () => {
        try {
            const response = await fetch('http://localhost:3000/suppliesiRoutes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),  
            });

            if (!response.ok) {
                throw new Error('Error al guardar los cambios');
            }

            const data = await response.json();
            onAdd(data);  
            closeModal(); 
        } catch (error) {
            console.error('Error al agregar el insumo:', error);
        }
    };

    return (
        <div className="modalAdd">
            <button className='close' onClick={closeModal}>X</button>
            <h1>Agrega un Insumo/Herramienta</h1>
            <h2>Nombre</h2>
            <input
                placeholder='Ingrese nombre de la herramienta'
                type="text"
                name="Nombre"
                value={formData.Nombre}  
                onChange={handleChange}
            />
            <h2>Descripción</h2>
            <input
                placeholder='Ingrese la descripción del producto'
                type="text"
                name="Descripcion"
                value={formData.Descripcion}  
                onChange={handleChange}
            />
            <h2>Inventario Inicial</h2>
            <input
                placeholder='Ingrese la cantidad que hay en el stock'
                type="number"
                name="InventarioInicial"
                value={formData.InventarioInicial}  
                onChange={handleChange}
            />
            <h2>Estado</h2>
            <input
                placeholder='Ingrese el estado en el que se encuentra'
                type="text"
                name="Estado"
                value={formData.Estado}  
                onChange={handleChange}
            />
            <button onClick={addSupplie}>Agregar</button>
        </div>
    );
};
