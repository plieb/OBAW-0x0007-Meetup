/* module imports */

exports.formatMsg = msg => ({
  type: 'text',
  content: msg,
})

exports.formatQuickReplies = (quickRp, res) => {
  const elements = []
  quickRp.forEach((elem) => {
    elements.push({
      title: elem.name,
      value: elem.value,
    })
  })
  return {
    type: 'quickReplies',
    content: {
      title: `More information regarding ${res.value}`,
      buttons: elements,
    },
  }
}
