export interface PricesContentBlock {
  name: string
  slug: string
  short_excerpt: string
  category: {
    slug: string
    name: string
    short_name: string
    excerpt: string
  }
  image: {
    title: string
    description: string
    filename: string
    extra: object[]
  }
  services: PriceListItem[]
}

export interface PriceListItem {
  name: string
  price_max: number
  price_min: number
}
