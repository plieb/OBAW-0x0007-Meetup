/* module improts */
import { Client } from 'recastai'
import handleAction from './actions'

const recastClient = new Client(process.env.RE_BOT_TOKEN)

export async function handleMessage(message) {
  console.log('\n**********************************************************')
  try {
    console.log('MESSAGE RECEIVED', message)

    let text = message.content.attachment.content
    let payload = ''
    let replies = []
    const { senderId } = message
    if (message.content.attachment.type === 'payload') {
      payload = JSON.parse(message.content.attachment.content)
      text = payload.text
    }
    const res = await recastClient.textConverse(text, { conversationToken: senderId })
    console.log('RECAST ANSWER', res)
    replies = await handleAction(res, payload)
    replies.forEach(reply => message.addReply(reply))

    await message.reply()
  } catch (err) {
    console.error('An error occured while handling message', err)
  }
  console.log('**********************************************************\n')
}
