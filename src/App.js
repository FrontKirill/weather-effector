import Main from './screens/Main/main'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import ScreenWeather from './screens/WeatherScreen/screenWeather'

export const App = () => {
  return (
    <>
      <div>
        <Link to='/'> Поиск по городу </Link>
        <Link to='/screenWeather'> Погода </Link>
      </div>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<ScreenWeather />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}
