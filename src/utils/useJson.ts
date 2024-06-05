export const useJson = async (src: string) => {
  try {
    const res = await fetch(src)
    const result = await res.json()
    return result
  } catch (e) {
    console.error(e)
    return {}
  }
}
