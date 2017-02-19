/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function register(res, payload) {
  console.log('REGISTER OR UNREGISTER')

  const replies = []
  if (payload.rsvp === 'yes') {
    replies.push(formatter.formatMsg('You are now register to the event!'))
    await agent
      .post(`https://api.meetup.com/${payload.groupurl}/events/${payload.id}/rsvps`)
      .query({ key: process.env.MEETUP_API_KEY })
      .query({ response: 'yes' })
  } else {
    replies.push(formatter.formatMsg('You are now unsubscribed from the event'))
    await agent
      .post(`https://api.meetup.com/${payload.groupurl}/events/${payload.id}/rsvps`)
      .query({ key: process.env.MEETUP_API_KEY })
      .query({ response: 'no' })
  }
  return replies
}
