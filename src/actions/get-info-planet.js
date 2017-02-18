/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function getInfoPlanet(res) {
  console.log('GET INFO PLANET')

  const replies = []
  const quickReplies = []
  const planet = res.getMemory('planet')
  console.log('======================================')
  console.log(planet)
  console.log('======================================')
  replies.push(formatter.formatMsg(`Looking for information regarding ${planet.value}`))
  const response = await agent('GET', `https://swapi.co/api/planets/?search=${planet.value}`)
  const planetAnswer = response.body
  if (planetAnswer.results.length) {
    const rotationPeriod = planetAnswer.results[0].rotation_period
    const orbitalPeriod = planetAnswer.results[0].orbital_period
    const climate = planetAnswer.results[0].climate
    const gravity = planetAnswer.results[0].gravity
    const terrain = planetAnswer.results[0].terrain
    const surfaceWater = planetAnswer.results[0].surface_water
    const population = planetAnswer.results[0].population
    const info = `${planet.value} :\n- Rotation period: ${rotationPeriod}\n- Orbital period: ${orbitalPeriod}\n- Gravity: ${gravity}\n- Climate: ${climate}- Terrain: ${terrain}\n- Surface water: ${surfaceWater}\n- Population: ${population}`
    replies.push(formatter.formatMsg(info))
    if (planetAnswer.results[0].residents.length) {
      const responseCharacter = await agent('GET', planetAnswer.results[0].residents[0])
      const characterAnswer = responseCharacter.body
      quickReplies.push({ name: characterAnswer.name, value: `Can I get information about ${characterAnswer.name}` })
    }
    if (planetAnswer.results[0].films.length) {
      const responseFilm = await agent('GET', planetAnswer.results[0].films[0])
      const filmAnswer = responseFilm.body
      quickReplies.push({ name: filmAnswer.title, value: `Can I get information about ${filmAnswer.title}` })
    }
    replies.push(formatter.formatQuickReplies(quickReplies, planet))
  } else {
    replies.push(formatter.formatMsg(`Sorry I couldn't find any information regarding ${planet.value}`))
  }
  return replies
}
