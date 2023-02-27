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
