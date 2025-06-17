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
  // パスカルケースをケバブケースに変換
  // *数字が連続するとその都度ハイフンが入るので注意
  const componentName = baseName
    .replace(/([A-Z])/g, '-$1') // 大文字の前にハイフンを追加
    .replace(/(\d+)/g, '-$1') // 数字の前にハイフンを追加
    .toLowerCase() // 小文字に変換
    .replace(/^-|-$/g, '') // 先頭と末尾のハイフンを削除
    .replace(/-+/g, '-') // 重複ハイフンを1つに

  if (componentName) {
    customElements.define(componentName, defineCustomElement(component.default))
  }
})
