/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function getInfoPeople(res) {
  console.log('GET INFO PEOPLE')

  const replies = []
  const quickReplies = []
  const people = res.getMemory('people')
  console.log('======================================')
  console.log(people)
  console.log('======================================')
  replies.push(formatter.formatMsg(`Looking for information regarding ${people.value}`))
  const response = await agent('GET', `https://swapi.co/api/people/?search=${people.value}`)
  const peopleAnswer = response.body
  if (peopleAnswer.results.length) {
    const height = peopleAnswer.results[0].height
    const mass = peopleAnswer.results[0].mass
    const hairColor = peopleAnswer.results[0].hair_color
    const skinColor = peopleAnswer.results[0].skin_color
    const eyeColor = peopleAnswer.results[0].eye_color
    const birthYear = peopleAnswer.results[0].birth_year
    const gender = peopleAnswer.results[0].gender
    const info = `${people.value} :\n- Height: ${height}\n- Mass: ${mass}\n- Hair color: ${hairColor}\n- Skin color: ${skinColor}\n- Eye color: ${eyeColor}\n- Birth year: ${birthYear}\n- Gender: ${gender}`
    replies.push(formatter.formatMsg(info))
    if (peopleAnswer.results[0].homeworld) {
      const responsePlanet = await agent('GET', peopleAnswer.results[0].homeworld)
      const planetAnswer = responsePlanet.body
      quickReplies.push({ name: planetAnswer.name, value: `Can I get information about ${planetAnswer.name}` })
    }
    if (peopleAnswer.results[0].starships.length) {
      const responseStarship = await agent('GET', peopleAnswer.results[0].starships[0])
      const starshipAnswer = responseStarship.body
      quickReplies.push({ name: starshipAnswer.name, value: `Can I get information about ${starshipAnswer.name}` })
    }
    if (peopleAnswer.results[0].vehicles.length) {
      const responseVehicle = await agent('GET', peopleAnswer.results[0].vehicles[0])
      const vehicleAnswer = responseVehicle.body
      quickReplies.push({ name: vehicleAnswer.name, value: `Can I get information about ${vehicleAnswer.name}` })
    }
    replies.push(formatter.formatQuickReplies(quickReplies, people))
  } else {
    replies.push(formatter.formatMsg(`Sorry I couldn't find any information regarding ${people.value}`))
  }
  return replies
}
