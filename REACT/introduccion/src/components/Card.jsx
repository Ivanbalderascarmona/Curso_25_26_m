// que acepte como props src y un texto y que automaticamente sea capaz de pintarme una tarjeta
// con una imagen y un texto. Pintar en app un par de tarjetas con imagenes diferentes

import React from 'react'

function Card({ src, text }) {
  return (
      <figure>
        <img src={src} alt="Imagen" />
        <figcaption>{text}</figcaption>
      </figure>
  )
}

export default Card