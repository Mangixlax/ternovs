import { File } from '~/types/models/File'

export interface Statistic {
  date: string
  view: string
  comment: string
  favorite: string
}

export interface IBlock {
  id: string
  type: string
  data: {
    [key: string]: string
  }
}

export interface ISlugs {
  en: string
  ru: string
  [key: string]: string
}

export interface IArticle {
  id?: number
  slugs?: ISlugs
  title?: string
  header?: string
  content?: Array<IBlock[]>
  published_at?: string
  published_at_full?: string | null
  poster: File
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  og_title?: string
  og_description?: string
  author?: {
    slugs?: ISlugs
    name?: string
    avatar?: File
  }
  og_image?: File
}

export interface IJournalFilter {
  category_id?: number | string | null
  page?: number
}