import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import pokeball from '../../../assets/pokeball.png'
import './Pokemon.scss'

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
              } alt="" width={250} height={250}
            />
          </figure>
          
        </div>
        <h2 className='pokemon__card-info__title-type'>Tipo</h2>
        <div className='pokemon__card-info__type'>
          {pokemon?.types?.map( (item, index) => (
            <p key={index} className='pokemon__card-info__type__text'>
            {item?.type?.name} 
            </p>
          ))}
        </div>
        <h2 className='pokemon__card-info__title-skills'>Habilidades</h2>
        {pokemon?.stats?.map( (item, index) => (
          <div className='pokemon__card-info__ability' key={index}>
            <p className='pokemon__card-info__ability__name'>
              {item?.stat?.name}
            </p>
            <p className='pokemon__card-info__ability__stat'>
              {item?.base_stat} 
            </p>
          </div>
        ))}

      </div>
    </section>
  )
}
