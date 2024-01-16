import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import incognito from '../../../assets/incognito.svg'
import './CardButtonPokemon.scss'

export const CardButtonPokemon = ({id}) => {
  const [pokemon, setPokemon] = useState()
  
  const getPokemon = async() => {
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      await setPokemon(result?.data)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return(
    <div className='CardButtonPokemon'>
      <Link to={`/pokemon/${pokemon?.name}`}>
        <h3>#{pokemon?.id} {pokemon?.name}</h3>          
        <img src={
          pokemon?.sprites?.other?.dream_world?.front_default 
          ?
          pokemon?.sprites?.other?.dream_world?.front_default 
          :
          incognito
        } 
          alt={`pokemon ${pokemon?.name}`}
          title={`pokemon ${pokemon?.name}`}
          className='CardButtonPokemon__image'
        />
      </Link>
    </div>
  )
}