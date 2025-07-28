import { ref, computed, watchEffect, readonly, onMounted, onUnmounted } from 'vue'

import type { PublishedState } from '@/types'

/**
 * 公開状態を管理するためのコンポーザブル
 * @returns {Object} 公開状態に関する状態と操作メソッド
 */
export const usePublishedState = () => {
  // 状態管理
  const publishedState = ref<PublishedState>('default')
  const deadline = ref<Date | undefined>()
  const now = ref<Date>(new Date())
  const isAutoDeadline = ref<boolean>(true)

  /**
   * 現在の日時を更新
   */
  const updateNow = () => {
    now.value = new Date()
  }
  onMounted(() => {
    // 定期的に現在の日時を更新
    const intervalId = setInterval(updateNow, 180000) // 3分ごと
    // コンポーネントがアンマウントされたときにインターバルをクリア
    onUnmounted(() => {
      clearInterval(intervalId)
    })
  })

  /**
   * 準備中状態かどうかを判定
   */
  const isPreparation = computed<boolean>(() => {
    return publishedState.value === 'preparation'
  })

  /**
   * 期限切れ状態かどうかを判定
   */
  const isExpiration = computed<boolean>(() => {
    if (!deadline.value) return false
    return deadline.value < now.value
  })

  /**
   * 終了状態かどうかを判定
   */
  const isClosing = computed<boolean>(() => {
    return publishedState.value === 'closing'
  })

  /**
   * 公開状態を設定
   * @param state - 設定する公開状態
   */
  const setPublishedState = (state: PublishedState): void => {
    publishedState.value = state
  }

  /**
   * 期限を設定
   * @param date - 期限日時の文字列（ISO 8601形式推奨）
   * @throws {Error} 無効な日付形式の場合
   */
  const setDeadline = (date: string | Date): boolean => {
    const newDeadline = new Date(date)

    // 無効な日付かどうかチェック
    if (isNaN(newDeadline.getTime())) {
      console.error('無効な日付形式です。ISO 8601形式（YYYY-MM-DDThh:mm:ss）を使用してください。')
      return false
    }

    deadline.value = newDeadline
    return true
  }

  /**
   * 自動期限切れ機能を無効化
   */
  const revokeAutoDeadline = (): void => {
    isAutoDeadline.value = false
  }

  // 自動期限切れの監視
  watchEffect(() => {
    if (isAutoDeadline.value && !isPreparation.value && isExpiration.value) {
      publishedState.value = 'closing'
    }
  })

  return {
    publishedState: readonly(publishedState),
    isPreparation,
    isExpiration,
    isClosing,
    setPublishedState,
    setDeadline,
    revokeAutoDeadline,
    updateNow,
  }
}
