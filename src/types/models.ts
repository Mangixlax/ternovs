export interface Employee {
  id: number
  name: string
  image: string
  position: string
  expierence: string
  description: string
}

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