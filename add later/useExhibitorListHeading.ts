export const useExhibitorListHeading = () => {
  const headings: string[] = []

  const showHeading = (index: number, value: string) => {
    headings[index] = value
    if (headings[index - 1] === value) {
      return false
    } else {
      return true
    }
  }

  return {
    showHeading
  }
}
