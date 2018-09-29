export const intentName = 'movies.view'

export const handler = (moviesRepository, lineClient, lineMessageFormatter, config) => async (agent) => {
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

  const movieTitle = parameters['movie-title']

  const movie = moviesRepository.getMovieByTitle(movieTitle)

  console.log('transaction.userId', userId)
  const message = lineMessageFormatter.singleMoveView(movie, true)
  return lineClient.pushMessage(userId, message)
}