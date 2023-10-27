import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import pokeball from '../../../assets/pokeball.png'
import './CardPokemon.scss'

export const CardPokemon = ({name, url, id}) => {
  const [pokemon, setPokemon] = useState();

  const getPokemon = async() => {
    try {
      const result  = await axios.get(url ? url: `https://pokeapi.co/api/v2/pokemon/${id}/`)
      setPokemon(result.data)

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getPokemon()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  
  return (
    <div className='cardPokemon'>
      <Link to={`/pokemon/${name}`}>
        <h2>
          # {pokemon?.id}
          <br />
          {pokemon?.name}
        </h2>
        <figure>
          <img src={
            pokemon?.sprites?.other?.dream_world?.front_default 
            ?
            pokemon?.sprites?.other?.dream_world?.front_default 
            :
            pokeball
            } alt="" width={150} height={150}/>
        </figure>
      </Link>
    </div>
  )
}
