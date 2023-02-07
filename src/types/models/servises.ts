import { Location } from 'vue-router/types/router'

export interface Service {
  title: string,
  description: string,
  list: ServiceItem[]
}

export interface ServiceItem {
  image: string
  title:  string
  description: string
  route: Location
}