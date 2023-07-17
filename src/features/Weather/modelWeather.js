import { createEvent, createStore, sample } from 'effector'
import { WEATHER_API } from '../../lib/config'
import { createRequestFx } from '../../models/init/model'
import { createRoute, redirect } from 'atomic-router'
import { $cities } from '../Search/model'

export const $weather = createStore([])

export const searchWeatherCoord = createEvent()

export const searchWeatherFx = createRequestFx(WEATHER_API, '/weather', {
  method: 'GET'
})

sample({
  clock: searchWeatherCoord,
  fn: (_, { q, lon, lat }) => ({ query: { q, lon, lat } }),
  target: searchWeatherFx
})

// sample({
//   clock: searchWeatherFx.finally,
//   fn: ()
// })

$weather.on(searchWeatherFx.doneData, (state, weather) => [...state, weather])

// $weather.watch(a => console.log(a));
searchWeatherCoord.watch(a => console.log(a))
searchWeatherFx.watch(a => console.log(a))
