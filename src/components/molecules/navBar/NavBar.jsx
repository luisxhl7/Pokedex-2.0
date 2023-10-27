import React from 'react'
import './NavBar.scss'
import pokeball from '../../../assets/pokeball.png'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className='navbar'>
      <img src={pokeball} alt="" width={40}/>
      <NavLink to='/pokedex'>Pokedex</NavLink>
    </nav>
  )
}
