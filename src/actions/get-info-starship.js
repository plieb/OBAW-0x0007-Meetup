/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function getInfoStarship(res) {
  console.log('GET INFO STARSHIP')

  const replies = []
  const quickReplies = []
  const starship = res.getMemory('starship')
  console.log('======================================')
  console.log(starship)
  console.log('======================================')
  replies.push(formatter.formatMsg(`Looking for information regarding ${starship.value}`))
  const response = await agent('GET', `https://swapi.co/api/starships/?search=${starship.value}`)
  const starshipAnswer = response.body
  if (starshipAnswer.results.length) {
    const manufacturer = starshipAnswer.results[0].manufacturer
    const costInCredits = starshipAnswer.results[0].cost_in_credits
    const length = starshipAnswer.results[0].length
    const crew = starshipAnswer.results[0].crew
    const passengers = starshipAnswer.results[0].passenger
    const cargoCapacity = starshipAnswer.results[0].cargo_capacity
    const consumables = starshipAnswer.results[0].consumables
    const info = `${starship.value} :\n- Manufacturer: ${manufacturer}\n- Cost in credits: ${costInCredits}\n- Lenght: ${length}\n- Crew: ${crew}- Passengers: ${passengers}\n- Cargo capacity: ${cargoCapacity}\n- Consumables: ${consumables}`
    replies.push(formatter.formatMsg(info))
    if (starshipAnswer.results[0].pilots.length) {
      const responsePilot = await agent('GET', starshipAnswer.results[0].pilots[0])
      const pilotAnswer = responsePilot.body
      quickReplies.push({ name: pilotAnswer.name, value: `Can I get information about ${pilotAnswer.name}` })
    }
    if (starshipAnswer.results[0].films.length) {
      const responseFilm = await agent('GET', starshipAnswer.results[0].films[0])
      const filmAnswer = responseFilm.body
      quickReplies.push({ name: filmAnswer.title, value: `Can I get information about ${filmAnswer.title}` })
    }
    replies.push(formatter.formatQuickReplies(quickReplies, starship))
  } else {
    replies.push(formatter.formatMsg(`Sorry I couldn't find any information regarding ${starship.value}`))
  }
  return replies
}
