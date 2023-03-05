/**
 * TODO: Move to other folder
 * TODO: Need hard refactoring to Typescript
 */

import axios from 'axios'

const exclude_routes = []

const cache_time = 1000 * 60 * 60 // Cache sitemap for 1 hour

const API_DOMAIN = process.env.BASE_URL

const default_sitemap_options = {
  hostname: API_DOMAIN,
  exclude: exclude_routes,
  trailingSlash: true,
  gzip: true,
  cacheTime: cache_time,
  defaults: {
    lastmod: new Date(),
  },
}

const addSitemap = ({
  sitemap_name = '',
  api_url = '',
  modify_item = () => {},
  extra_exclude_routes = [],
}) => {
  return Object.assign({}, default_sitemap_options, {
    path: `/sitemap-${sitemap_name}.xml`,
    exclude: Object.assign([], exclude_routes, extra_exclude_routes),
    cacheTime: cache_time,
    defaults: {
      lastmod: new Date(),
    },
    routes: async () => {
      const fetchItems = async (items = [], page = 1) => {
        const _api_url = api_url.includes('?') ? api_url + '&' : api_url + '?'
        const records = await axios.get(`${_api_url}page=${page}&per_page=1000`)

        for (const record of records.data.data) {
          items.push(modify_item(record))
        }

        return records.data.current_page !== records.data.last_page
          ? fetchItems(items, page + 1)
          : items
      }

      return await fetchItems()
    },
  })
}

const sitemaps = []

sitemaps.push(
  Object.assign(
    {
      routes: ['uslugi/', 'zhurnal/'],
    },
    default_sitemap_options,
    { path: '/sitemap-static.xml' }
  )
)

sitemaps.push(
  addSitemap({
    sitemap_name: 'zhurnal-posts',
    api_url: `${API_DOMAIN}/api/v1/journal/posts/grid/sitemap`,
    modify_item: (record) => {
      return `/zhurnal/${record.category.slug}/${record.slug}/`
    },
    extra_exclude_routes: ['/**'],
  })
)

sitemaps.push(
  addSitemap({
    sitemap_name: 'zhurnal-categories',
    api_url: `${API_DOMAIN}/api/v1/journal/categories/grid/sitemap`,
    modify_item: (record) => {
      return `/zhurnal/${record.slug}/`
    },
    extra_exclude_routes: ['/**'],
  })
)

sitemaps.push(
  addSitemap({
    sitemap_name: 'uslugi-categories',
    api_url: `${API_DOMAIN}/api/v1/catalog/categories/grid/sitemap`,
    modify_item: (record) => {
      return `/uslugi/${record.slug}/`
    },
    extra_exclude_routes: ['/**'],
  })
)

sitemaps.push(
  addSitemap({
    sitemap_name: 'uslugi-directions',
    api_url: `${API_DOMAIN}/api/v1/catalog/categories/grid/sitemap`,
    modify_item: (record) => {
      return `/uslugi/${record.category.slug}/${record.slug}/`
    },
    extra_exclude_routes: ['/**'],
  })
)

export default Object.assign({}, default_sitemap_options, {
  path: '/sitemap.xml',
  exclude: exclude_routes,
  sitemaps,
})
