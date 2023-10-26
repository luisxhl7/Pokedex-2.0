import React from 'react'
import './NavBar.scss'
import pokeball from '../../../assets/pokeball.png'

export const NavBar = () => {
  return (
    <nav className='navbar'>
      <img src={pokeball} alt="" width={40}/>
      <a href="a">Home</a>
      <a href="a">Buscador</a>
    </nav>
  )
}
