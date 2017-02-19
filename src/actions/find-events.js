/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function findEvents(res) {
  console.log('FIND EVENTS')

  const replies = []
  const cardsReplies = []
  const pictures = []
  const location = res.getMemory('location')
  console.log('======================================')
  console.log(location)
  console.log('======================================')
  if (location) {
    replies.push(formatter.formatMsg(`Looking for meetups near ${location.formatted}`))
    const response = await agent('GET', `https://api.meetup.com/recommended/events?key=${process.env.MEETUP_API_KEY}&lat=${location.lat}&long=${location.lng}`)
    const meetups = response.body
    if (meetups.length) {
      const index = Math.floor((Math.random() * (meetups.length - 10)) + 1)
      const m = meetups.slice(index, index + 8)
      pictures[0] = await agent('GET', `https://api.meetup.com/${m[0].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures[1] = await agent('GET', `https://api.meetup.com/${m[1].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures[2] = await agent('GET', `https://api.meetup.com/${m[2].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures[3] = await agent('GET', `https://api.meetup.com/${m[3].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures[4] = await agent('GET', `https://api.meetup.com/${m[4].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures[5] = await agent('GET', `https://api.meetup.com/${m[5].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures[6] = await agent('GET', `https://api.meetup.com/${m[6].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures[7] = await agent('GET', `https://api.meetup.com/${m[7].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
      pictures.forEach((p, i) => {
        const picture = p.body
        if (picture.group_photo) {
          cardsReplies.push({
            name: m[i].name,
            city: location.formatted,
            link: m[i].link,
            picture: picture.group_photo.photo_link,
            register: {
              groupurl: m[i].group.urlname,
              id: m[i].id,
              rsvp: 'yes',
            },
          })
        } else {
          cardsReplies.push({
            name: m[i].name,
            city: location.formatted,
            link: m[i].link,
            picture: picture.organizer.photo.photo_link,
            register: {
              groupurl: m[i].group.urlname,
              id: m[i].id,
              rsvp: 'yes',
            },
          })
        }
      })
      replies.push(formatter.formatCardsReplies(cardsReplies))
    } else {
      replies.push(formatter.formatMsg(res.reply()))
    }
  }
  return replies
}
