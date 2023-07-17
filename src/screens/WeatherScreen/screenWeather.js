import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react'
import { $cities } from '../../features/Search/model'
import { $weather } from '../../features/Weather/modelWeather'
import Weather from '../../features/Weather/Weather'

const ScreenWeather = () => {
  return (
    <div>
      <Weather />
    </div>
  )
}

export default ScreenWeather
