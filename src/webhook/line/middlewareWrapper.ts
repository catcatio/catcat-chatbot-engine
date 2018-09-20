export default (lineMiddleware) => (req, res, next) => {
  try {
    const nextProxy = (err) => {
      if (err instanceof Error) {
        console.log(err.message)
        res.status(500).send(err.message)
      } else {
        next()
      }
    }
    // Check Line signature and convert body to JSON
    lineMiddleware(req, res, nextProxy)
  } catch (error) {
    console.log(error.message)
    throw error
  }
}