/* module imports */
import Bot from 'recastai-botconnector'
import express from 'express'
import bodyParser from 'body-parser'
import { handleMessage } from './messages'

const app = express()

app.set('port', process.env.PORT || 5000)

app.use(bodyParser.json())

const myBot = new Bot({
  userSlug: process.env.BC_USER_SLUG,
  botId: process.env.BC_BOT_ID,
  userToken: process.env.BC_USER_TOKEN,
})

app.post('/webhook', (req, res) => myBot.listen(req, res))

myBot.onTextMessage(handleMessage)

app.listen(app.get('port'), () => {
  console.log(`Meetup bot running on port ${app.get('port')}`)
})
