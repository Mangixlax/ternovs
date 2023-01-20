export const minifyCurrency = (value: string | number | undefined, showLabel: boolean = false) => {
  return (Math.abs(Number(value)) >= 1.0e+6
      ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + (showLabel ? ' млн' : '')
      : Math.abs(Number(value)) >= 1.0e+3
        ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + (showLabel ? ' тыс.' : '')
        : Math.abs(Number(value))).toString().replace('.', ',');
}

export const formatNumber = (value: string | number | undefined): string => {
  if ("undefined" === typeof value)
    return ''
  let newValue = ""
  value = (value + "").replace(/ /g, "")
  if (4 > value.length)
    return value
  let firstSplitIndex = value.length - 3
  for (; 0 < firstSplitIndex; firstSplitIndex -= 3)
    newValue = value.substr(firstSplitIndex, 3) + " " + newValue
  newValue = value.substr(0, 3 + firstSplitIndex) + " " + newValue
  return newValue.trim()
}
