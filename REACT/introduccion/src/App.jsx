import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Padre from './components/Padre'
import Hijo from './components/Hijo'
import Card from './components/Card'

function App() {
  // hooks
  const [count, setCount] = useState(0)
  const [like, setLike] = useState("🤍")
  const [ stars, setStars] = useState("")
  //funciones
  function handleToggleLike () {
    like === "🤍" ? setLike("♥️") : setLike("🤍");
  }

  function handleToggleStar () {
    if (stars.length <= 8) {
      console.log(stars.length)
      setStars(stars.concat("⭐️"));
    }
    if (stars.length >= 9) {
      setStars("🌟🌟🌟🌟🌟 Game Over");
    }
  }


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => {count +1})}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <button onClick = {handleToggleLike}>{like}</button>
      <button onClick = {handleToggleStar}>{stars}</button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Padre saludo = "hola_mundo" edad = {34} datos = {{edad:20, nombre:"ivan"}}>
        <Hijo />
      </Padre>
      <Card src={reactLogo} text="React Logo" />
      <Card src={viteLogo} text="Vite Logo" />

    </>
  )
}

export default App
