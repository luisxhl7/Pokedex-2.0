import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import pokeball from '../../../assets/pokeball.png'
import incognito from '../../../assets/incognito.svg'
import './CardPokemon.scss'

export const CardPokemon = ({name, url, id}) => {
  const [pokemon, setPokemon] = useState();
  const [isLoad, setIsLoad] = useState(true);

  const getPokemon = async() => {
    try {
      setIsLoad(true)
      setTimeout(async() => {
        const result  = await axios.get(url ? url: `https://pokeapi.co/api/v2/pokemon/${id}/`)
        setPokemon(result.data)
        setIsLoad(false)
      }, 1000);
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
          # {isLoad? '????' : pokemon?.id}
          <br />
          {isLoad? '???????' :pokemon?.name}
        </h2>
        <figure>
          {isLoad ?
            <img src={pokeball} alt="" width={150} height={150}/>
            :
            <img src={
              pokemon?.sprites?.other?.dream_world?.front_default 
              ?
              pokemon?.sprites?.other?.dream_world?.front_default 
              :
              incognito
            } alt="" width={150} height={150}/>
          }
        </figure>
      </Link>
    </div>
  )
}
