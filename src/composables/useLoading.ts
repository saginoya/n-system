import { ref, onMounted, readonly } from 'vue'

export const useLoading = () => {
  const loading = ref(true)
  onMounted(() => {
    loading.value = false
  })

  return {
    loading: readonly(loading)
  }
}
