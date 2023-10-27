import React, { useEffect, useState } from 'react'
import './InfoPokemon.scss'
import axios from 'axios'

const Text = ({ className, url }) => {
    const [text, setText] = useState()
    const getInfoUrl = async() => {
        const resp = await axios.get(url)
        setText(resp?.data?.names[5]?.name)
    }
    useEffect(() => {
        getInfoUrl()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <p className={className}>
            {text}
        </p>
    )
}

export const InfoPokemon = ({types, stats}) => {

    return (
        <div className='pokemon__card-info__section-2'>
            <h2 className='pokemon__card-info__title-type'>Tipo</h2>
            <div className='pokemon__card-info__type'>
                {types?.map( (item, index) => (
                    <Text 
                        key={index} 
                        className='pokemon__card-info__type__text' 
                        url={item?.type?.url}
                    />
                ))}
            </div>
            <h2 className='pokemon__card-info__title-skills'>Habilidades</h2>
            {stats?.map( (item, index) => (
                <div className='pokemon__card-info__ability' key={index}>
                    <Text 
                        key={index} 
                        className='pokemon__card-info__ability__name' 
                        url={item?.stat?.url}
                    />
                    <p className='pokemon__card-info__ability__stat'>
                    {item?.base_stat} 
                    </p>
                </div>
            ))}

        </div>
    )
}
