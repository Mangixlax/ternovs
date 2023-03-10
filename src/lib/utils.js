import metaGenerator from '~/lib/meta'

/**
 * Склонение слов
 *
 * @param i - число
 * @param str0 - 0 яблок
 * @param str1 - 1 яблоко
 * @param str2 - 2 яблока
 * @param str3 - 5 яблок
 */
export const pluralize = (i, str0, str1, str2, str3) => {
  if (!i) {
    return parse(str0, i)
  }
  switch (plural(i)) {
    case 0:
      return parse(str1, i)
    case 1:
      return parse(str2, i)
    default:
      return parse(str3, i)
  }
}

const parse = (str) => {
  // eslint-disable-next-line no-undef,prefer-reflect
  const args = [].slice.call(arguments, 1)
  let i = 0

  return str.replace(/%d/g, function () {
    return args[i++]
  })
}

export const plural = (a) => {
  if (a % 10 === 1 && a % 100 !== 11) {
    return 0
  } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
    return 1
  } else {
    return 2
  }
}

export const getScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps

  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  // force scrollbars
  outer.style.overflow = 'scroll'

  // add innerdiv
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth

  // remove divs
  outer.parentNode.removeChild(outer)

  return widthNoScroll - widthWithScroll
}

export const scrollLeft = (element, to, duration) => {
  return new Promise((resolve) => {
    const start = element.scrollLeft
    const change = to - start
    let currentTime = 0
    const increment = 20

    const animateScroll = () => {
      currentTime += increment
      element.scrollLeft = Math.easeInOutQuad(
        currentTime,
        start,
        change,
        duration
      )
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      } else {
        resolve()
      }
    }

    animateScroll()
  })
}

export const getSiteUrl = (href = '', withSlash = false) => {
  let url = href

  if (href.indexOf(process.env.BASE_URL) === -1) {
    url = `${process.env.BASE_URL}${href}`
  }

  if (url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1)
  }

  return withSlash ? (url.endsWith('/') ? url : url + '/') : url
}

export const formatNumber = (value) => {
  if ('undefined' === typeof value) return ''
  let newValue = ''
  value = (value + '').replace(/ /g, '')
  if (4 > value.length) return value
  let firstSplitIndex = value.length - 3
  for (; 0 < firstSplitIndex; firstSplitIndex -= 3)
    newValue = value.substr(firstSplitIndex, 3) + ' ' + newValue
  newValue = value.substr(0, 3 + firstSplitIndex) + ' ' + newValue
  return newValue.trim()
}

export const getHead = (options) => {
  const { title, description, route, seo } = options

  const result = {
    title: title,
    description: description,
    canonical: route.path,
  }

  if (seo) {
    result.title = seo.title
    result.description = seo.description
    result.og_title = seo.og_title
    result.og_description = seo.og_description
    result.keywords = seo.keywords
    result.canonical = seo?.canonical || result.canonical
    result.robots = seo?.robots
  }

  result.canonical = getSiteUrl(result.canonical, true)

  if (route.query?.page) {
    result.robots = 'noindex,follow'
  }

  return {
    title: result.title,
    meta: metaGenerator(result),
    link: [
      {
        rel: 'canonical',
        href: getSiteUrl(result.canonical || route.path, true),
      },
    ],
  }
}
