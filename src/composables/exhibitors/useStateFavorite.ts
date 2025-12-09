import { ref } from 'vue'

/**
 * お気に入りの表示状態管理を行うComposable
 * @returns
 */
export const useStateFavorite = () => {
  const stateFavorite = ref<boolean>(false)

  return {
    stateFavorite,
  }
}
