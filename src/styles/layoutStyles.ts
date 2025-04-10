export const justifyOptions = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  stretch: 'justify-stretch',
  baseline: 'justify-baseline',
  normal: 'justify-normal',
}

export type Justify = keyof typeof justifyOptions

export const justifyMdOptions: Record<Justify, string> = {
  start: 'md:justify-start',
  end: 'md:justify-end',
  center: 'md:justify-center',
  between: 'md:justify-between',
  around: 'md:justify-around',
  evenly: 'md:justify-evenly',
  stretch: 'md:justify-stretch',
  baseline: 'md:justify-baseline',
  normal: 'md:justify-normal',
}

export const alignItemsOptions = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

export type AlignItems = keyof typeof alignItemsOptions
