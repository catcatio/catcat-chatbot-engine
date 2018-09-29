import { FlexComponentBuilder, FlexMessageBuilder } from "./lineMessageBuilder";
import { FlexImage } from "@line/bot-sdk";

const limitChar = (str, limit) => {
  return `${str.substr(0, limit)}${str.length > limit ? '...' : ''}`
}

const listAllMovies = (imageResizeService) => (movies, languageCode) => {
  const lineTemplate = new FlexMessageBuilder()
  const template = lineTemplate.flexMessage(`movie shelf`)
    .addCarousel()

  movies.forEach(movie => {
    template.addBubble()
      .addHero(FlexComponentBuilder.flexImage()
        .setUrl(`${imageResizeService}${encodeURIComponent(movie.coverImage)}&size=1000&seed=${Date.now()}`)
        .setSize('full')
        .setAspectRatio('16:9')
        .setAspectMode('cover')
      .build() as FlexImage)
      .addBody()
      .setLayout('vertical')
      // title
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setLayout('horizontal')
          .addContents(
            FlexComponentBuilder.flexText()
              .setText(movie.title)
              // .setWrap(true)
              .setWeight('bold')
              .build()
          )
          .build()
      )
      // teaser
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setMargin('md')
          .setLayout('horizontal')
          .addContents(
            FlexComponentBuilder.flexText()
              .setText(limitChar(movie.description, 64))
              .setSize('sm')
              .setWrap(true)
              .setMaxLines(3)
              .build()
          )
          .build()
      )
      // score
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setMargin('md')
          .setLayout('horizontal')
          .addContents(
            FlexComponentBuilder.flexText()
              .setText(movie.score)
              .setSize('sm')
              .build()
          )
          .build()
      )
      // price
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setMargin('md')
          .setLayout('horizontal')
          .addContents(
            FlexComponentBuilder.flexText()
              .setText(`💵  ${movie.unitPrice > 0 ? `${movie.unitPrice} ${movie.unitPriceCurrency}` : 'FREE'}`)
              .setWrap(true)
              .setColor('#222222')
              .setWeight('bold')
              .setSize('xs')
              .build()
          )
          .build()
      )
      .addFooter()
      .setLayout("vertical")
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setLayout('vertical')
          .addContents(
            FlexComponentBuilder.flexButton()
              .setStyle('primary')
              .setColor('#718792')
              .setAction(movie.hasPurchased
                ? {
                  type: 'uri',
                  label: languageCode === 'th' ? 'ดูเลย' : 'Watch Now',
                  uri: movie.viewerLink
                }
                : {
                  type: 'message',
                  label: languageCode === 'th' ? 'ดูหนัง' : 'Watch',
                  text: languageCode === 'th' ? `ดูหนัง ${movie.title}` : `watch ${movie.title}`
                })
              .build(),
            FlexComponentBuilder.flexButton()
              .setAction({
                'type': 'uri',
                'label': languageCode === 'th' ? 'ตัวอย่าง' : 'Trailer',
                'uri': movie.trailerLink
              })
              .build(),
            FlexComponentBuilder.flexButton()
              .setAction({
                'type': 'uri',
                'label': languageCode === 'th' ? 'เพิ่มเติม' : 'MORE',
                'uri': movie.link
              })
              .build()
          )
          .build()
      )
      .build()
  })

  template.addBubble()
    .addHero(FlexComponentBuilder.flexImage()
      .setUrl(`${imageResizeService}${encodeURIComponent(`https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Grey_matter_and_white_matter_-_very_high_mag.jpg/1200px-Grey_matter_and_white_matter_-_very_high_mag.jpg`)}&size=1000&seed=${Date.now()}`)
      // .setUrl('https://media.giphy.com/media/AQktflfHoptNm/source.gif')
      .setSize('full')
      .setAspectRatio('16:9')
      .setAspectMode('cover')
      .build() as FlexImage)
    .addBody()
    .setLayout('vertical')
    // title
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText('  ')
            // .setWrap(true)
            .setWeight('bold')
            .build()
        )
        .build()
    )
    // teaser
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setMargin('md')
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText('  ')
            .setSize('sm')
            .setWrap(true)
            .setMaxLines(3)
            .build()
        )
        .build()
    )
    // price
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setMargin('md')
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText('  ')
            .setWrap(true)
            .setColor('#222222')
            .setWeight('bold')
            .setSize('xs')
            .build()
        )
        .build()
    )
    .addFooter()
    .setLayout("vertical")
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setLayout('vertical')
        .addContents(
          FlexComponentBuilder.flexButton()
            .setStyle('primary')
            .setColor('#718792')
            .setAction({
              type: 'uri',
              label: languageCode === 'th' ? 'ดูทั้งหมด' : 'MORE',
              uri: 'line://app/1599822021-BQbYxmDo'
            })
            .build(),
        )
        .build()
    )
    .build()

  return template.build()
}

