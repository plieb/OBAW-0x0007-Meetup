/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function findEvents(res) {
  console.log('FIND EVENTS')

  const replies = []
  const quickReplies = []
  const location = res.getMemory('location')
  console.log('======================================')
  console.log(location)
  console.log('======================================')
  if (location) {
    replies.push(formatter.formatMsg(`Looking for meetups near ${location.formatted}`))
    const response = await agent('GET', `https://api.meetup.com/find/events?key=${process.env.MEETUP_API_KEY}&lat=${location.lat}&long=${location.lng}`)
    const meetups = response.body
    console.log('======================================')
    console.log(meetups)
    console.log('======================================')
    /*replies.push(formatter.formatMsg(info))
    if (filmAnswer.results[0].characters.length) {
      const responseCharacter = await agent('GET', filmAnswer.results[0].characters[0])
      const characterAnswer = responseCharacter.body
      quickReplies.push({ name: characterAnswer.name, value: `Can I get information about ${characterAnswer.name}` })
    }
    if (filmAnswer.results[0].planets.length) {
      const responsePlanet = await agent('GET', filmAnswer.results[0].planets[0])
      const planetAnswer = responsePlanet.body
      quickReplies.push({ name: planetAnswer.name, value: `Can I get information about ${planetAnswer.name}` })
    }
    if (filmAnswer.results[0].starships.length) {
      const responseStarship = await agent('GET', filmAnswer.results[0].starships[0])
      const starshipAnswer = responseStarship.body
      quickReplies.push({ name: starshipAnswer.name, value: `Can I get information about ${starshipAnswer.name}` })
    }
    if (filmAnswer.results[0].vehicles.length) {
      const responseVehicle = await agent('GET', filmAnswer.results[0].vehicles[0])
      const vehicleAnswer = responseVehicle.body
      quickReplies.push({ name: vehicleAnswer.name, value: `Can I get information about ${vehicleAnswer.name}` })
    }
    replies.push(formatter.formatQuickReplies(quickReplies, film))
  } else {
    replies.push(formatter.formatMsg(`Sorry I couldn't find any information regarding ${film.value}`))
  }*/
  }
  return replies
}
