import QueryString from 'qs'
import BaseRepository from '~/api/repositories/BaseRepository'

export default class JournalRepository extends BaseRepository {
  getPostsList(params: any = { query: {}, config: {} }) {
    // @TODO TBD
    return this.axios.$get(
      '/api/v1/journal/posts/grid?' +
        QueryString.stringify(params.query, { skipNulls: true }),
      params.config
    )
  }

  getPost(slug: string) {
    return new Promise((resolve) => {
      this.axios
        .$get(`/api/v1/journal/posts/${slug}`)
        .then(resolve)
        .catch(() => resolve(null))
    })
  }

  incrementPostViews(id: number | string) {
    return this.axios.$get(`/api/v1/journal/posts/${id}/view`)
  }

  getCategoriesList(params: any = {}) {
    // @TODO TBD
    return this.axios.$get(
      '/api/v1/journal/categories/grid?' +
        QueryString.stringify(params, { skipNulls: true })
    )
  }

  getCategory(id: number | string) {
    return this.axios.$get(`/api/v1/journal/categories/${id}`)
  }
}
