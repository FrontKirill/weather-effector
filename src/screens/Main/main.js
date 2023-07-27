import React from 'react'
import { Link } from 'atomic-router-react'
import { otherRoute } from '../../App'
const main = () => {
  return (
    <>
      <div>Домашняя страница</div>
      <Link to={otherRoute}> Страница поиска </Link>
    </>
  )
}

export default main
