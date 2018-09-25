import { getBookByTitle } from "../booksRepository";

export const intentName = 'books.view'

export const handler = (bookRepository, lineClient, lineMessageFormatter, config) => async (agent) => {
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

  const book = bookRepository.getBookByTitle(bookTitle)

  console.log('transaction.userId', userId)
  const message = lineMessageFormatter.singleBookView(book, true)
  return lineClient.pushMessage(userId, message)
}