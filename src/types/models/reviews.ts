export interface Review {
  avatar: string
  name: string
  date: string
  platform: {
    logo: string
    label: string
    stars: string
    link: string
  }
  title: string
  text: string
}

export interface Platform {
  image: string
  name: string
  rating: string
  description: string
  link: string
}
