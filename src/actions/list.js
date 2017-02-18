
/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function getList(res) {
  console.log('GET LIST')

  const replies = []
  const quickReplies = []
  const list = res.getMemory('list')
  console.log('======================================')
  console.log(list)
  console.log('======================================')
  replies.push(formatter.formatMsg(`Looking for a list of ${list.value}`))
  if (list.value === 'film') {
    const response = await agent('GET', 'https://swapi.co/api/films/')
    const filmAnswer = response.body
    filmAnswer.results.forEach((f) => {
      quickReplies.push({ name: f.title, value: `Can I get information about ${f.title}` })
    })
    replies.push(formatter.formatQuickReplies(quickReplies, list))
  } else if (list.value === 'people') {
    const page = Math.floor((Math.random() * 9) + 1)
    const response = await agent('GET', `https://swapi.co/api/people/?page=${page}`)
    const peopleAnswer = response.body
    peopleAnswer.results.forEach((f) => {
      quickReplies.push({ name: f.name, value: `Can I get information about ${f.name}` })
    })
    replies.push(formatter.formatQuickReplies(quickReplies, list))
  } else if (list.value === 'vehicle') {
    const page = Math.floor((Math.random() * 4) + 1)
    const response = await agent('GET', `https://swapi.co/api/vehicles/?page=${page}`)
    const peopleAnswer = response.body
    peopleAnswer.results.forEach((f) => {
      quickReplies.push({ name: f.name, value: `Can I get information about ${f.name}` })
    })
    replies.push(formatter.formatQuickReplies(quickReplies, list))
  } else if (list.value === 'starship') {
    const page = Math.floor((Math.random() * 4) + 1)
    const response = await agent('GET', `https://swapi.co/api/starships/?page=${page}`)
    const peopleAnswer = response.body
    peopleAnswer.results.forEach((f) => {
      quickReplies.push({ name: f.name, value: `Can I get information about ${f.name}` })
    })
    replies.push(formatter.formatQuickReplies(quickReplies, list))
  } else if (list.value === 'planet') {
    const page = Math.floor((Math.random() * 6) + 1)
    const response = await agent('GET', `https://swapi.co/api/planets/?page=${page}`)
    const peopleAnswer = response.body
    peopleAnswer.results.forEach((f) => {
      quickReplies.push({ name: f.name, value: `Can I get information about ${f.name}` })
    })
    replies.push(formatter.formatQuickReplies(quickReplies, list))
  } else {
    replies.push(formatter.formatMsg(`Sorry I couldn't find any information regarding ${list.value}`))
  }
  return replies
}
