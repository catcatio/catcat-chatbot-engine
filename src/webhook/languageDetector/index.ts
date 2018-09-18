// import * as Translate from '@google-cloud/translate';

// const translate = new Translate()
// const detectLanguage = (text): any => new Promise((resolve, reject) => {
//   translate.detect(text, (err, results) => {
//     if (err) { reject(err); return }
//     resolve (results)
//   })
// })

export = async (text) => {
  // const defaultLanguage = 'en'
  // const startTime = Date.now()
  // let result = 'NA'
  // try {
  //   const ret = await detectLanguage(text)
  //   console.log(JSON.stringify(ret))
  //   if (!ret || !ret.language) {
  //     console.error('Bad detection result')
  //     return (result = defaultLanguage)
  //   }

  //   return result = ret.language
  // } catch (err) {
  //   console.error(err.message)
  //   return defaultLanguage  // return default language for now
  // } finally {
  //   console.log(`total language detection time (${result}): `, Date.now() - startTime)
  // }

  return 'en'
}
