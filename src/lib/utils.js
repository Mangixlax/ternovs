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