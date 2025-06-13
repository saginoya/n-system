import { defineCustomElement } from 'vue'

import type { DefineComponent } from 'vue'
import './assets/css/main.css'

// コンポーネントの自動登録
const components = import.meta.glob<{ default: DefineComponent }>(
  './components/n-elements/*.ce.vue',
  {
    eager: true,
  },
)

Object.entries(components).forEach(([path, component]) => {
  const fileName = path.split('/').pop() || ''
  const baseName = fileName.replace('.ce.vue', '')
  const componentName = baseName
    .replace(/([A-Z])/g, '-$1')
    .replace(/(\d+)/g, '-$1')
    .toLowerCase()
    .replace(/^-|-$/g, '') // 先頭と末尾のハイフンを削除

  if (componentName) {
    customElements.define(componentName, defineCustomElement(component.default))
  }
})
