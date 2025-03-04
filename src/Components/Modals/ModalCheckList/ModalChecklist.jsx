import { useState } from 'react';
import './ModalChecklist.css'
import { ModalDivArchives } from '../ModalDivArchives/ModalDivArchives';


export const ModalCheckList = ({ isClose, id, isOpen }) => {
    if (!isOpen) return null;

    const [openSection, setOpenSection] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isOpenArchives, setIsOpenArchives] = useState(false);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            alert("Por favor, selecciona un archivo PDF.");
        }
    };
    const cancelFile = () => {
        setSelectedFile(null);
    }

    const openFileInNewTab = () => {
        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            window.open(fileUrl, "_blank");
        }
    };

    const toggleList = (section) => {
        setOpenSection(openSection === section ? null : section);
    };


    const datos = async () => {
        try {
            if (!selectedFile) {
                alert("Por favor, selecciona por favor el PDF.");
                return;
            }

            const formData = new FormData();
            formData.append('archivos', selectedFile);

            const response = await fetch(`http://localhost:3000/archiveRoutes/subir-archivo/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir archivo');
            }

            const updateArchives = await response.json();

            console.log('Archivo subido correctamente', selectedFile);
            alert('Archivo subido correctamente');
        } catch (error) {
            console.error('Error al subir archivo:', error);
            alert('Hubo un error al subir el archivo. Por favor, inténtalo de nuevo.');
        }
    };

    const truncateFileName = (name, maxLength = 20) => {
        return selectedFile.name.length > maxLength ? `${selectedFile.name.substring(0, maxLength)}...` : name;
      };


    return (

        <div className='modalLink'>
            {!isOpenArchives && (
                <div className="modal-links" >
                    <button className="button-close" onClick={isClose}>X</button>
                    <h1>Menú</h1>
                    <ul className='list-links'>
                        <li className='li-btn'>
                            <button
                                className="buttons-links"
                                onClick={() => toggleList('Hoja')}
                            >
                                Hoja de vida  ↓
                            </button>
                            {openSection === 'Hoja' && (
                                <div >
                                    <div>
                                        <button className='btn-archivos' onClick={() => setIsOpenArchives(true)}>Ver archivos</button>

                                        <br />
                                        <br />
                                        {selectedFile && (

                                            <p className='selected-file' onClick={openFileInNewTab}>
                                                {truncateFileName(selectedFile.name)}
                                            </p>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id={id}
                                        className="inputfile inputfile-1"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                    />
                                    <br />

                                    {selectedFile && (
                                        <div>
                                            <button className='btn-subir' onClick={datos}>Subir</button>
                                            <button className='btn-cancelar' onClick={cancelFile}> Cancelar</button>
                                        </div>
                                    )}


                                </div>

                            )}
                        </li>

                        <li className='li-btn'>
                            <button
                                className="buttons-links"
                                onClick={() => toggleList('mantenimientoP')}
                            >
                                Mantenimiento p  ↓
                            </button>
                            {openSection === 'mantenimientoP' && (
                                <div>
                                    <button className='btn-section'>Doc prueba</button>
                                </div>
                            )}
                        </li>

                        <li className='li-btn'>
                            <button
                                className="buttons-links"
                                onClick={() => toggleList('mantenimientoC')}
                            >
                                Mantenimiento c  ↓
                            </button>
                            {openSection === 'mantenimientoC' && (
                                <div>
                                    <button className='btn-section'>Doc prueba</button>
                                </div>
                            )}
                        </li>

                        <li className='li-btn'>
                            <button
                                className="buttons-links"
                                onClick={() => toggleList('varios')}
                            >
                                Varios  ↓
                            </button>
                            {openSection === 'varios' && (
                                <div>
                                    <ul className='list-docs'>
                                        <li className='li-docts'><button className='btn-section'>Doc 1</button></li>
                                        <li className='li-docts'><button className='btn-section'>Doc 2</button></li>
                                        <li className='li-docts'><button className='btn-section'>Doc 3</button></li>
                                        <li className='li-docts'><button className='btn-section'>Doc 4</button></li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            )}
            {isOpenArchives && (
                <ModalDivArchives
                    id={id}
                    isOpen={isOpenArchives}
                    onClose={() => setIsOpenArchives(false)}
                />
            )}
        </div>

    )
}
