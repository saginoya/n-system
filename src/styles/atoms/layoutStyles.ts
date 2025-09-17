export const justifyMap = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  stretch: 'justify-stretch',
  baseline: 'justify-baseline',
  normal: 'justify-normal',
} as const

export type Justify = keyof typeof justifyMap

export const justifyMdMap: Record<Justify, string> = {
  start: 'md:justify-start',
  end: 'md:justify-end',
  center: 'md:justify-center',
  between: 'md:justify-between',
  around: 'md:justify-around',
  evenly: 'md:justify-evenly',
  stretch: 'md:justify-stretch',
  baseline: 'md:justify-baseline',
  normal: 'md:justify-normal',
} as const

export const alignItemsMap = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} as const

export type AlignItems = keyof typeof alignItemsMap

export const gapMap = {
  '0': 'gap-0',
  '0.5': 'gap-0.5',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '8': 'gap-8',
  '12': 'gap-12',
  '16': 'gap-16',
  '20': 'gap-20',
  '24': 'gap-24',
} as const

export type Gap = keyof typeof gapMap

export const wrapMap = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  reverse: 'flex-wrap-reverse',
}

export type Wrap = keyof typeof wrapMap
