import React from 'react'
import './Pokemon.css'
function Pokemon({name,image,type}) {
  return (
    <div className='pokemon'>
      <div className='pokemon-name'>{name}</div>
      <div><img className='pokemon-image' src={image} alt="" /></div>
      <div>{type}</div>
    </div>
  )
}

export default Pokemon
