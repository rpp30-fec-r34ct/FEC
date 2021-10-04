import React from 'react'
import { FaSearch, FaReact } from 'react-icons/fa'
import './NavBar.css'

const NavBarComponent = (props) => {
  return (
    <div id='nav-bar'>
      <div id='logo'>
        <FaReact />
        PROJECT ATLIER
      </div>
      <div id='search'>
        <input type='text' placeholder='Search..' />
        <FaSearch />
      </div>
    </div>
  )
}

export default NavBarComponent
