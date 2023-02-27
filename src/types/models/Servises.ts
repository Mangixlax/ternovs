import { Location } from 'vue-router/types/router'

export interface Service {
  slug: string
  name: string
  short_name: string
  excerpt: string
  directions: [
    {
      name: string
      slug: string
      short_excerpt: string
      image: {
        title: string
        description: string
        filename: string
        extra: {
          width: number
          height: number
        }
      }
    }
  ]
}

export interface ServiceItem {
  name: string
  slug: string
  short_excerpt: string
  image: {
    title: string
    description: string
    filename: string
    extra: {
      width: number
      height:number
    }
  }
}

export interface ServiceItemContentDescription {
  title: string
  subtitle: string
  text: string
  list: string[]
  text_2: string
  text_3: string
}
