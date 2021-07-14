import calculate from "./business"

export default function (req, res) {
  const {startTime, distance} = req.query
  const ridePrice = calculate(startTime, distance)
  res.type('application/json')
  res.send({
    cost: ridePrice
  })
}
