/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function getUpcoming(res) {
  console.log('GET UPCOMING')

  const replies = []
  const cardsReplies = []
  const pictures = []
  replies.push(formatter.formatMsg('Looking for upcoming meetups'))
  const response = await agent('GET', `https://api.meetup.com/self/events?key=${process.env.MEETUP_API_KEY}&status=upcoming`)
  const meetups = response.body
  if (meetups.length) {
    const m = meetups.slice(0, 8)
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
          city: null,
          picture: picture.group_photo.photo_link,
        })
      } else {
        cardsReplies.push({
          name: m[i].name,
          city: null,
          picture: picture.organizer.photo.photo_link,
        })
      }
    })
    replies.push(formatter.formatCardsReplies(cardsReplies))
  } else {
    replies.push(formatter.formatMsg(res.reply()))
  }
  return replies
}
