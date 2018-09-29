
export const intentName = 'movies.mymovies'

export const handler = (moviesRepository, lineClient, lineMessageFormatter, { }) =>
  async (agent) => {
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

    // TODO: Load bought movie from store
    const movies = moviesRepository.getPurchasedMovies()

    try {
      const message = lineMessageFormatter.movieShelf(movies, languageCode)
      lineClient.pushMessage(userId, message)
    } catch(err){
      console.log(err)
      console.log(err.message)
    }
  }