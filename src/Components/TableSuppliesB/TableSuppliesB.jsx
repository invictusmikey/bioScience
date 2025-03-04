import React, { useState, useEffect } from 'react';
import './TableSuppliesB.css';
import { SearchBar } from "../Searchbar/SearchBar";
import { ReloadButton } from '../ReloadButton/ReloadButton';
import { ModalSupplieBio } from '../Modals/ModalSupplieBio/ModalSupplieBio';
import { ModalAddSupplieb } from '../Modals/ModalAddSupplieb/ModalAddSupplieb';


export const TableSuppliesB = () => {
    const [supplies, setSupplies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenBios, setIsOpenBios] = useState(false); 
    const [isOpenAdd, setIsOpenAdd] = useState(false); 
    const [selectedSupply, setSelectedSupply] = useState(null);
    const [newSupply, setNewSupply] = useState({ Nombre: '', cantidadInicial: '', inventarioInicial: '', inventarioFinal: '' });

    const suppliesPerPage = 5;

    const fetchSupplies = async () => {
        try {
            const response = await fetch('http://localhost:3000/suppliesbRoutes',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setSupplies(data);
            } else {
                console.error('La respuesta no es un array:', data);
            }
        } catch (error) {
            console.error('Error al obtener los insumos:', error);
        }
    };

    useEffect(() => {
        fetchSupplies();
    }, []);

    const filteredSupplies = supplies.filter((supply) => 
        (supply.Nombre ? supply.Nombre.toLowerCase() : '').includes(searchTerm.toLowerCase())
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

    const openModalAdd = () => {
        setIsOpenAdd(true);
    };

    const closeModalInfra = () => {
        setIsOpenBios(false);
        setSelectedSupply(null);
    };

    const closeModalAdd = () => {
        setIsOpenAdd(false);
        setNewSupply({ _id: '', Nombre: '', cantidad_incial: '', inventario_inicial: '',inventario_final: '' });
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
            <h1>Esta es la tabla de los insumos de Biomedica</h1>
            <SearchBar onSearch={setSearchTerm} />
            <div className='containerButtons'>
                <button className='buttonsCrud' onClick={openModalAdd}>Agregar</button>
                <ReloadButton refreshTable={refreshTable} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cant. Inicial</th>
                        <th>Inv. Inicial</th>
                        <th>Inv. Final</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSupplies.length > 0 ? (
                        currentSupplies.map((supply) => (
                            <tr key={supply._id}> 
                                <td>{supply.Nombre || 'Sin Nombre'}</td>
                                <td>{supply.cantidad_utilizada|| '0'}</td>
                                <td>{supply.inventario_inicial || '0'}</td>
                                <td>{supply.inventario_final || '0'}</td>
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
                <ModalSupplieBio
                    isOpen={isOpenBios}
                    closeModal={closeModalInfra}
                    selectedSupply={selectedSupply}
                    onUpdate={onUpdate} 
                    onDelete={onDelete}
                />
            )}

            {isOpenAdd && (  
                <ModalAddSupplieb
                    isOpen={isOpenAdd}
                    closeModal={closeModalAdd}
                    onAdd={onAdd} 
                />
            )}
        </div>
    );
};
