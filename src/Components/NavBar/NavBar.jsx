import React from 'react'
import { Items } from '../Items/Items'
import Logo from '../../assets/Logo.png'
import './NavBar.css'

export const NavBar = () => {


  return (
    <div className="navbar-container">
        <a href="../Pages/Home/Home"><img src={Logo} alt="" /></a>
        <ul className="navbar-items">
          <Items >------</Items>
          <Items>-----</Items>
          <Items url="https://www.edibon.com/es/ingenieria-biomedica/equipamiento-biomedico">Equipos</Items>
        </ul>
    </div>
  )
}
