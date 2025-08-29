import type { Exhibitor } from '@/types'

export const sortExhibitorList = (list: Exhibitor[], sortKey: keyof Exhibitor) => {
  if (!list.every((item) => sortKey in item)) {
    throw new Error(`Invalid sort key: ${sortKey}`)
  }
  return [...list].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]

    if (aValue === undefined && bValue === undefined) return 0
    if (aValue === undefined) return 1
    if (bValue === undefined) return -1

    if (aValue < bValue) return -1
    if (aValue > bValue) return 1
    return 0
  })
}
