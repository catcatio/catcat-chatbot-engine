export const intentName = 'movies.purchase'

import { formatCurrency } from '../../utils/formatCurrency';

export const handler = (moviesRepository, lineClient, lineMessageFormatter, { userStore }) =>
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

    const movieTitle = parameters['movie-title']
    const movie = moviesRepository.getMoviesByTitle(movieTitle)
    const hasPurchased = userStore[userId] && userStore[userId][movie.id]
    let message = null
    if (hasPurchased) {
      message = lineMessageFormatter.singleMovieView(movie)
    } else {
      message = languageCode === 'th'
        ? lineMessageFormatter.quickReply(`ดู "${movie.title}" ${movie.unitPrice <= 0 ? 'ฟรี' : `ราคา ${movie.unitPrice} ${movie.unitPriceCurrency}`} นะ?`, 'เอาเอา', 'ยังก่อน')
        : lineMessageFormatter.quickReply(`Watch ${movie.title} ? It is ${formatCurrency(movie.price, true)} ${movie.unitPrice}`, 'Yes', 'No')
    }
    return lineClient.pushMessage(userId, message)
  }
