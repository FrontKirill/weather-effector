import { createEvent, createStore, sample } from 'effector'
import { WEATHER_API } from '../../lib/config'
import { createRequestFx } from '../../models/init/model'

export const $weather = createStore([])

export const searchWeatherCoord = createEvent()
export const reloadPage = createEvent(document.location.reload)

export const searchWeatherFx = createRequestFx(WEATHER_API, '/weather', {
  method: 'GET'
})

sample({
  clock: searchWeatherCoord,
  fn: (_, { q, lon, lat }) => ({ query: { q, lon, lat } }),
  target: searchWeatherFx
})

$weather.on(searchWeatherFx.doneData, (state, weather) => [...state, weather])
