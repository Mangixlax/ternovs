import QueryString from 'qs'
import BaseRepository from '~/api/repositories/BaseRepository'

export default class ServicesRepository extends BaseRepository {
  getCategoriesList() {
    return this.axios.$get(
      `/api/v1/catalog/categories/grid?` +
        QueryString.stringify(
          { sort_column: 'sort_order', sort_order: 'asc' },
          { skipNulls: true }
        )
    )
  }

  getDirectionsList() {
    return this.axios.$get(`/api/v1/catalog/directions/grid?` +
    QueryString.stringify(
      { sort_column: 'sort_order', sort_order: 'asc', per_page: 1000 },
    ))
  }

  getCategory(slug: string) {
    return this.axios.$get(`/api/v1/catalog/categories/${slug}`)
  }

  getDirection(slug: string) {
    return this.axios.$get(`/api/v1/catalog/directions/${slug}`)
  }
}
