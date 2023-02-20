import { Location } from 'vue-router/types/router'

export interface HomeServiceItem {
  icon: string
  title: string
  text: string
  route: Location
}

export interface HomeReviewItem {
  text: string
  name: string
}

export interface HomeBenefitsItem {
  icon: string
  title: string
}