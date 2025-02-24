import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './page/Game'
import Landing from './page/Landing'

function App() {
const[start,setStart]=useState(false)

  return (
    <>
    {start?<Game goHome={setStart}/>:<Landing  start={setStart}/>}
     
    </>
  )
}

export default App
