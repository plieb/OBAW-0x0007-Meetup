/* module improts */
import { Client } from 'recastai'
import handleAction from './actions'

const recastClient = new Client(process.env.RE_BOT_TOKEN)

export async function handleMessage(message) {
  console.log('\n**********************************************************')
  try {
    console.log('MESSAGE RECEIVED', message)

    const text = message.content.attachment.content
    let replies = []
    const { senderId } = message
    const res = await recastClient.textConverse(text, { conversationToken: senderId })
    console.log('RECAST ANSWER', res)
    replies = await handleAction(res)
    replies.forEach(reply => message.addReply(reply))

    await message.reply()
  } catch (err) {
    console.error('An error occured while handling message', err)
  }
  console.log('**********************************************************\n')
}
