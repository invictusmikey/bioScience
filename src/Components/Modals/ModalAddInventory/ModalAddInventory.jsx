import React, { useState } from 'react';
import "./ModalAddInventory.css";

export const ModalAddInventory = ({ isOpen, closeModal, onAdd, initialData }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState(initialData || {
        cod_inventario: '',
        equipo: '',
        marca: '',
        modelo: '',
        serial: '',
        ubicacion: '',
        reg_invima: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addSupplie = async () => {
        try {
            
            if (Object.values(formData).some(field => field === '')) {
                alert('Todos los campos son obligatorios');
                return;
            }

            const response = await fetch('http://localhost:3000/inventorybRoutes', {
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
        <div className="modalAddBio">
            <button className='close' onClick={closeModal}>X</button>
            <h1>Agrega o edita máquina biomédica</h1>

            <div>
                <h2>Cod. Inventario</h2>
                <input
                    placeholder='Ingrese código de inventario'
                    type="text"
                    name="cod_inventario"
                    value={formData.cod_inventario}
                    onChange={handleChange}
                />
            </div>
            <div>
                <h2>Nombre</h2>
                <input
                    placeholder='Ingrese nombre del equipo'
                    type="text"
                    name="equipo"
                    value={formData.equipo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <h2>Marca</h2>
                <input
                    placeholder='Ingrese marca del equipo'
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                />
            </div>
            <div>
                <h2>Serial</h2>
                <input
                    placeholder='Ingrese número de serie'
                    type="text"
                    name="serial"
                    value={formData.serial}
                    onChange={handleChange}
                />
            </div>
            <div>
                <h2>Modelo</h2>
                <input
                    placeholder='Ingrese modelo del equipo'
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <h2>Ubicación</h2>
                <input
                    placeholder='Ingrese ubicación del equipo'
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <h2>Reg. Invima</h2>
                <input
                    placeholder='Ingrese registro INVIMA'
                    type="text"
                    name="reg_invima"
                    value={formData.reg_invima}
                    onChange={handleChange}
                />
            </div>
            <button onClick={addSupplie} className='save'>Guardar Cambios</button>
        </div>
    );
};
