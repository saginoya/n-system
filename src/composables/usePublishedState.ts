import { ref, computed, watchEffect, readonly } from 'vue'
import type { PublishedState } from '@/types/publishedState'

export const usePublishedState = () => {
  const publishedState = ref<PublishedState>('default')
  const deadline = ref<Date | undefined>()
  const now = ref<Date>(new Date())
  const isAutoDeadline = ref<boolean>(true)

  // ゲッター
  const isPreparation = computed<boolean>(() => {
    return publishedState.value === 'preparation'
  })
  const isExpiration = computed<boolean>(() => {
    if (!deadline.value) return false
    return deadline.value < now.value
  })
  const isClosing = computed<boolean>(() => {
    return publishedState.value === 'closing'
  })

  // セッター
  const setPublishedState = (state: PublishedState): void => {
    publishedState.value = state
  }
  const setDeadline = (date: string): void => {
    deadline.value = new Date(date)
  }
  const revokeAutoDeadline = (): void => {
    isAutoDeadline.value = false
  }

  watchEffect(() => {
    if (isAutoDeadline.value && !isPreparation.value && isExpiration.value) {
      publishedState.value = 'closing'
    }
  })

  return {
    publishedState: readonly(publishedState),
    isPreparation: readonly(isPreparation),
    isExpiration: readonly(isExpiration),
    isClosing: readonly(isClosing),
    setPublishedState,
    setDeadline,
    revokeAutoDeadline,
  }
}
