/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')
const async = require('async')

export default async function findEvents(res) {
  console.log('FIND EVENTS')

  const replies = []
  const cardsReplies = []
  const location = res.getMemory('location')
  if (location) {
    replies.push(formatter.formatMsg(`Looking for meetups near ${location.formatted}`))
    const response = await agent('GET', `https://api.meetup.com/find/events?key=${process.env.MEETUP_API_KEY}&lat=${location.lat}&long=${location.lng}`)
    const meetups = response.body
    if (meetups.length) {
      const index = Math.floor((Math.random() * (meetups.length - 10)) + 1)
      const meetupSliced = meetups.slice(index, index + 8)
      async.each(meetupSliced, async (m) => {
        const responsePicture = await agent('GET', `https://api.meetup.com/${m.group.urlname}?key=${process.env.MEETUP_API_KEY}`)
        const picture = responsePicture.body
        console.log('======================================')
        console.log(responsePicture)
        console.log('======================================')
        cardsReplies.push({
          name: m.name,
          city: m.venue.city,
          picture: picture.organizer.photo.photo_link,
        })
      }, (err) => {
        if (err) {
          console.log(err)
        } else {
          replies.push(formatter.formatCardsReplies(cardsReplies))
        }
      })
    } else {
      replies.push(formatter.formatMsg(res.reply()))
    }
  }
  return replies
}
