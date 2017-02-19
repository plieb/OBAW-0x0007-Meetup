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
    const m = meetups.slice(0, 5)
    if (m[0]) {
      pictures[0] = await agent('GET', `https://api.meetup.com/${m[0].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
    }
    if (m[1]) {
      pictures[1] = await agent('GET', `https://api.meetup.com/${m[1].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
    }
    if (m[2]) {
      pictures[2] = await agent('GET', `https://api.meetup.com/${m[2].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
    }
    if (m[3]) {
      pictures[3] = await agent('GET', `https://api.meetup.com/${m[3].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
    }
    if (m[4]) {
      pictures[4] = await agent('GET', `https://api.meetup.com/${m[4].group.urlname}?key=${process.env.MEETUP_API_KEY}`)
    }
    pictures.forEach((p, i) => {
      const picture = p.body
      if (picture.group_photo) {
        cardsReplies.push({
          name: m[i].name,
          city: null,
          link: m[i].link,
          picture: picture.group_photo.photo_link,
          register: {
            groupurl: m[i].group.urlname,
            id: m[i].id,
            rsvp: 'no',
          },
        })
      } else {
        cardsReplies.push({
          name: m[i].name,
          city: null,
          link: m[i].link,
          picture: picture.organizer.photo.photo_link,
          register: {
            groupurl: m[i].group.urlname,
            id: m[i].id,
            rsvp: 'no',
          },
        })
      }
    })
    replies.push(formatter.formatCardsReplies(cardsReplies))
  } else {
    replies.push(formatter.formatMsg(res.reply()))
  }
  return replies
}
