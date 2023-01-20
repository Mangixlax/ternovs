// @ts-ignore
import incstr from 'incstr'

const createUniqueIdGenerator = () => {
  const uniqIds: Record<string, string> = {}

  const generateNextId = incstr.idGenerator({
    alphabet: 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ',
  })

  return (name: string) => {
    if (!uniqIds[name]) {
      uniqIds[name] = generateNextId()
    }

    return uniqIds[name]
  }
}

const localNameIdGenerator = createUniqueIdGenerator()
const componentNameIdGenerator = createUniqueIdGenerator()

export default function (localName: string, resourcePath: string) {
  const componentName = resourcePath.split('/').slice(-3).join('/')

  const localId = localNameIdGenerator(localName)
  const componentId = componentNameIdGenerator(componentName)

  return `${componentId}_${localId}`
}
