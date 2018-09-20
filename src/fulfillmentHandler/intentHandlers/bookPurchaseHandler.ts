
export const intentName = 'books.purchase - yes'

export const handler = (lineClient, lineMessageFormatter, { }) =>
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
    await lineClient.pushMessage(userId, lineMessageFormatter.messageTemplate('Here are you book'))

    const book = {
      id: 2,
      title: 'How to Be a Good Creature: A Memoir in Thirteen Animals',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51Wm75LdUIL.jpg',
      link: 'https://www.amazon.com/gp/product/0544938321',
      description: 'Understanding someone who belongs to another species can be transformative. No one knows this better than author, naturalist, and adventurer Sy Montgomery. To research her books, Sy has traveled the world and encountered some of the planet’s rarest and most beautiful animals. From tarantulas to tigers, Sy’s life continually intersects with and is informed by the creatures she meets.',
      unitPrice: 9.99,
      unitPriceCurrency: 'USD',
    }

    const message = lineMessageFormatter.singleBookView(book, true)
    return lineClient.pushMessage(userId, message)
  }