const singleMovieView = (imageResizeService) => (movie) => {
  const lineTemplate = new FlexMessageBuilder()
  const template = lineTemplate.flexMessage(`single movie`)
    .addBubble()
    .addHero(FlexComponentBuilder.flexImage()
      .setUrl(`${imageResizeService}${encodeURIComponent(movie.coverImage)}&size=1000&seed=${Date.now()}`)
      .setSize('full')
      .setAspectRatio('16:9')
      .setAspectMode('cover')
      .build() as FlexImage)
    .addBody()
    .setLayout('vertical')
    // title
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText(movie.title)
            // .setWrap(true)
            .setWeight('bold')
            .build()
        )
        .build()
    )
    // teaser
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setMargin('md')
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText(limitChar(movie.description, 64))
            .setSize('sm')
            .setWrap(true)
            .setMaxLines(3)
            .build()
        )
        .build()
    )
    // // price
    // .addComponents(
    //   FlexComponentBuilder.flexBox()
    //     .setMargin('md')
    //     .setLayout('horizontal')
    //     .addContents(
    //       FlexComponentBuilder.flexText()
    //         .setText(`💵  ${movie.unitPrice > 0 ? `${movie.unitPrice} ${movie.unitPriceCurrency}` : 'FREE'}`)
    //         .setWrap(true)
    //         .setColor('#222222')
    //         .setWeight('bold')
    //         .setSize('xs')
    //         .build()
    //     )
    //     .build()
    // )
    .addFooter()
    .setLayout("vertical")
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setLayout('vertical')
        .addContents(
          FlexComponentBuilder.flexButton()
            .setStyle('primary')
            .setColor('#718792')
            .setAction({
              type: 'uri',
              label: 'Watch Now',
              uri: movie.viewerLink
            })
            .build()
        )
        .build()
    )

  console.log(JSON.stringify(template.build().contents))

  return template.build()
}

const messageTemplate = (message) => {
  var messages = []
  if (typeof message === 'string') {
    messages = [{
      text: message,
      type: 'text'
    }]
  } else if (Array.isArray(message)) {
    message.forEach(msg => {
      if (typeof msg === 'string') {
        let singleMessage = {
          text: msg,
          type: 'text'
        }
        messages.push(singleMessage)
      } else {
        messages.push(msg)
      }
    })
  } else {
    if (!message) throw new Error('You LINE message is empty')
    if (!message.type) throw new Error('Your LINE message is required to have a type')

    // object type message
    messages = [message]
  }

  return messages
}

