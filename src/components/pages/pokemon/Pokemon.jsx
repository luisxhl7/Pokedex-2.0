import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import incognito from '../../../assets/incognito.svg'
import pokeball from '../../../assets/pokeball.png'
import { InfoPokemon } from '../../molecules/info-pokemon/InfoPokemon'
import { ArrowBackIos, ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
import './Pokemon.scss'
import { CardButtonPokemon } from '../../molecules/card-button-pokemon'

export const Pokemon = () => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState()
  const [isLoad, setIsLoad] = useState(false)
  const [optionsPokemons, setOptionsPokemons] = useState([])
  const {id} = useParams()

  const getPokemon = async() => {
    try {
      setIsLoad(true)
      var miArray = [];
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      await setPokemon(result?.data)

      for (let i = result.data.id; i < result.data.id + 4; i++) {
        miArray.push((i + 1));
      }
      setOptionsPokemons(miArray)
      
      setIsLoad(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBackPokemon = async() => {
    try {
      const backPokemon = pokemon?.id - 1
      if (backPokemon >= 1) {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${backPokemon}`)
        await navigate(`/pokemon/${result?.data?.name}`, {
          replace: true
        })
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextPokemon = async() => {
    const backPokemon = pokemon?.id + 1
    if (backPokemon < 10276) {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${backPokemon}`)
      await navigate(`/pokemon/${result?.data?.name}`, {
        replace: true
      })
    }
  }



  useEffect(() => {
    getPokemon();

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <section className='pokemon'>
      <div className='pokemon__content-info'>
        <button 
          onClick={handleBackPokemon}
          className='pokemon__button'
        >
          <ArrowBackIosNew/>
        </button>
        <div className='pokemon__card-info'>
          <div className='pokemon__card-info__section-1'>
            <h1 className='pokemon__card-info__title'>#{isLoad ? '???' : `${pokemon?.id} ${pokemon?.name}`} </h1>
            <figure>
              {isLoad ?
                <img src={pokeball} 
                  alt="cargando" 
                  title='cargando'
                  className='pokemon__card-info__section-1__image-load'
                />
                :
                <img src={
                    pokemon?.sprites?.other?.dream_world?.front_default 
                    ?
                    pokemon?.sprites?.other?.dream_world?.front_default 
                    :
                    incognito
                  } 
                  alt={`pokemon ${pokemon?.name}`}
                  title={`pokemon ${pokemon?.name}`}
                  className='pokemon__card-info__section-1__image'
                />
              }
            </figure>
            
          </div>
          <InfoPokemon types={pokemon?.types} stats={pokemon?.stats} isLoad={isLoad}/>

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
            <ArrowBackIosNew/>
          </button>
          <button 
            onClick={handleNextPokemon}
            className='pokemon__button-mobile'
          >
            <ArrowForwardIos/>
          </button>
        </div>
      </div>

      <div className='pokemon__content-buttons-pokemons'>
        {optionsPokemons?.map( (item, idx) => (
          <CardButtonPokemon id={item} key={idx}/>
        ))}
      </div>
      
    </section>
  )
}
