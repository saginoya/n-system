import type { Directive, DirectiveBinding } from 'vue'

type ClickOutsideElement = HTMLElement & {
  _clickOutsideHandler?: (event: MouseEvent) => void
}

const clickOutside: Directive = {
  mounted(el: ClickOutsideElement, binding: DirectiveBinding<() => void>) {
    el._clickOutsideHandler = (event: MouseEvent) => {
      // クリックされた要素が el の外側かどうかを判定
      if (!el.contains(event.target as Node)) {
        // バインドされたコールバックを実行
        binding.value()
      }
    }
    // capture: true にすると、内部で stopPropagation されても検知できる
    document.addEventListener('click', el._clickOutsideHandler, true)
  },

  unmounted(el: ClickOutsideElement) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler, true)
    }
  },
}

export default clickOutside
