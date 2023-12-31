export interface AboutContentBlock {
  title?: string
  subtitle?: string[]
  image?: {
    src: string
    caption: string
  }
  text?: {
    title?: string
    subtitle?: string[]
  }
}
export interface AboutContentBlockPortfolio {
  title?: string
  subtitle?: string[]
  comparison: {
    images?: string[],
    caption: string,
  }
  text?: {
    title?: string
    subtitle?: string[]
  }
}
export interface PortfolioBlocks {
  [key: string]: {
    title: string
    blocks: AboutContentBlock[]
  }
}


