import { defineCustomElement } from 'vue'

// Components
import LinkExternal from './components/LinkExternal.ce.vue'
import LinkInternal from './components/LinkInternal.ce.vue'

const MyLinkExternal = defineCustomElement(LinkExternal)
const MyLinkInternal = defineCustomElement(LinkInternal)

customElements.define('link-external', MyLinkExternal)
customElements.define('link-internal', MyLinkInternal)
