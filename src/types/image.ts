export type Image = {
  width: number
  height: number
  src: string
  alt: string
  caption?: string
}
export type MainVisual = {
  top: Image
  lower: Image
}
