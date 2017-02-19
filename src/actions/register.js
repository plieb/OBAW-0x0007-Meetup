/* module imports */
const agent = require('superagent-promise')(require('superagent'), Promise)
const formatter = require('../formatter')

export default async function register(res, payload) {
  console.log('REGISTER OR UNREGISTER')

  const replies = []
  if (payload.rsvp === 'yes') {
    replies.push(formatter.formatMsg('You are now register to the event!'))
    const res1 = await agent('POST', `https://api.meetup.com/${payload.groupurl}/events/${payload.id}/rspvs?key=${process.env.MEETUP_API_KEY}&response=yes`)
    console.log('======================================')
    console.log(res1.body)
    console.log('======================================')
  } else {
    replies.push(formatter.formatMsg('You are now unsubscribed to the event'))
    const res2 = await agent('POST', `https://api.meetup.com/${payload.groupurl}/events/${payload.id}/rspvs?key=${process.env.MEETUP_API_KEY}&response=no`)
    console.log('======================================')
    console.log(res2.body)
    console.log('======================================')
  }
  return replies
}
