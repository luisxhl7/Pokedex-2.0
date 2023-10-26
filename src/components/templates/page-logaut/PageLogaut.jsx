import React from 'react'
import { NavBar } from '../../molecules/navBar'
import './PageLogaut.scss'

export const PageLogaut = ({children}) => {
  return (
    <>
      <NavBar/>
      <main className='pagelogaut'>
        {children}
      </main>
    </>
  )
}
