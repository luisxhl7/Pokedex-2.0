import React, { useEffect, useState } from 'react'
import axios from 'axios'
import pokeball from '../../../assets/pokeball.png'
import './CardPokemon.scss'

export const CardPokemon = ({name, url, id}) => {
  const [pokemon, setPokemon] = useState()
  console.log(pokemon)
  const getPokemon = async() => {
    try {
      const result  = await axios.get(url)
      setPokemon(result.data)

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getPokemon()
  }, [name])
  



  return (
    <div className='cardPokemon'>
        <h2>
          # {pokemon?.order}
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
    </div>
  )
}
