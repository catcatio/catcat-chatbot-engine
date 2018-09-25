
export const intentName = 'books.list.all'

export const handler = (bookRepository, lineClient, lineMessageFormatter, { }) => async (agent) => {
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

  const books = bookRepository.getAllBooks()

  try {
    const message = lineMessageFormatter.listAllBooks(books, languageCode)
    lineClient.pushMessage(userId, message)
  } catch (err) {
    console.log('books.list.all', err)
  }
}