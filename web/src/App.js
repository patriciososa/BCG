import React, { useState, useEffect } from 'react'
import Ride from './components/Ride'
import './app.css'

function App() {
  const [rides, setRides] = useState([])

  const getRides = async () => {
    const response = await fetch('http://localhost:9500/api')
    return await response.json()
  }

  useEffect(async () => {
    const rides = await getRides()
    setRides(rides)
  }, [])

  return (
    <ul className="App">
      {rides.map(ride => <Ride ride={ride}/>)}
    </ul>
  )
}

export default App