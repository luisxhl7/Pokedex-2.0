import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import pokeball from '../../../assets/pokeball.png'
import './Pokemon.scss'
import { InfoPokemon } from '../../molecules/info-pokemon/InfoPokemon'

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState()
  const {id} = useParams()
  
  const getPokemon = async() => {
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      setPokemon(result?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPokemon();

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='pokemon'>
      <div className='pokemon__card-info'>
        <div className='pokemon__card-info__section-1'>
          <h1 className='pokemon__card-info__title'>{pokemon?.name}</h1>
          <figure>
            <img src={
              pokemon?.sprites?.other?.dream_world?.front_default 
              ?
              pokemon?.sprites?.other?.dream_world?.front_default 
              :
              pokeball
              } alt=""
            />
          </figure>
          
        </div>
        <InfoPokemon types={pokemon?.types} stats={pokemon?.stats}/>

      </div>
    </section>
  )
}
