import Main, { main } from './screens/Main/main'
import { Route, RouterProvider } from 'atomic-router-react'
import Search from './features/Search/Search'
import { createHistoryRouter, createRoute } from 'atomic-router'
import React from 'react'
import Weather from './features/Weather/Weather'
import { createBrowserHistory } from 'history'

export const homeRoute = createRoute()
export const otherRoute = createRoute()
export const weatherRoute = createRoute()

export const App = () => {
  const routes = [
    { path: '/', route: homeRoute },
    { path: '/search', route: otherRoute },
    { path: '/search/weather', route: weatherRoute }
  ]

  const history = createBrowserHistory()

  const router = createHistoryRouter({
    routes
  })

  router.setHistory(history)

  return (
    <>
      <div>
        <RouterProvider router={router}>
          <Route route={homeRoute} view={Main} />
          <Route route={otherRoute} view={Search} />
          <Route route={weatherRoute} view={Weather} />
        </RouterProvider>
      </div>
    </>
  )
}
