import { defineCustomElement } from 'vue'
import './assets/css/main.css'

// Components
import NApp from './components/NApp.ce.vue'
import NBanner from './components/NBanner.ce.vue'
import NCard from './components/NCard.ce.vue'
import NChip from './components/NChip.ce.vue'
import NContainer1col from './components/NContainer1col.ce.vue'
import NContainer2col from './components/NContainer2col.ce.vue'
import NContainer3col from './components/NContainer3col.ce.vue'
import NContainerFlex from './components/NContainerFlex.ce.vue'
import NFooter from './components/NFooter.ce.vue'
import NGlobalNav from './components/NGlobalNav.ce.vue'
import NHeader from './components/NHeader.ce.vue'
import NHeaderTool from './components/NHeaderTool.ce.vue'
import NImage from './components/NImage.ce.vue'
import NLayoutDefault from './components/NLayoutDefault.ce.vue'
import NLink from './components/NLink.ce.vue'
import NListItemDate from './components/NListItemDate.ce.vue'
import NListNav from './components/NListNav.ce.vue'
import NListNavRow from './components/NListNavRow.ce.vue'
import NListNews from './components/NListNews.ce.vue'
import NMain from './components/NMain.ce.vue'
import NMainVisual from './components/NMainVisual.ce.vue'
import NSheet from './components/NSheet.ce.vue'
import NSignature from './components/NSignature.ce.vue'
import NTitleLv1Site from './components/NTitleLv1Site.ce.vue'
import NTitleLv2Index from './components/NTitleLv2Index.ce.vue'
import NTitleLv2Page from './components/NTitleLv2Page.ce.vue'
import NTitleLv3 from './components/NTitleLv3.ce.vue'
import NTitleLv4 from './components/NTitleLv4.ce.vue'
import NTitleLv5 from './components/NTitleLv5.ce.vue'

customElements.define('n-app', defineCustomElement(NApp))
customElements.define('n-banner', defineCustomElement(NBanner))
customElements.define('n-card', defineCustomElement(NCard))
customElements.define('n-chip', defineCustomElement(NChip))
customElements.define('n-container-1col', defineCustomElement(NContainer1col))
customElements.define('n-container-2col', defineCustomElement(NContainer2col))
customElements.define('n-container-3col', defineCustomElement(NContainer3col))
customElements.define('n-container-flex', defineCustomElement(NContainerFlex))
customElements.define('n-footer', defineCustomElement(NFooter))
customElements.define('n-global-nav', defineCustomElement(NGlobalNav))
customElements.define('n-header', defineCustomElement(NHeader))
customElements.define('n-header-tool', defineCustomElement(NHeaderTool))
customElements.define('n-image', defineCustomElement(NImage))
customElements.define('n-layout-default', defineCustomElement(NLayoutDefault))
customElements.define('n-link', defineCustomElement(NLink))
customElements.define('n-list-item-date', defineCustomElement(NListItemDate))
customElements.define('n-list-nav', defineCustomElement(NListNav))
customElements.define('n-list-nav-row', defineCustomElement(NListNavRow))
customElements.define('n-list-news', defineCustomElement(NListNews))
customElements.define('n-main', defineCustomElement(NMain))
customElements.define('n-main-visual', defineCustomElement(NMainVisual))
customElements.define('n-sheet', defineCustomElement(NSheet))
customElements.define('n-signature', defineCustomElement(NSignature))
customElements.define('n-title-lv1-site', defineCustomElement(NTitleLv1Site))
customElements.define('n-title-lv2-index', defineCustomElement(NTitleLv2Index))
customElements.define('n-title-lv2-page', defineCustomElement(NTitleLv2Page))
customElements.define('n-title-lv3', defineCustomElement(NTitleLv3))
customElements.define('n-title-lv4', defineCustomElement(NTitleLv4))
customElements.define('n-title-lv5', defineCustomElement(NTitleLv5))
