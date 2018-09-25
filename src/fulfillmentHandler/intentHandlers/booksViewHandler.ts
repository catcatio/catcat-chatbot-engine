
export const intentName = 'books.view'

export const handler = (lineClient, lineMessageFormatter, config) => async (agent) => {
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

  const book = {
    id: 2,
    title: bookTitle,
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Wm75LdUIL.jpg',
    link: 'https://www.amazon.com/gp/product/0544938321',
    description: 'Understanding someone who belongs to another species can be transformative. No one knows this better than author, naturalist, and adventurer Sy Montgomery. To research her books, Sy has traveled the world and encountered some of the planet’s rarest and most beautiful animals. From tarantulas to tigers, Sy’s life continually intersects with and is informed by the creatures she meets.',
    unitPrice: 100,
    unitPriceCurrency: 'THB',
    readerLink: 'line://app/1599822021-93KMZwzQ'
  }

  console.log('transaction.userId', userId)
  const message = lineMessageFormatter.singleBookView(book, true)
  return lineClient.pushMessage(userId, message)
}