const actions = {
  'get-info-people': require('./get-info-people'),
  'get-info-planet': require('./get-info-planet'),
  'get-info-film': require('./get-info-film'),
  'get-info-starship': require('./get-info-starship'),
  'get-info-vehicle': require('./get-info-vehicle'),
  'list': require('./list'),
}

export default function handleAction(res, message) {
  const currentAction = res.action && res.action.slug
  console.log(currentAction)
  let replies = []
  if (actions[currentAction]) {
    console.log('Enter action')
    replies = actions[currentAction].default(res)
  } else if (res.reply()) {
    replies.push({
      type: 'text',
      content: res.reply(),
    })
  } else {
    replies.push({
      type: 'text',
      content: 'Sorry I did not understand',
    })
  }
  return replies
}
