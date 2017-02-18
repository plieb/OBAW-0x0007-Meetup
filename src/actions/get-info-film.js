/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function getInfoFilm(res) {
  console.log('GET INFO FILM')

  const replies = []
  const quickReplies = []
  const film = res.getMemory('film')
  console.log('======================================')
  console.log(film)
  console.log('======================================')
  replies.push(formatter.formatMsg(`Looking for information regarding ${film.value}`))
  const response = await agent('GET', `https://swapi.co/api/films/?search=${film.value}`)
  const filmAnswer = response.body
  if (filmAnswer.results.length) {
    const title = filmAnswer.results[0].title
    const episodeId = filmAnswer.results[0].episode_id
    const director = filmAnswer.results[0].director
    const producer = filmAnswer.results[0].producer
    const releaseDate = filmAnswer.results[0].release_date
    const info = `${film.value} :\n- Title: ${title}\n- Episode id: ${episodeId}\n- Director: ${director}\n- Produce: ${producer}\n- Release date: ${releaseDate}`
    replies.push(formatter.formatMsg(info))
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
  }
  return replies
}
