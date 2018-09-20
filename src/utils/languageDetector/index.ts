import { Translate } from '@google-cloud/translate'

const detectLanguage = (translate: Translate, text): any => new Promise((resolve, reject) => {
  translate.detect(text, (err, results) => {
    if (err) { reject(err); return }
    resolve(results)
  })
})

export default async (text) => {
  const startTime = Date.now()

  const translate = new Translate()
  const defaultLanguage = 'en'
  let result = 'NA'
  try {
    const ret = await detectLanguage(translate, text)
    console.log(JSON.stringify(ret))
    if (!ret || !ret.language) {
      console.error('Bad detection result')
      return (result = defaultLanguage)
    }

    return result = ret.language
  } catch (err) {
    console.error(err.message)
    return defaultLanguage  // return default language for now
  } finally {
    console.log(`total language detection time (${result}): `, Date.now() - startTime)
  }
}
