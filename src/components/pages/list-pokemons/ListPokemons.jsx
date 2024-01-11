import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { CardPokemon } from '../../molecules/card-pokemon'
import { ArrowBackIos, ArrowForwardIos, Search } from '@mui/icons-material';
import pikachu from '../../../assets/pika-triste.svg'
import './ListPokemons.scss'

export const ListPokemons = () => {
  const navigate = useNavigate();
  const {page} = useParams()
  const [formData, setFormData] = useState({});
  const [successSearch, setSuccessSearch] = useState(true);
  const [pokemons, setPokemons] = useState()
  const [numberPage, setNumberPage] = useState(page)
  const [totalPage, setTotalPage] = useState()

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const handleSearchPokemon = async(event) => {
    event.preventDefault()
    const search = formData.pokemon.replace(/\s/g, '')
    try {
      if (search.length >= 1 ) {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${formData.pokemon}`)
        setPokemons([result?.data])
        setSuccessSearch(true)
      }else{
        getPokemons()
      }
      
    } catch (error) {
      setSuccessSearch(false)
    }

  }

  const getPokemons = async(pageNumber) => {
    try {
      setSuccessSearch(true)
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
      
      <form onSubmit={handleSearchPokemon}>
        <div className='listPokemons__content-search'>
          <Search className='listPokemons__content-search__icon-search'/>
          <input
            type="search"
            name="pokemon"
            className='listPokemons__input'
            onChange={handleChange}
            placeholder='Busca por número o nombre'
          />      
        </div>
      </form>

      <div className='listPokemons__content'>
        {successSearch ?
        <>
          {
            pokemons?.map( (item, idx) => (
              <CardPokemon 
                key={idx} 
                id={item?.id}
                name={item?.name}
                url={item?.url} 
              />
            ))
          }
        </>
        :
        <div className='listPokemons__not-result'>
          <h1>No se encontraron resultados</h1>
          <img src={pikachu} alt=""/>
        </div>
        }
      </div>

      {pokemons?.length > 1 & successSearch === true ?
        <div className='listPokemons__content-buttons'>
          <button 
            onClick={handleBackPage}
            className='listPokemons__button-arrow'
          >
            <ArrowBackIos/>
          </button>
            {
              totalPage?.map( (item, idx) => (
                <button
                key={ 1 + idx} 
                onClick={() => handleSelectPage(1 + idx)}
                className={`${parseInt(numberPage) === 1 + idx ? '--actived' : ''}`}
                >{1 + idx}</button>
            ))
          }
          <button 
            onClick={handleNextPage}
            className='listPokemons__button-arrow'
          >
            <ArrowForwardIos/>
          </button>
        </div>
        :
        <></>
      }
    
    </section>
  )
}
