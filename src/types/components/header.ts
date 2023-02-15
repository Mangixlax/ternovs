import { Location } from 'vue-router/types/router'

export interface MenuItem {
  label: string
  route: Location
  list?: MenuItemLink[]
}

export interface MenuItemLink {
  label: string,
  route: Location
}