import { formatCurrency } from '../../utils/formatCurrency';

export const intentName = 'movies.purchase - yes'

export const handler = (moviesRepository, lineClient, lineMessageFormatter, { linepay, linepayConfirmUrl, transactionStore, userStore }) =>
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
    await lineClient.pushMessage(userId, lineMessageFormatter.messageTemplate(
      languageCode === 'th'
      ? 'รอเดี่ยวนะ กำลังดำเนินการซื้อหนังให้'
      : 'Please wait while we are processing your order'))

    const movie = moviesRepository.getMoviesByTitle(movieTitle)

    if (movie.unitPrice <= 0) {
      userStore[userId] = Object.assign({}, {[movie.id]: true} , userStore[userId])
      const m = lineMessageFormatter.singleMovieView(movie, languageCode)
      return lineClient.pushMessage(userId, m)
    }

    const reservation: any = {
      productName: movie.title,
      amount: movie.unitPrice,
      currency: movie.unitPriceCurrency,
      confirmUrl: linepayConfirmUrl,
      confirmUrlType: 'SERVER',
      orderId: `${Date.now()}-${userId}`
    }

    console.log(JSON.stringify(reservation))

    const response = await linepay.reserve(reservation)
    reservation.transactionId = response.info.transactionId
    reservation.userId = userId

    console.log(response)

    transactionStore[reservation.transactionId] = {
      reservation,
      status: 'new',
      createdDate: Date.now(),
      languageCode: languageCode,
      userId: userId,
      movieId: movie.id,
      movieTitle: movie.title,
      requestSource: (requestSource || '').toLowerCase(),
      movie,
      type: 'movie'
    }

    const message = lineMessageFormatter.makePaymentTemplate(
      languageCode === 'th' ? 'การชำระเงิน' : 'Please proceed to the payment',
      languageCode === 'th' ? `${formatCurrency(movie.unitPrice, true)} ${movie.unitPriceCurrency} สำหรับหนัง "${movie.title}" โปรดดำเนินการชำระเงิน` : `${formatCurrency(movie.unitPrice, true)} THB for "${movie.title}" movie. Please proceed to the payment.`,
     response.info.paymentUrl.web, languageCode)
    return lineClient.pushMessage(userId, message)
  }