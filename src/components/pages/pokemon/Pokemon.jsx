import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import incognito from '../../../assets/incognito.svg'
import { InfoPokemon } from '../../molecules/info-pokemon/InfoPokemon'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './Pokemon.scss'

export const Pokemon = () => {
  const navigate = useNavigate();
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

  const handleBackPokemon = async() => {
    const backPokemon = pokemon?.id - 1
    if (backPokemon >= 1) {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${backPokemon}`)
      await navigate(`/pokemon/${result?.data?.name}`, {
        replace: true
      })
      window.location.reload()
      
    }
  }

  const handleNextPokemon = async() => {
    const backPokemon = pokemon?.id + 1
    if (backPokemon < 10276) {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${backPokemon}`)
      await navigate(`/pokemon/${result?.data?.name}`, {
        replace: true
      })
      window.location.reload()
    }
  }

  useEffect(() => {
    getPokemon();

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='pokemon'>
      <button 
        onClick={handleBackPokemon}
        className='pokemon__button'
      >
        <ArrowBackIos/>
      </button>
      <div className='pokemon__card-info'>
        <div className='pokemon__card-info__section-1'>
          <h1 className='pokemon__card-info__title'>#{pokemon?.id} {pokemon?.name}</h1>
          <figure>
            <img src={
              pokemon?.sprites?.other?.dream_world?.front_default 
              ?
              pokemon?.sprites?.other?.dream_world?.front_default 
              :
              incognito
              } alt=""
            />
          </figure>
          
        </div>
        <InfoPokemon types={pokemon?.types} stats={pokemon?.stats}/>

      </div>
      <button 
        onClick={handleNextPokemon}
        className='pokemon__button'
      >
        <ArrowForwardIos/>
      </button>
      <div className='pokemon__content-buttons'>
        <button 
          onClick={handleBackPokemon}
          className='pokemon__button-mobile'
        >
          <ArrowBackIos/>
        </button>
        <button 
          onClick={handleNextPokemon}
          className='pokemon__button-mobile'
        >
          <ArrowForwardIos/>
        </button>
      </div>
    </section>
  )
}
