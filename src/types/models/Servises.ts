import { Location } from 'vue-router/types/router'

export interface Service {
  category: {
    label: string
    value: string
  }
  title: string
  description: string
  list: ServiceItem[]
}

export interface ServiceItem {
  image: string
  title: string
  description: string
  route: Location
  content: {
    title: string
    subtitle: string
    image: {
      src: string
      caption: string
    }
    description: ServiceItemContentDescription
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
