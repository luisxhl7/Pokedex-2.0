import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import incognito from '../../../assets/incognito.svg'
import pokeball from '../../../assets/pokeball.png'
import { InfoPokemon } from '../../molecules/info-pokemon/InfoPokemon'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './Pokemon.scss'

export const Pokemon = () => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState()
  const [isLoad, setIsLoad] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemon = async() => {
    try {
      setIsLoad(true)
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      await setPokemon(result?.data)
      setIsLoad(false)
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

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        console.log('izquierda');
        // handleBackPokemon()
      break;
      case 'ArrowRight':
        console.log('derecha');
        handleNextPokemon()
        break;
      default:
        break;
    }
  };

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
