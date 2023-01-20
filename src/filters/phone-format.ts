export function phoneFormat(value: string = '', format: string) {
  const pattern = /(7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/
  return value.replace(/\D/g, '').replace(pattern, format)
}
