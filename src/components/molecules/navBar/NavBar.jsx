import React from 'react'
import './NavBar.scss'
import pokeball from '../../../assets/pokeball.png'
import { NavLink } from 'react-router-dom'
import {Visibility, VisibilityOff} from '@mui/icons-material';
export const NavBar = () => {
  
  const handleViewPokemons = () => {
    if (JSON.parse(localStorage.getItem('viewPokemons'))) {
      localStorage.setItem('viewPokemons', false)
      window.location.reload()
    }else{
      localStorage.setItem('viewPokemons', true)
      window.location.reload()
    }
  }
  
  return (
    <nav className='navbar'>
      <NavLink to='/pokedex'>
        <img src={pokeball} alt="" width={40}/>
        Pokedex
      </NavLink>
      
      <button 
        onClick={handleViewPokemons} 
        className='navbar__button-view-pokemons'
        title={JSON.parse(localStorage.getItem('viewPokemons')) ? 'Ocultar Pokemones' : 'Mostrar Pokemones'}
      >
        {JSON.parse(localStorage.getItem('viewPokemons')) ?

        <VisibilityOff/>
        :
        <Visibility/>
        }
      </button>
    </nav>
  )
}
