/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function findEvents(res) {
  console.log('FIND EVENTS')

  const replies = []
  const cardsReplies = []
  const location = res.getMemory('location')
  console.log('======================================')
  console.log(location)
  console.log('======================================')
  if (location) {
    replies.push(formatter.formatMsg(`Looking for meetups near ${location.formatted}`))
    const response = await agent('GET', `https://api.meetup.com/find/events?key=${process.env.MEETUP_API_KEY}&lat=${location.lat}&long=${location.lng}`)
    const meetups = response.body
    if (meetups.length) {
      const index = Math.floor((Math.random() * (meetups.length - 10)) + 1)
      const meetupSliced = meetups.slice(index, index + 8)
      console.log('======================================')
      console.log(meetupSliced)
      console.log('======================================')
      meetupSliced.forEach(async (m) => {
        console.log('======================================')
        console.log(m.group)
        console.log(m.group.urlname)
        console.log(m.venue)
        console.log(m.venue.city)
        console.log(m.venue.address_1)
        console.log('======================================')
        const responsePicture = await agent('GET', `https://api.meetup.com/${m.group.urlname}?key=${process.env.MEETUP_API_KEY}`)
        const picture = responsePicture.body
        console.log('======================================')
        console.log(m.name)
        console.log(m.venue.city)
        console.log(picture.organizer.photo.photo_link)
        console.log('======================================')
        cardsReplies.push({
          name: m.name,
          city: m.venue.city,
          picture: picture.organizer.photo.photo_link,
        })
        console.log('======================================')
        console.log(cardsReplies)
        console.log('======================================')
      })
      console.log('======================================')
      console.log(cardsReplies)
      console.log('======================================')
      replies.push(formatter.formatCardsReplies(cardsReplies))
    } else {
      replies.push(formatter.formatMsg(`Couldn't fint any meetups near ${location.formatted}`))
    }
  } else {
    replies.push(formatter.formatMsg(res.reply()))
  }
  return replies
}
