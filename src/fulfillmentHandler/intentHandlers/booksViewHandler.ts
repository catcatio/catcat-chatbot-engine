
export const intentName = 'books.view'

export const handler = (config) => async (agent) => {
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

  agent.add(intentName)
}