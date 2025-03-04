import React, { useState } from 'react';
import './Home.css';
import { NavBar } from '../../NavBar/NavBar';
import { SideBar } from '../../SideBar/SideBar';
import { Footer } from '../../Footer/Footer';
import { Welcometext } from '../../WelcomeText/Welcometext';
import { InventoryBio } from '../../InventoryBio/InventoryBio';
import { TableInventoryI } from '../../TableInventoryI/TableInventoryI';
import { TableInsumos } from '../../TableInsumos/TableInsumos';
import { TableSuppliesB } from '../../TableSuppliesB/TableSuppliesB';



export const Home = () => {
  const [showTable, setShowTable] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showSuppliesB, setShowSuppliesB] = useState(false);
  const [showTools , setShowTools] = useState(false)
  const handleMostrarInsumos = () => {
    setShowTable(true);
    setShowInventory(false);
    setShowSuppliesB(false);
    setShowTools(false)
  };

  const handleMostrarInventario = () => {
    setShowInventory(true);
    setShowTable(false);
    setShowSuppliesB(false);
    setShowTools(false)
  };

  const handleMostrarSuppliesB = () => {
    setShowSuppliesB(true);
    setShowTable(false);
    setShowInventory(false);
    setShowTools(false)
  };

  const handleMostrarTools = () => {
    setShowTools(true)
    setShowSuppliesB(false)
    setShowInventory(false)
    setShowTable(false)
  }

  return (
    <div className="home-container">
      <NavBar />
      <section className="seccion">
        <div className="izquierda">
          <SideBar
            onInsumoClick={handleMostrarInsumos}
            onInventoryClick={handleMostrarInventario}
            onSuppliesBClick={handleMostrarSuppliesB} 
            onToolsClick={handleMostrarTools}
          />
        </div>
        <div className="derecha">
          {showTable && <TableInsumos />}
          {showInventory && <InventoryBio />}
          {showSuppliesB && <TableSuppliesB />}
          {showTools && <TableInventoryI/>}
          {!showTable && !showInventory && !showSuppliesB && !showTools && <Welcometext />}
        </div>
      </section>
      <Footer />
    </div>
  );
};
