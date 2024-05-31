import { defineCustomElement } from 'vue'

// Components
import NLink from './components/NLink.ce.vue'
import NLinkExternal from './components/NLinkExternal.ce.vue'

customElements.define('n-link', defineCustomElement(NLink))
customElements.define('n-link-external', defineCustomElement(NLinkExternal))
