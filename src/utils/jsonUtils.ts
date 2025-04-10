export const getJson = async (src: string) => {
  try {
    const res = await fetch(src)
    return await res.json()
  } catch (e) {
    console.error(e)
    return {}
  }
}
