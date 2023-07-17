import React, { useEffect, useState } from 'react'
import { SearchButton } from './Search.styles'
import { debounce } from 'debounce'
import Input from '../../UI/Input'
import { $cities, searchCity } from './model'
import { useStore } from 'effector-react'
import { Link, useNavigate } from 'react-router-dom'
import { $weather, searchWeatherCoord, searchWeatherFx } from '../Weather/modelWeather'

const Search = () => {
  const [cityIn, setCityIn] = useState('')
  const [geo, setGeo] = useState({})

  const navigate = useNavigate()
  const cities = useStore($cities)
  const weathers = useStore($weather)

  const isWeatherFinally = useStore(searchWeatherFx.pending)

  useEffect(() => {
    if (isWeatherFinally) {
      navigate(`/${geo.name}?lon=${geo.lon}&lat=${geo.lat}`)
    }
  }, [isWeatherFinally, geo])

  const handleCityChange = debounce(cityIn => {
    setCityIn(cityIn)
    searchCity(cityIn)
  }, 500)

  const getWeather = debounce(({ lon, lat, name }) => {
    setGeo({ lon, lat, name })
    searchWeatherCoord({
      q: name,
      lon,
      lat
    })
  }, 500)

  return (
    <div>
      <Input onChange={handleCityChange} />
      <div>
        {cities?.map(city => (
          <SearchButton
            key={city.lat}
            onClick={() => getWeather({ lon: city.lon, lat: city.lat, name: city.name })}
          >
            {city.name}: {city.country}
          </SearchButton>
        ))}
      </div>
    </div>
  )
}

export default Search
