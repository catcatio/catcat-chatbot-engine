export = (config) => {

  const initExpress = require('./initExpress')
  const routers = require('./routers')

  const start = async () => {
    const app = initExpress(config)
    app.use(routers(config))
  }

  return {
    start
  }
}