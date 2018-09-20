const pad = (n, width, z = '0') => {
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

const makeSessionId = (event) => {
  const now = new Date()
  try {
    return `${event.source.userId}`
  } catch (err) {
    return `${now.getFullYear()}-${pad(now.getMonth(), 2)}-${pad(now.getDate(), 2)}T00:00:00.000Z`
  }
}

export default {
  makeSessionId
}