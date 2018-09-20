import 'mocha'
import * as request from 'request-promise-native'

const port = 3000
const rootUrl = `http://localhost:${port}`

const delay = (timeMs) => new Promise((resolve) => {
  console.log(`delay for ${timeMs}`)
  setTimeout(resolve, timeMs)
})

describe('API test', () => {
  describe('webhook/line', () => {
    const webhookLineUrl = `${rootUrl}/webhook/line`

    beforeEach(async () => {
      await delay(2000)
    })

    it('Just call', async () => {
      request({
        method: 'POST',
        uri: webhookLineUrl,
        headers: {
          'x-line-signature': 'signature'
        },
        body: {
          events: [{
            "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
            "type": "message",
            "timestamp": 1462629479859,
            "source": {
              "type": "user",
              "userId": "U4af4980629..."
            },
            "message": {
              "id": "325708",
              "type": "text",
              "text": "Hello, world!"
            }
          }]
        },
        json: true
      })
        .then(result => console.log(result))
        .catch(err => console.error(err.message))
    })
  })
})