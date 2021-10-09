import React from 'react'
import { FaSearch, FaReact } from 'react-icons/fa'
import './NavBar.css'
import Toggle from './StyledComponents/Toggle.jsx'

const NavBarComponent = ({ theme, toggleTheme, icon}) => {
  return (
    <div id='nav-bar'>
      <div id='logo'>
        <FaReact />
        PROJECT ATLIER
      </div>
      <Toggle theme={theme} toggleTheme={toggleTheme} icon={icon}/>
      <div id='search'>
        <input type='text' placeholder='Search..' />
        <FaSearch />
      </div>
    </div>
  )
}

export default NavBarComponent
