import React, { useState, useEffect } from 'react'
import './ride.css'

function Ride(rideData) {
  const {ride} = rideData
  const [cost, setCost] = useState(null)
  const [clicked, setClicked] = useState(false)

  const getClassName = (distance) => {
    return distance > 2 ? 'long' : ''
  }

  const getCost = async () => {
    const response = await fetch(`http://localhost:9000/ride-price?startTime=${ride.startTime}&distance=${ride.distance}`)
    return await response.json()
  }

  const getEndRideDate = () => {
    const rideTime = new Date(ride.startTime).getTime()
    const rideMillisecons = ride.duration * 1000
    const endDate = new Date(rideTime + rideMillisecons)
    return endDate.toISOString()
  }

  const getEndRideDuration = () => {
    return new Date(ride.duration * 1000).toISOString().substr(11, 8)
  }

  const onRideClick = () => {
    setClicked(true)
    alert(`${getEndRideDuration()} - ${getEndRideDate()}`)
  }

  useEffect(async () => {
    const {cost} = await getCost()
    setCost(cost)
  }, [])

  return (
    <li key={ride.id}>
      <button onClick={onRideClick} className={getClassName(ride.distance)}>
        <span>id: {ride.id} {clicked ? 'Clicked' : ''}</span>
        <span>cost: {cost}</span>
      </button>
    </li>
  );
}

export default Ride