import React, { useState } from 'react';


export const ModalAddTools = ({ isOpen, closeModal, onAdd }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
       herramienta:'',
       cantidad:''
    });

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  
    const addSupplie = async () => {
        try {
            const response = await fetch('http://localhost:3000/inventoryiRoutes', {
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
        <div className="modalAdd" key={formData.id}>
            <button className='close' onClick={closeModal}>X</button>
            <h1>Agrega un Insumo/Herramienta</h1>
            <h2>Nombre de herramienta</h2>
            <input
                placeholder='Ingrese nombre de la herramienta'
                type="text"
                name="herramienta"
                value={formData.herramienta}  
                onChange={handleChange}
            />
            <h2>Cantidad</h2>
            <input
                placeholder='Ingrese la descripción del producto'
                type="text"
                name="cantidad"
                value={formData.cantidad}  
                onChange={handleChange}
            />
           
            <button onClick={addSupplie}>Agregar</button>
        </div>
    );
};
