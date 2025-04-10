import { onMounted, onUnmounted } from 'vue'

/**
 * 指定したイベントターゲットにイベントリスナーを登録し、
 * コンポーネントのアンマウント時に自動的にリスナーを解除します。
 *
 * @param target - イベントリスナーを登録する対象（例：window、document、HTMLElement など）。
 * @param type - リッスンするイベントの種類（例：'click', 'scroll'）。
 * @param listener - イベントが発生したときに実行されるコールバック関数。
 * @param options - `addEventListener` に渡すオプション（例：{ once: true, passive: false }）。
 *
 * @example
 * ```ts
 * useEventListener(window, 'resize', () => {
 *   console.log('ウィンドウがリサイズされました')
 * })
 * ```
 *
 * このComposableはイベントリスナーの登録とクリーンアップを自動で行うため、
 * `onMounted` や `onUnmounted` を自分で書く必要はありません。
 */
export const useEventListener = (
  target: EventTarget,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => {
  onMounted(() => {
    target.addEventListener(type, listener, options)
  })

  onUnmounted(() => {
    target.removeEventListener(type, listener, options)
  })
}
