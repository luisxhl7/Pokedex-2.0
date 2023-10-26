import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardPokemon } from '../../molecules/card-pokemon'
import './ListPokemons.scss'

export const ListPokemons = () => {
  const [pokemons, setPokemons] = useState()
  const [numberPage, setNumberPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  
  const getPokemons = async(pageNumber) => {
    try {
      const offset = (pageNumber - 1 ) * 100;
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
      const pages = Math.round(result?.data?.count / 100)
      setTotalPage(Array.from(Array.from({ length: pages}, (_, index) => index + 1)))
      setPokemons(result?.data?.results)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleNextPage = async() => {
    if (numberPage <= totalPage.length - 1 ) {
      await setNumberPage( numberPage + 1)
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      })
    }
  }

  const handleBackPage = () => {
    if (numberPage > totalPage.length) {
      setNumberPage( numberPage - 1)
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      })
    }
  }
  const handleSelectPage = async(page) => {
    if ( page >= 1 && page <= totalPage.length ) {
      await setNumberPage( page )
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    getPokemons(numberPage)
  }, [numberPage])

  return (
    <section className='listPokemons'>
      
      <div className='listPokemons__content'>
        {
          pokemons?.map( (item, idx) => (
            <CardPokemon 
              key={idx} 
              id={idx}
              name={item?.name} 
              url={item?.url} 
            />
          ))
        }
      </div>

      <button onClick={handleBackPage}>{'<'}</button>
      {totalPage?.map( (item, idx) => (
        <button
          key={ 1 + idx} 
          onClick={() => handleSelectPage(1 + idx)}
        >{1 + idx}</button>
      ))}
      <button onClick={handleNextPage}>{'>'}</button>
    
    </section>
  )
}
