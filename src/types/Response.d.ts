export interface IResponseDataPagination {
  total: number
  per_page: number
  last_page: number
  current_page: number
}

export interface IResponseData<T> {
  status: string
  data: {
    data: T
  } & IResponseDataPagination
  meta?: any
}

export interface IResponseMetaPagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  previous_page: number | null
  next_page: number | null
}

export interface IResponseMeta {
  meta: {
    pagination: IResponseMetaPagination
  }
}
