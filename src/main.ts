import { defineCustomElement } from 'vue'

// Components
import AreaHtml from './components/AreaHtml.ce.vue'

const MyAreaHtml = defineCustomElement(AreaHtml)

customElements.define('area-html', MyAreaHtml)