const movieShelf = (imageResizeService) => (movies, languageCode) => {
  const lineTemplate = new FlexMessageBuilder()
  const template = lineTemplate.flexMessage(`movie shelf`)
    .addCarousel()

  movies.forEach(movie => {
    template.addBubble()
      .addHero(FlexComponentBuilder.flexImage()
        .setUrl(`${imageResizeService}${encodeURIComponent(movie.coverImage)}&size=1000&seed=${Date.now()}`)
        .setSize('full')
        .setAspectRatio('16:9')
        .setAspectMode('cover')
        .build() as FlexImage)
      .addBody()
      .setLayout('vertical')
      // title
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setLayout('horizontal')
          .addContents(
            FlexComponentBuilder.flexText()
              .setText(movie.title)
              // .setWrap(true)
              .setWeight('bold')
              .build()
          )
          .build()
      )
      // teaser
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setMargin('md')
          .setLayout('horizontal')
          .addContents(
            FlexComponentBuilder.flexText()
              .setText(limitChar(movie.description, 64))
              .setSize('sm')
              .setWrap(true)
              .setMaxLines(3)
              .build()
          )
          .build()
      )
      // score
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setMargin('md')
          .setLayout('horizontal')
          .addContents(
            FlexComponentBuilder.flexText()
              .setText(movie.score)
              .setSize('sm')
              .build()
          )
          .build()
      )
      .addFooter()
      .setLayout("vertical")
      .addComponents(
        FlexComponentBuilder.flexBox()
          .setLayout('vertical')
          .addContents(
            FlexComponentBuilder.flexButton()
              .setStyle('primary')
              .setColor('#718792')
              .setAction({
                type: 'uri',
                label: languageCode === 'th' ? 'ดูหนัง' : 'Watch',
                uri: movie.viewerLink
              })
              .build()
          )
          .build()
      )
      .build()
  })

  template.addBubble()
    .addHero(FlexComponentBuilder.flexImage()
      .setUrl(`${imageResizeService}${encodeURIComponent(`https://clip2art.com/images/library-clipart-personal-7.png`)}&size=1000&seed=${Date.now()}`)
      .setSize('full')
      .setAspectRatio('16:9')
      .setAspectMode('cover')
      .build() as FlexImage)
    .addBody()
    .setLayout('vertical')
    // title
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText('  ')
            // .setWrap(true)
            .setWeight('bold')
            .build()
        )
        .build()
    )
    // teaser
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setMargin('md')
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText('  ')
            .setSize('sm')
            .setWrap(true)
            .setMaxLines(3)
            .build()
        )
        .build()
    )
    // price
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setMargin('md')
        .setLayout('horizontal')
        .addContents(
          FlexComponentBuilder.flexText()
            .setText('  ')
            .setWrap(true)
            .setColor('#222222')
            .setWeight('bold')
            .setSize('xs')
            .build()
        )
        .build()
    )
    .addFooter()
    .setLayout("vertical")
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setLayout('vertical')
        .addContents(
          FlexComponentBuilder.flexButton()
            .setStyle('primary')
            .setColor('#718792')
            .setAction({
              type: 'uri',
              label: languageCode === 'th' ? 'ดูทั้งหมด' : 'MORE',
              uri: 'line://app/1599822021-BQbYxmDo'
            })
            .build(),
        )
        .build()
    )
    .build()

  console.log(JSON.stringify(template.build().contents))

  return template.build()
}

const makePaymentTemplate = (title, message, paymentLink, languageCode) => {
  const lineTemplate = new FlexMessageBuilder()
  const template = lineTemplate.flexMessage('Payment')
    .addBubble()
    .addHeader()
    .addComponents(
      FlexComponentBuilder.flexBox()
        .setLayout('horizontal')
        .addContents(FlexComponentBuilder.flexText()
          .setText(title)
          .setWeight('bold')
          .setSize('sm')
          .build())
        .build()
    )
    .addBody()
    .setStyleBackgroundColor('#EFEFEF')
    .setStyleSeparator(true)
    .setStyleSeparatorColor('#DDDDDD')
    .setLayout('vertical')
    .setSpacing('md')
    .addComponents(
      FlexComponentBuilder.flexText()
        .setText(message)
        .setWrap(true)
        .setSize('sm')
        .build()
    )
    .addFooter()
    .setStyleSeparator(true)
    .setStyleSeparatorColor('#DDDDDD')
    .setLayout('horizontal')
    .setSpacing('md')
    .addComponents(
      FlexComponentBuilder.flexButton()
        .setStyle('secondary')
        .setColor('#b0bec5')
        .setAction({
          'type': 'uri',
          'label': languageCode === 'th' ? 'จ่ายด้วย LINE Pay' : 'Pay by LINE Pay',
          'uri': paymentLink
        })
        .build(),
    )

  return template.build()
}

const quickReply = (message, ...options) => {
  const msg = {
    'type': 'text',
    'text': message,
    'quickReply': {
      'items': options.map(op => (typeof op !== 'string' ? op : {
        'type': 'action',
        'action': {
          'type': 'message',
          'label': op,
          'text': op
        }
      }))
    }
  }

  console.log(msg)
  return msg
}

export default ({ imageResizeService }) => ({
  listAllMovies: listAllMovies(imageResizeService),
  singleMovieView: singleMovieView(imageResizeService),
  movieShelf: movieShelf(imageResizeService),
  messageTemplate,
  makePaymentTemplate,
  quickReply
})
