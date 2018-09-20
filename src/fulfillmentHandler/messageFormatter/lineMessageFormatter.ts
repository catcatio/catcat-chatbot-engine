import { FlexComponentBuilder, FlexMessageBuilder } from "./lineMessageBuilder";
import { FlexImage } from "@line/bot-sdk";

const limitChar = (str, limit) => {
  return `${str.substr(0, limit)}${str.length > limit ? '...' : ''}`
}

const listAllBooks = (imageResizeService) => (books) => {
  const lineTemplate = new FlexMessageBuilder()
  const template = lineTemplate.flexMessage(`book shelf`)
    .addCarousel()

  books.forEach(book => {
    template.addBubble()
      .addHero(FlexComponentBuilder.flexImage()
        .setUrl(`${imageResizeService}${encodeURIComponent(book.coverImage)}&size=1000&seed=${Date.now()}`)
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
              .setText(book.title)
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
              .setText(limitChar(book.description, 64))
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
              .setText(`💵  ${book.unitPrice > 0 ? `${book.unitPrice} ${book.unitPriceCurrency}` : 'FREE'}`)
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
                type: 'message',
                label: book.unitPrice > 0 ? 'PURCHASE' : 'START READING',
                text: book.unitPrice > 0 ? `purchase ${book.title}` : `read book ${book.title}`
              })
              .build(),
            // FlexComponentBuilder.flexButton()
            //   .setAction({
            //     'type': 'uri',
            //     'label': 'MORE',
            //     'uri': book.link
            //   })
            //   .build()
          )
          .build()
      )
      .build()
  })

  return template.build()
}

const singleBookView = (imageResizeService) => (book) => {
  const lineTemplate = new FlexMessageBuilder()
  const template = lineTemplate.flexMessage(`book shelf`)
    .addBubble()
    .addHero(FlexComponentBuilder.flexImage()
      .setUrl(`${imageResizeService}${encodeURIComponent(book.coverImage)}&size=1000&seed=${Date.now()}`)
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
            .setText(book.title)
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
            .setText(limitChar(book.description, 64))
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
            .setText(`💵  ${book.unitPrice > 0 ? `${book.unitPrice} ${book.unitPriceCurrency}` : 'FREE'}`)
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
              label: 'START READING',
              uri: 'line://app/1576196861-k8N8XwAj'
            })
            .build()
        )
        .build()
    )

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

const bookShelf = (imageResizeService) => (books) => {
  const lineTemplate = new FlexMessageBuilder()
  const template = lineTemplate.flexMessage(`book shelf`)
    .addCarousel()

  books.forEach(book => {
    template.addBubble()
      .addHero(FlexComponentBuilder.flexImage()
        .setUrl(`${imageResizeService}${encodeURIComponent(book.coverImage)}&size=1000&seed=${Date.now()}`)
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
              .setText(book.title)
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
              .setText(limitChar(book.description, 64))
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
              .setText(`💵  ${book.unitPrice > 0 ? `${book.unitPrice} ${book.unitPriceCurrency}` : 'FREE'}`)
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
                label: 'START READING',
                uri: 'line://app/1576196861-k8N8XwAj'
              })
              .build()
            // FlexComponentBuilder.flexButton()
            //   .setAction({
            //     'type': 'uri',
            //     'label': 'MORE',
            //     'uri': book.link
            //   })
            //   .build()
          )
          .build()
      )
      .build()
  })

  return template.build()
}

export default ({ imageResizeService }) => ({
  listAllBooks: listAllBooks(imageResizeService),
  singleBookView: singleBookView(imageResizeService),
  bookShelf: bookShelf(imageResizeService),
  messageTemplate
})
