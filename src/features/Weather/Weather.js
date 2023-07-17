import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useList, useStore } from 'effector-react'
import { $weather, searchWeatherCoord } from './modelWeather'
import { $cities } from '../Search/model'
import main from '../../screens/Main/main'
import { createEvent } from 'effector'

const Weather = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  console.log({ id, searchParams })

  const weathers = useStore($weather)
  const cities = useStore($cities)

  const searchWeatherOutput = geo => {
    searchWeatherCoord({
      query: id,
      ...geo
    })
  }

  useEffect(() => {
    const geo = {
      lat: searchParams.get('lat'),
      lon: searchParams.get('lon')
    }
    const isWeather = !!weathers.find(weather => weather.name === id)
    if (!isWeather) {
      // searchWeatherOutput(geo)
      console.log(weathers)
    }
  }, [searchParams, weathers])

  const renameWeather = createEvent()

  const infoWeather = useList($weather, ({ name, coord }, index) => (
    <li>
      [{index}] {name} {coord.lan}
    </li>
  ))

  return (
    <div>
      <div>
        <ul>{infoWeather}</ul>
        {weathers?.map(weatherIn => (
          <div>
            <h1 key={weatherIn.lat}>{weatherIn.name}</h1>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>Температура: {weatherIn.main.temp}K</div>
                <div>Скорость ветра: {weatherIn.wind.speed}M/c</div>
                {weatherIn.weather.map(item => (
                  <div>
                    Небо: {item.main}, {item.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Weather
