export interface PricesContentBlock {
  title: string
  description: string
  list: PriceListItem[]
}

export interface PriceListItem {
  title: string
  price: string
}