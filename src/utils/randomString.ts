export default (len = 5) => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  len < 0 && (len = 0)
  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
