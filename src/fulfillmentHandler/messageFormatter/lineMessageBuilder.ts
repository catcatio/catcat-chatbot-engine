import { FlexMessage, FlexImage, FlexBubble, FlexCarousel, FlexComponent, FlexBox, Action } from '@line/bot-sdk'

export class FlexMessageBuilder {
  private _templateType: 'bubble' | 'carousel'
  private _currentBubble: FlexBubble
  private _flexMessage: FlexMessage
  private _currentBlock: FlexBox
  private _currentBlockName: 'header' | 'hero' | 'body' | 'footer'
  private _currentFlexComponents: FlexComponent[]

  public flexMessage(altText: string): FlexMessageBuilder {
    this._flexMessage = {
      type: 'flex',
      altText,
      contents: null
    }

    return this
  }

  public addCarousel(): FlexMessageBuilder {
    this._templateType = 'carousel'

    this._flexMessage.contents = {
      type: 'carousel',
      contents: []
    }
    return this
  }

  public addBubble(): FlexMessageBuilder {
    this._currentBubble = {
      type: 'bubble'
    }
    if (this._templateType === 'carousel') {
      (this._flexMessage.contents as FlexCarousel).contents.push(this._currentBubble)
    } else {
      this._templateType = 'bubble'
      this._flexMessage.contents = this._currentBubble
    }
    return this
  }

  public setDirection(directiion?: 'ltr' | 'rtl'): FlexMessageBuilder {
    this._currentBubble.direction = directiion
    return this
  }

  public addHeader(): FlexMessageBuilder {
    this._currentFlexComponents = []
    this._currentBlock = {
      type: 'box',
      layout: 'vertical',
      contents: this._currentFlexComponents
    }

    this._currentBubble.header = this._currentBlock
    this._currentBlockName = 'header'
    return this
  }

  public addHero(flexImage: FlexImage): FlexMessageBuilder {
    this._currentBubble.hero = flexImage
    this._currentBlockName = 'hero'
    return this
  }

  public addBody(): FlexMessageBuilder {
    this._currentFlexComponents = []
    this._currentBlock = {
      type: 'box',
      layout: 'vertical',
      contents: this._currentFlexComponents
    }

    this._currentBubble.body = this._currentBlock
    this._currentBlockName = 'body'
    return this
  }

  public addFooter(): FlexMessageBuilder {
    this._currentFlexComponents = []
    this._currentBlock = {
      type: 'box',
      layout: 'vertical',
      contents: this._currentFlexComponents
    }

    this._currentBubble.footer = this._currentBlock
    this._currentBlockName = 'footer'
    return this
  }

  public addComponents(...components: FlexComponent[]): FlexMessageBuilder {
    this._currentFlexComponents.push(...components)
    return this
  }

  private setAttribute(name: string, value?: any): FlexMessageBuilder {
    if (value === null) {
      delete this._currentBlock[name]
    } else {
      this._currentBlock[name] = value
    }

    return this
  }

  public setLayout(layout: 'horizontal' | 'vertical' | 'baseline'): FlexMessageBuilder {
    return this.setAttribute('layout', layout)
  }

  public setSpacing(spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'): FlexMessageBuilder {
    return this.setAttribute('spacing', spacing)
  }

  public setMargin(margin: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'): FlexMessageBuilder {
    return this.setAttribute('margin', margin)
  }

  public setActon(action: Action<{ label: string }>): FlexMessageBuilder {
    return this.setAttribute('action', action)
  }

  public setFlex(flex: number): FlexMessageBuilder {
    return this.setAttribute('flex', flex)
  }

  private setBlockStyle(blockName: string, styleName: 'backgroundColor' | 'separator' | 'separatorColor', value?: string | boolean): FlexMessageBuilder{
    this._currentBubble.styles = this._currentBubble.styles || {}

    if (!this._currentBubble.styles[blockName]) {
      this._currentBubble.styles[blockName] = {[styleName]: value}
    } else {
      this._currentBubble.styles[blockName][styleName] = value
    }

    return this
  }

  public setStyleBackgroundColor(color?: string): FlexMessageBuilder {
    return this.setBlockStyle(this._currentBlockName, 'backgroundColor', color)
  }

  public setStyleSeparator(hasSeparator?: boolean): FlexMessageBuilder {
    return this.setBlockStyle(this._currentBlockName, 'separator', hasSeparator)
  }

