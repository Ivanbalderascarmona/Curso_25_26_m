import React from 'react'

const Padre = ( { saludo, edad, datos } ) => {
  return (
    <>
      <div>Padre {saludo}</div>
      <div>edad: {edad}</div>
      <div>datos: </div>
      <p>edad: {datos.edad}</p>
      <p>nombre: {datos.nombre}</p>
    </>
  )
}

export default Padre