import React from 'react'
import { IoLogoReact, FaSearch } from 'react-icons'
import './NavBar.css'

const NavBarComponent = (props) => {
  return (
    <div id='nav-bar'>
      <div id='logo'>
        <IoLogoReact />
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