  public setStyleSeparatorColor(color?: string): FlexMessageBuilder {
    return this.setBlockStyle(this._currentBlockName, 'separatorColor', color)
  }

  public build(): FlexMessage {
    return this._flexMessage
  }
}

export class FlexComponentBuilder {
  private _flexComponent: FlexComponent

  private constructor(type: 'box' | 'button' | 'filler' | 'icon' | 'image' | 'separator' | 'spacer' | 'text') {
    this._flexComponent = {
      type
    } as FlexComponent

    return this
  }

  private setAttribute(name: string, value?: any): FlexComponentBuilder {
    if (value === null) {
      delete this._flexComponent[name]
    } else {
      this._flexComponent[name] = value
    }

    return this
  }

  public setLayout(layout?: 'horizontal' | 'vertical' | 'baseline'): FlexComponentBuilder {
    return this.setAttribute('layout', layout)
  }

  public setFlex(flex?: number): FlexComponentBuilder {
    return this.setAttribute('flex', flex)
  }

  public setSpacing(spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'): FlexComponentBuilder {
    return this.setAttribute('spacing', spacing)
  }

  public setMargin(margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'): FlexComponentBuilder {
    return this.setAttribute('margin', margin)
  }

  public setAction(action?: Action): FlexComponentBuilder {
    return this.setAttribute('action', action)
  }

  public setHeight(height?: 'sm' | 'md'): FlexComponentBuilder {
    return this.setAttribute('height', height)
  }

  public setStyle(style?: 'link' | 'primary' | 'secondary'): FlexComponentBuilder {
    return this.setAttribute('style', style)
  }

  public setColor(color?: string): FlexComponentBuilder {
    return this.setAttribute('color', color)
  }

  public setGravity(gravity?: 'top' | 'bottom' | 'center'): FlexComponentBuilder {
    return this.setAttribute('gravity', gravity)
  }

  public setSize(size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl' | 'full'): FlexComponentBuilder {
    return this.setAttribute('size', size)
  }

  public setUrl(url: string): FlexComponentBuilder {
    return this.setAttribute('url', url)
  }

  public setAspectRatio(aspectRatio: '1:1' | '1.51:1' | '1.91:1' | '4:3' | '16:9' | '20:13' | '2:1' | '3:1' | '3:4' | '9:16' | '1:2' | '1:3'): FlexComponentBuilder {
    return this.setAttribute('aspectRatio', aspectRatio)
  }

  public setAlign(align?: 'start' | 'end' | 'center'): FlexComponentBuilder {
    return this.setAttribute('align', align)
  }

  public setAspectMode(aspectMode?: 'cover' | 'fit'): FlexComponentBuilder {
    return this.setAttribute('aspectMode', aspectMode)
  }

  public setBackgroundColor(backgroundColor?: string): FlexComponentBuilder {
    return this.setAttribute('backgroundColor', backgroundColor)
  }

  public setWrap(wrap?: boolean): FlexComponentBuilder {
    return this.setAttribute('wrap', wrap)
  }

  public setMaxLines(maxLines?: number): FlexComponentBuilder {
    return this.setAttribute('maxLines', maxLines)
  }

  public setWeight(weight?: 'regular' | 'bold'): FlexComponentBuilder {
    return this.setAttribute('weight', weight)
  }

  public setGarvity(gravity?: 'top' | 'bottom' | 'center'): FlexComponentBuilder {
    return this.setAttribute('gravity', gravity)
  }

  public setText(text?: string): FlexComponentBuilder {
    return this.setAttribute('text', text)
  }

  public addContents(...flexComponents: FlexComponent[]): FlexComponentBuilder {
    if (!this._flexComponent['contents']) {
      this._flexComponent['contents'] = []
    }

    this._flexComponent['contents'].push(...flexComponents)

    return this
  }

  public build(): FlexComponent {
    return this._flexComponent
  }

  public static flexBox() {
    return new FlexComponentBuilder('box')
  }

  public static flexButton() {
    return new FlexComponentBuilder('button')
  }

  public static flexFiller() {
    return new FlexComponentBuilder('filler')
  }

  public static flexIcon() {
    return new FlexComponentBuilder('icon')
  }

  public static flexImage() {
    return new FlexComponentBuilder('image')
  }

  public static flexSeparator() {
    return new FlexComponentBuilder('separator')
  }

  public static flexSpacer() {
    return new FlexComponentBuilder('spacer')
  }
  public static flexText() {
    return new FlexComponentBuilder('text')
  }
}
