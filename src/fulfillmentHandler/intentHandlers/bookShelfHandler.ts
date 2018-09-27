
export const intentName = 'books.shelf'

export const handler = (bookRepository, lineClient, lineMessageFormatter, { }) =>
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

    // TODO: Load bought book from store
    const books = bookRepository.getPurchasedBook()

    try {
      const message = lineMessageFormatter.bookShelf(books, languageCode)
      lineClient.pushMessage(userId, message)
    } catch(err){
      console.log(err)
    }
  }