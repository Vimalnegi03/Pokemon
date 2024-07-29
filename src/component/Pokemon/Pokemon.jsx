import React from 'react'

function Pokemon({name,image,type}) {
  return (
    <div>
      <div>{name}</div>
      <div><img src={image} alt="" /></div>
      <div>{type}</div>
    </div>
  )
}

export default Pokemon
