import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardPokemon } from '../../molecules/card-pokemon'
import './ListPokemons.scss'
import { useNavigate, useParams } from 'react-router-dom'

export const ListPokemons = () => {
  const {page} = useParams()
  const [pokemons, setPokemons] = useState()
  const [numberPage, setNumberPage] = useState(page)
  const [totalPage, setTotalPage] = useState()
  const navigate = useNavigate();
  console.log(totalPage)
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
    if (parseInt(numberPage) <= totalPage.length - 1 ) {
      const nextPage = parseInt(numberPage) + 1;
      await setNumberPage( nextPage)
      await navigate(`/pokedex/${nextPage}`, {
        replace: true
      })
      window.location.reload()
      window.scrollTo({
        top:0,
      })
    }
  }

  const handleBackPage = async() => {
    if (parseInt(numberPage) > 1) {
      const previousPage = parseInt(numberPage) - 1;
      setNumberPage(previousPage);
      navigate(`/pokedex/${previousPage}`, {
        replace: true
      });
      window.location.reload();
    }
  }

  const handleSelectPage = async(page) => {
    if ( page >= 1 && page <= totalPage.length ) {
      await navigate(`/pokedex/${page}`, {
        replace: true
      })
      window.location.reload()
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

      <div className='listPokemons__content-buttons'>
        <button onClick={handleBackPage}>{'<'}</button>
          {
            totalPage?.map( (item, idx) => (
              <button
              key={ 1 + idx} 
              onClick={() => handleSelectPage(1 + idx)}
              className={`${parseInt(numberPage) === 1 + idx ? '--actived' : ''}`}
              >{1 + idx}</button>
          ))
        }
        <button onClick={handleNextPage}>{'>'}</button>
      </div>
    
    </section>
  )
}
