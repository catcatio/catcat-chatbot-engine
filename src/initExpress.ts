const express = require('express')

export = ({ port }) => {
  const app = express()
  port = port || 3000
  app.listen(port, (err) => {
    if (err) {
      return console.log(`Failed to start server on port ${port}`, err)
    }
    console.log(`Listening http://localhost:${port}`)
  })

  return app
}

