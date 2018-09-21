import { formatCurrency } from '../../utils/formatCurrency';

export const intentName = 'books.purchase - yes'

export const handler = (lineClient, lineMessageFormatter, { linepay, linepayConfirmUrl, transactionStore }) =>
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

    await lineClient.pushMessage(userId, lineMessageFormatter.messageTemplate('Please wait while we are processing your order'))

    const book = {
      id: 2,
      title: 'How to Be a Good Creature: A Memoir in Thirteen Animals',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Wm75LdUIL.jpg',
      link: 'https://www.amazon.com/gp/product/0544938321',
      description: 'Understanding someone who belongs to another species can be transformative. No one knows this better than author, naturalist, and adventurer Sy Montgomery. To research her books, Sy has traveled the world and encountered some of the planet’s rarest and most beautiful animals. From tarantulas to tigers, Sy’s life continually intersects with and is informed by the creatures she meets.',
      unitPrice: 10,
      unitPriceCurrency: 'THB',
    }

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
      type: 'book'
    }

    const message = lineMessageFormatter.makePaymentTemplate(
      'Please proceed to the payment',
      `${formatCurrency(book.unitPrice, true)} THB for "${book.title}" book. Please proceed to the payment.`,
     response.info.paymentUrl.web)
    return lineClient.pushMessage(userId, message)
  }