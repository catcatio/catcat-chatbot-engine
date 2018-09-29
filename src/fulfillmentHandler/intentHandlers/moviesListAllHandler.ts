
export const intentName = 'movies.list.all'

export const handler = (moviesRepository, lineClient, lineMessageFormatter, { userStore }) => async (agent) => {
  console.log(intentName)
  const {
    requestSource,
    locale,
    action,
    session,
    parameters,
    userId,
    languageCode,
    queryText,
  } = agent

  const movies = moviesRepository.getAllMovies()

  const x = movies.map(m => Object.assign({}, {hasPurchased: userStore[userId] && userStore[userId][m.id]}, m))
  console.log(JSON.stringify(x))
  try {
    const message = lineMessageFormatter.listAllMovies(x, languageCode)
    lineClient.pushMessage(userId, message)
  } catch (err) {
    console.log(intentName, err)
  }
}