import React, { useState, useEffect } from 'react';
import './TableInventoryI.css'
import { SearchBar } from "../Searchbar/SearchBar";
import { ReloadButton } from '../ReloadButton/ReloadButton';
import { ModalAddTools } from '../Modals/ModalAddTools/ModalAddTools';
import { ModalTools } from '../Modals/ModalTools/modalTools';



export const TableInventoryI = () => {
    const [supplies, setSupplies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenBios, setIsOpenBios] = useState(false); 
    const [isOpenAdd, setIsOpenAdd] = useState(false); 
    const [selectedSupply, setSelectedSupply] = useState(null);
    const [newSupply, setNewSupply] = useState({ 'cantidad': '', 'herramienta': ''});

    const suppliesPerPage = 5;

    const fetchSupplies = async () => {
        try {
            const response = await fetch('http://localhost:3000/inventoryiRoutes');
            if (!response.ok) {
                throw new Error('Error al obtener las herramientas');
            }
            const data = await response.json();
            setSupplies(data);
        } catch (error) {
            console.error('Error al obtener los insumos:', error);
        }
    };

    useEffect(() => {
        fetchSupplies();
    }, []);

    const filteredSupplies = supplies.filter((supply) => 
        (supply.herramienta? supply.herramienta.toLowerCase() : '').includes(searchTerm.toLowerCase())
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

    const openModalSbio = (supply) => {
        setSelectedSupply(supply);
        setIsOpenBios(true);
    };

    const openModalAddTools = () => {
        setIsOpenAdd(true);
    };

    const closeModalInfra = () => {
        setIsOpenBios(false);
        setSelectedSupply(null);
    };

    const closeModalAdd = () => {
        setIsOpenAdd(false);
        setNewSupply({ _id: '', cantidad:'',herramienta:'' });
    };

    const onUpdate = (updatedSupply) => {
        setSupplies((prevSupplies) =>
            prevSupplies.map((supply) => 
                supply._id === updatedSupply._id ? updatedSupply : supply
            )
        );
    };

    const onDelete = (deleteSupply) => {
        setSupplies((prevSupplies) => prevSupplies.filter((supply) => supply._id !== deleteSupply._id));
    };

    const onAdd = (addedSupply) => {
        setSupplies((prevSupplies) => [...prevSupplies, addedSupply]); 
    };

    const refreshTable = () => {
        fetchSupplies();
    };

    return (
        <div className='TableInsumos'>
            <h1>Esta es la tabla del inventario de infraestructura</h1>
            <SearchBar onSearch={setSearchTerm} />
            <div className='containerButtons'>
                <button className='buttonsCrud' onClick={openModalAddTools}>Agregar</button>
                <ReloadButton refreshTable={refreshTable} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Herramineta </th>
                        <th>Cantidad </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSupplies.length > 0 ? (
                        currentSupplies.map((supply) => (
                            <tr key={supply._id}> 
                                <td>{supply.herramienta || 'Sin nombre'}</td>
                                <td>{supply.cantidad|| '0'}</td>
                               
                                <td>
                                    <button className='ver-insumo' onClick={() => openModalSbio(supply)}>Ver insumo</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay insumos disponibles</td>
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

            {isOpenBios && (  
                <ModalTools
                    isOpen={isOpenBios}
                    closeModal={closeModalInfra}
                    selectedSupply={selectedSupply}
                    onUpdate={onUpdate} 
                    onDelete={onDelete}
                />
            )}

            {isOpenAdd && (  
                <ModalAddTools
                    isOpen={isOpenAdd}
                    closeModal={closeModalAdd}
                    onAdd={onAdd} 
                />
            )}
        </div>
    );
};
