import React from 'react'

const Input = ({ onChange }) => {
  const handleCityChange = e => {
    onChange(e.target.value)
  }

  return <input type='text' name='city' placeholder='Впишите город' onChange={handleCityChange} />
}

export default Input
