import React, { useEffect, useState } from 'react';
import './InventoryBio.css';
import { ModalAddInventory } from '../Modals/ModalAddInventory/ModalAddInventory';
import { ReloadButton } from '../ReloadButton/ReloadButton';
import { SearchBar } from '../Searchbar/SearchBar';
import { ModalInventoryBio } from '../Modals/ModalInventoryBio/ModalInventoryBio';


export const InventoryBio = () => {
    const [supplies, setSupplies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenBio, setIsOpenBio] = useState(false);
    const [selectedSupply, setSelectedSupply] = useState(null);
    const [selectedMachine, setSelectedMachine] = useState(null);

    const suppliesPerPage = 6;

    const fetchSupplies = async () => {
        try {
            const response = await fetch('http://localhost:3000/inventorybRoutes/',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }    
            }
            );
            const data = await response.json();
            if (Array.isArray(data)) {
                setSupplies(data);
            } else {
                console.error('La respuesta no es un array:', data);
            }
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    };

    useEffect(() => {
        fetchSupplies();
    }, []);

    const filteredSupplies = supplies.filter((supply) =>
        supply.cod_inventario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supply.equipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supply.serial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supply.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supply.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supply.updatedAt?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastSupply = currentPage * suppliesPerPage;
    const indexOfFirstSupply = indexOfLastSupply - suppliesPerPage;
    const currentSupplies = filteredSupplies.slice(indexOfFirstSupply, indexOfLastSupply);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredSupplies.length / suppliesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const openModalBio = (supply) => {
        setSelectedMachine(supply);
        setIsOpenBio(true);
    };

    const closeModalBio = () => {
        setIsOpenBio(false);
    };

    const openModal = (supply) => {
        console.log('Abrir modal con supply:', supply);
        setSelectedSupply(supply);
        setIsOpen(true);
    };

    const closedModal = () => {
        setIsOpen(false);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedSupply(null);
    };

    const onUpdate = (updatedSupply) => {
        setSupplies((prevSupplies) =>
            prevSupplies.map((supply) =>
                supply._id === updatedSupply._id ? updatedSupply : supply
            )
        );
        refreshTable();
    };

    const onAdd = (addedSupply) => {
        setSupplies((prevSupplies) => [...prevSupplies, addedSupply]);
        fetchSupplies();
    };

    const onDelete = (deleteSupply) => {
        setSupplies((prevSupplies) => prevSupplies.filter((supply) => supply._id !== deleteSupply._id));
        fetchSupplies();
    };

    const refreshTable = () => {
        fetchSupplies();
    };

    return (
        <div>
            <div className="TableInventory">
                <h1>Equipos de Biomedicina<br /></h1>
                <SearchBar onSearch={setSearchTerm} />
                <div className="containerButtons">
                    <button className="buttonsCrud" onClick={() => openModalBio(true)}>Agregar</button>
                    <ReloadButton refreshTable={refreshTable} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Cod. inventario</th>
                            <th>equipo</th>
                            <th>Marca</th>
                            <th>Serial</th>
                            <th>Modelo</th>
                            <th>Ubicación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSupplies.length > 0 ? (
                            currentSupplies.map((supply) => (
                                <tr key={supply._id}>
                                    <td>{supply.cod_inventario}</td>
                                    <td>{supply.equipo}</td>
                                    <td>{supply.marca}</td>
                                    <td>{supply.serial}</td>
                                    <td>{supply.modelo}</td>
                                    <td>{supply.ubicacion}</td>
                                    <td>
                                        <button onClick={() => openModal(supply)}>Ver insumo</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay insumos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        &#9664; Anterior
                    </button>
                    <span>Página {currentPage}</span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage >= Math.ceil(filteredSupplies.length / suppliesPerPage)}
                    >
                        Siguiente &#9654;
                    </button>
                </div>
            </div>
            <ModalAddInventory
                isOpen={isOpenBio}
                closeModal={closeModalBio}
                selectedMachine={selectedMachine}
                onAdd={onAdd}
                onDelete={onDelete}
            />
            <ModalInventoryBio
                closeModal={closedModal}
                isOpen={isOpen}
                selectedSupply={selectedSupply}
                onUpdate={onUpdate}
            />
        </div>
    );
};