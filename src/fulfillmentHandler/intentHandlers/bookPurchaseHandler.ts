import { formatCurrency } from '../../utils/formatCurrency';

export const intentName = 'books.purchase - yes'

export const handler = (bookRepository, lineClient, lineMessageFormatter, { linepay, linepayConfirmUrl, transactionStore }) =>
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

    const bookTitle = parameters['book-title']
    await lineClient.pushMessage(userId, lineMessageFormatter.messageTemplate(
      languageCode === 'th'
      ? 'รอเดี่ยวนะ กำลังดำเนินการสั่งหนังสือให้'
      : 'Please wait while we are processing your order'))

    const book = bookRepository.getBookByTitle(bookTitle)

    const reservation: any = {
      productName: book.title,
      amount: book.unitPrice,
      currency: book.unitPriceCurrency,
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
      bookId: book.id,
      bookTitle: book.title,
      requestSource: requestSource,
      book,
      type: 'book'
    }

    const message = lineMessageFormatter.makePaymentTemplate(
      languageCode === 'th' ? 'การชำระเงิน' : 'Please proceed to the payment',
      languageCode === 'th' ? `${formatCurrency(book.unitPrice, true)} ${book.unitPriceCurrency} สำหรับหนังสือ "${book.title}" โปรดดำเนินการชำระเงิน` : `${formatCurrency(book.unitPrice, true)} THB for "${book.title}" book. Please proceed to the payment.`,
     response.info.paymentUrl.web, languageCode)
    return lineClient.pushMessage(userId, message)
  }