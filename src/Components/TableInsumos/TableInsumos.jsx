import React, { useState, useEffect } from 'react';
import './TableInsumos.css';
import { SearchBar } from '../Searchbar/SearchBar';
import { ModalAddSupplie } from '../Modals/ModalAddSupplie/ModalAddSupplie';
import { ReloadButton } from '../ReloadButton/ReloadButton';
import { ModalInfra } from '../Modals/ModalInfra/ModalInfra';


export const TableInsumos = () => {

    const [supplies, setSupplies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenInfra, setIsOpenInfra] = useState(false); 
    const [isOpenDates, setIsOpenDates] = useState(false); 
    const [isOpenAdd, setIsOpenAdd] = useState(false); 
    const [selectedSupply, setSelectedSupply] = useState(null);
    const [newSupply, setNewSupply] = useState({ Nombre: '', Descripcion: '', InventarioInicial: '', Estado: '' });
    
    const suppliesPerPage = 5;

    const fetchSupplies = async () => {
        try {
            const response = await fetch('http://localhost:3000/suppliesiRoutes');
            if (!response.ok) {
                throw new Error('Error al obtener los insumos');
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
        (supply.Nombre ? supply.Nombre.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
        (supply.Descripcion ? supply.Descripcion.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
        (supply.Estado ? supply.Estado.toLowerCase() : '').includes(searchTerm.toLowerCase())
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

    const openModalInfra = (supply) => {
        setSelectedSupply(supply);
        setIsOpenInfra(true);
    };

    const openModalAdd = () => {
        setIsOpenAdd(true);
    };

    const closeModalInfra = () => {
        setIsOpenInfra(false);
        setSelectedSupply(null);
        
    };

    const closeModalAdd = () => {
        setIsOpenAdd(false);
        setNewSupply({ _id: '' ,Nombre: '', Descripcion: '', InventarioInicial: '', Estado: '' });
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
        
    }

    const onAdd = (addedSupply) => {
        setSupplies((prevSupplies) => [...prevSupplies, addedSupply]);
        fetchSupplies(); 
    };

    const refreshTable = () => {
        fetchSupplies()
        
    }
    return (
        <div className='TableInsumos'>
            <h1>Esta es la tabla de los insumos de infraestructura <br /></h1>
            <SearchBar onSearch={setSearchTerm} />
            <div className='containerButtons'>
                <button className='buttonsCrud' onClick={openModalAdd}>Agregar</button>
                <ReloadButton refreshTable={refreshTable}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSupplies.length > 0 ? (
                        currentSupplies.map((supply) => (
                            <tr key={supply._id}> 
                                <td>{supply.Nombre || 'Sin nombre'}</td>
                                <td>{supply.Descripcion || 'Sin descripción'}</td>
                                <td>{supply.InventarioInicial }</td>
                                <td>{supply.Estado || 'Desconocido'}</td>
                                <td>
                                    <button className='ver-insumo' onClick={() => openModalInfra(supply)}>Ver insumo</button>
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

            {isOpenInfra && (  
                <ModalInfra
                    isOpen={isOpenInfra}
                    closeModal={closeModalInfra}
                    selectedSupply={selectedSupply}
                    onUpdate={onUpdate} 
                    onDelete={onDelete}
                />
            )}

            {isOpenAdd && (  
                <ModalAddSupplie
                    isOpen={isOpenAdd}
                    closeModal={closeModalAdd}
                    onAdd={onAdd} 
                />
            )}
           

           
        </div>
    );
};
