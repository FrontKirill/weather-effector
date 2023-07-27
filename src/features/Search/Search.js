import React, { useState } from 'react'
import { SearchButton } from './Search.styles'
import { debounce } from 'debounce'
import Input from '../../UI/Input'
import { $cities, searchCity } from './model'
import { useStore } from 'effector-react'
import { $weather, searchWeatherCoord, searchWeatherFx } from '../Weather/modelWeather'
import { weatherRoute } from '../../App'
import { redirect } from 'atomic-router'

const Search = () => {
  const [geo, setGeo] = useState({})
  const [cityIn, setCityIn] = useState('')
  const cities = useStore($cities)

  const handleCityChange = debounce(cityIn => {
    setCityIn(cityIn)
    searchCity(cityIn)
  }, 500)

  const getWeather = ({ lon, lat }) => {
    setGeo({ lon, lat })
    $weather.reset(searchWeatherCoord)
    searchWeatherCoord({
      lon,
      lat
    })
    redirect({
      clock: searchWeatherFx.done,
      route: weatherRoute,
      query: { lon: lon, lat: lat }
    })
  }

  return (
    <div>
      <div>Поиск города</div>
      <Input onChange={handleCityChange} />
      <div>
        {cities?.map(city => (
          <SearchButton key={city.lat} onClick={() => getWeather({ lon: city.lon, lat: city.lat })}>
            {city.name}: {city.country}
          </SearchButton>
        ))}
      </div>
    </div>
  )
}

export default Search
