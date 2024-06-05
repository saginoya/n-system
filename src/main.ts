import { defineCustomElement } from 'vue'
import './assets/css/main.css'

// Components
import NChip from './components/NChip.ce.vue'
import NFooter from './components/NFooter.ce.vue'
import NGlobalNav from './components/NGlobalNav.ce.vue'
import NHeader from './components/NHeader.ce.vue'
import NHeaderTool from './components/NHeaderTool.ce.vue'
import NImage from './components/NImage.ce.vue'
import NLayoutDefault from './components/NLayoutDefault.ce.vue'
import NLinkDoc from './components/NLinkDoc.ce.vue'
import NLinkExternal from './components/NLinkExternal.ce.vue'
import NLinkInternal from './components/NLinkInternal.ce.vue'
import NListNav from './components/NListNav.ce.vue'
import NListNavRow from './components/NListNavRow.ce.vue'
import NMain from './components/NMain.ce.vue'
import NMainVisual from './components/NMainVisual.ce.vue'
import NTitleSite from './components/NTitleSite.ce.vue'

customElements.define('n-chip', defineCustomElement(NChip))
customElements.define('n-footer', defineCustomElement(NFooter))
customElements.define('n-global-nav', defineCustomElement(NGlobalNav))
customElements.define('n-header', defineCustomElement(NHeader))
customElements.define('n-header-tool', defineCustomElement(NHeaderTool))
customElements.define('n-image', defineCustomElement(NImage))
customElements.define('n-layout-default', defineCustomElement(NLayoutDefault))
customElements.define('n-link-doc', defineCustomElement(NLinkDoc))
customElements.define('n-link-external', defineCustomElement(NLinkExternal))
customElements.define('n-link-internal', defineCustomElement(NLinkInternal))
customElements.define('n-list-nav', defineCustomElement(NListNav))
customElements.define('n-list-nav-row', defineCustomElement(NListNavRow))
customElements.define('n-main', defineCustomElement(NMain))
customElements.define('n-main-visual', defineCustomElement(NMainVisual))
customElements.define('n-title-site', defineCustomElement(NTitleSite))
