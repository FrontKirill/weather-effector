import { createEvent, createStore, sample } from 'effector'
import { CITIES_API } from '../../lib/config'
import { createRequestFx } from '../../models/init/model'

export const $cities = createStore([])
export const searchCity = createEvent()

export const searchCityFx = createRequestFx(CITIES_API, '/direct', {
  method: 'GET',
  query: {
    limit: 5
  }
})

sample({
  clock: searchCity,
  fn: (_, q) => ({
    query: {
      q
    }
  }),
  target: searchCityFx
})

$cities.on(searchCityFx.doneData, (state, cities) => cities)

// $weather.watch(a => console.log(a));
// searchWeather.watch(a => console.log(a));
// searchWeatherFx.watch(a => console.log(a));
//
// $cities.watch(a => console.log(a))
// search.watch(a => console.log(a))
// searchFx.watch(a => console.log(a))
