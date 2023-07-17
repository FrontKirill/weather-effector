import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../../features/Search/Search'

const main = () => {
  return (
    <>
      <Search />
      <div>
        Перейти обратно. <Link to='/'>Главная</Link>
      </div>
    </>
  )
}

export default main
