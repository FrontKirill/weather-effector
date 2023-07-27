import { useStore } from 'effector-react'
import { $weather, searchWeatherCoord } from './modelWeather'
import { Link } from 'atomic-router-react'
import { homeRoute, otherRoute } from '../../App'
import { useEffect } from 'react'
const Weather = () => {
  const weathers = useStore($weather)
  const searchString = new URLSearchParams(window.location.search)

  useEffect(() => {
    const latF = searchString.get('lat')
    const lonF = searchString.get('lon')
    const geo = {
      lat: latF,
      lon: lonF
    }
    const isWeather = !!weathers.find(weather => weather.name)
    if (!isWeather) {
      searchWeatherCoord(geo)
    }
  }, [weathers])

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={homeRoute}>На главную страницу</Link>
          <Link style={{ marginLeft: 50 }} to={otherRoute}>
            На страницу поиска
          </Link>
        </div>
        <div>
          {weathers?.map(weatherIn => (
            <div key={weatherIn.name}>
              <h1>{weatherIn.name}</h1>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>Температура: {weatherIn.main.temp}K</div>
                  <div>Скорость ветра: {weatherIn.wind.speed}M/c</div>
                  {weatherIn.weather.map(item => (
                    <div key={item.id}>
                      Небо: {item.main}, {item.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Weather
