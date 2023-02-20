import { Location } from 'vue-router/types/router'

export interface fastLinks {
  title: string
  links: fastLink[]
}

export interface fastLink {
  label: string
  route: Location
}