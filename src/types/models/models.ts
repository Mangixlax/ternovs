export interface AboutContentBlock {
  title?: string
  subtitle?: string[]
  image?: {
    src: string
    embed: string
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
