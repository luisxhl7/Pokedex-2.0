import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ListPokemons } from '../components/pages/list-pokemons'
import { Pokemon } from '../components/pages/pokemon/Pokemon'

export const AppRouter = () => {
  
  return (
    <Routes>
      <>
        <Route path = '/pokedex/:page' element = { <ListPokemons/> }/>
        <Route path = '/pokemon/:id' element = { <Pokemon/> } />
        <Route path = '/*' element = { <Navigate to = '/pokedex/1' /> }/>
      </>
    </Routes>
  )
}
