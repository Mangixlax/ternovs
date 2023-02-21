import QueryString from 'qs'
import BaseRepository from '~/api/repositories/BaseRepository'

export default class MediaRepository extends BaseRepository {
  getPostsList(params: any = { query: {}, config: {} }) {
    // @TODO TBD
    return this.axios.$get(
      '/api/v1/media/posts/grid?' +
        QueryString.stringify(params.query, { skipNulls: true }),
      params.config
    )
  }

  getPost(id: number | string) {
    return this.axios.$get(`/api/v1/media/posts/${id}`)
  }

  incrementPostViews(id: number | string) {
    return this.axios.$get(`/api/v1/media/posts/${id}/view`)
  }

  getCategoriesList(params: any = {}) {
    // @TODO TBD
    return this.axios.$get(
      '/api/v1/media/categories/grid?' +
        QueryString.stringify(params, { skipNulls: true })
    )
  }

  getCategory(id: number | string) {
    return this.axios.$get(`/api/v1/media/categories/${id}`)
  }
}
