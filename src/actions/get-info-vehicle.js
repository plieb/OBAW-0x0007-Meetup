/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function getInfoVehicle(res) {
  console.log('GET INFO VEHICLE')

  const replies = []
  const quickReplies = []
  const vehicle = res.getMemory('vehicle')
  console.log('======================================')
  console.log(vehicle)
  console.log('======================================')
  replies.push(formatter.formatMsg(`Looking for information regarding ${vehicle.value}`))
  const response = await agent('GET', `https://swapi.co/api/vehicles/?search=${vehicle.value}`)
  const vehicleAnswer = response.body
  if (vehicleAnswer.results.length) {
    const manufacturer = vehicleAnswer.results[0].manufacturer
    const costInCredits = vehicleAnswer.results[0].cost_in_credits
    const length = vehicleAnswer.results[0].length
    const crew = vehicleAnswer.results[0].crew
    const passengers = vehicleAnswer.results[0].passenger
    const cargoCapacity = vehicleAnswer.results[0].cargo_capacity
    const consumables = vehicleAnswer.results[0].consumables
    const info = `${vehicle.value} :\n- Manufacturer: ${manufacturer}\n- Cost in credits: ${costInCredits}\n- Lenght: ${length}\n- Crew: ${crew}- Passengers: ${passengers}\n- Cargo capacity: ${cargoCapacity}\n- Consumables: ${consumables}`
    replies.push(formatter.formatMsg(info))
    if (vehicleAnswer.results[0].pilots.length) {
      const responsePilot = await agent('GET', vehicleAnswer.results[0].pilots[0])
      const pilotAnswer = responsePilot.body
      quickReplies.push({ name: pilotAnswer.name, value: `Can I get information about ${pilotAnswer.name}` })
    }
    if (vehicleAnswer.results[0].films.length) {
      const responseFilm = await agent('GET', vehicleAnswer.results[0].films[0])
      const filmAnswer = responseFilm.body
      quickReplies.push({ name: filmAnswer.title, value: `Can I get information about ${filmAnswer.title}` })
    }
    replies.push(formatter.formatQuickReplies(quickReplies, vehicle))
  } else {
    replies.push(formatter.formatMsg(`Sorry I couldn't find any information regarding ${vehicle.value}`))
  }
  return replies
}
