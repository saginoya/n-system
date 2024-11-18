import { defineCustomElement } from 'vue'
// import { createPinia, setActivePinia } from 'pinia'
import './assets/css/main.css'

// Piniaを利用する場合は以下を実行する
// setActivePinia(createPinia())

// Components
import NApp from './components/NApp.ce.vue'
import NAlert from './components/NAlert.ce.vue'
import NAnnotation from './components/NAnnotation.ce.vue'
import NBanner from './components/NBanner.ce.vue'
import NBtn from './components/NBtn.ce.vue'
import NCard from './components/NCard.ce.vue'
import NChip from './components/NChip.ce.vue'
import NCode from './components/NCode.ce.vue'
import NContainer1col from './components/NContainer1col.ce.vue'
import NContainer2col from './components/NContainer2col.ce.vue'
import NContainer3col from './components/NContainer3col.ce.vue'
import NContainerFlex from './components/NContainerFlex.ce.vue'
import NContainerMedia from './components/NContainerMedia.ce.vue'
import NContainerVerticalGrow from './components/NContainerVerticalGrow.ce.vue'
import NContainerXScroll from './components/NContainerXScroll.ce.vue'
import NElapsed from './components/NElapsed.ce.vue'
import NExhibitorsNexpo from './components/NExhibitorsNexpo.ce.vue'
import NForm from './components/NForm.ce.vue'
import NIcon from './components/NIcon.ce.vue'
import NImage from './components/NImage.ce.vue'
import NInputWrapper from './components/NInputWrapper.ce.vue'
import NLink from './components/NLink.ce.vue'
import NListDecimal from './components/NListDecimal.ce.vue'
import NListDisc from './components/NListDisc.ce.vue'
import NListItem2col from './components/NListItem2col.ce.vue'
import NListItem3col from './components/NListItem3col.ce.vue'
import NListItemApp from './components/NListItemApp.ce.vue'
import NListItemDate from './components/NListItemDate.ce.vue'
import NListItemKomazu from './components/NListItemKomazu.ce.vue'
import NListItemStepper from './components/NListItemStepper.ce.vue'
import NListNav from './components/NListNav.ce.vue'
import NListNavRow from './components/NListNavRow.ce.vue'
import NListNews from './components/NListNews.ce.vue'
import NListSimple from './components/NListSimple.ce.vue'
import NModal from './components/NModal.ce.vue'
import NSheet from './components/NSheet.ce.vue'
import NSignature from './components/NSignature.ce.vue'
import NStrong from './components/NStrong.ce.vue'
import NTitleLv2Index from './components/NTitleLv2Index.ce.vue'
import NTitleLv2Page from './components/NTitleLv2Page.ce.vue'
import NTitleLv3 from './components/NTitleLv3.ce.vue'
import NTitleLv4 from './components/NTitleLv4.ce.vue'
import NTitleLv5 from './components/NTitleLv5.ce.vue'
import NTooltipInfo from './components/NTooltipInfo.ce.vue'
import NYoutube from './components/NYoutube.ce.vue'

customElements.define('n-app', defineCustomElement(NApp))
customElements.define('n-alert', defineCustomElement(NAlert))
customElements.define('n-annotation', defineCustomElement(NAnnotation))
customElements.define('n-banner', defineCustomElement(NBanner))
customElements.define('n-btn', defineCustomElement(NBtn))
customElements.define('n-card', defineCustomElement(NCard))
customElements.define('n-chip', defineCustomElement(NChip))
customElements.define('n-code', defineCustomElement(NCode))
customElements.define('n-container-1col', defineCustomElement(NContainer1col))
customElements.define('n-container-2col', defineCustomElement(NContainer2col))
customElements.define('n-container-3col', defineCustomElement(NContainer3col))
customElements.define('n-container-flex', defineCustomElement(NContainerFlex))
customElements.define('n-container-media', defineCustomElement(NContainerMedia))
customElements.define('n-container-vertical-grow', defineCustomElement(NContainerVerticalGrow))
customElements.define('n-container-x-scroll', defineCustomElement(NContainerXScroll))
customElements.define('n-elapsed', defineCustomElement(NElapsed))
customElements.define('n-exhibitors-nexpo', defineCustomElement(NExhibitorsNexpo))
customElements.define('n-form', defineCustomElement(NForm))
customElements.define('n-icon', defineCustomElement(NIcon))
customElements.define('n-image', defineCustomElement(NImage))
customElements.define('n-input-wrapper', defineCustomElement(NInputWrapper))
customElements.define('n-link', defineCustomElement(NLink))
customElements.define('n-list-decimal', defineCustomElement(NListDecimal))
customElements.define('n-list-disc', defineCustomElement(NListDisc))
customElements.define('n-list-item-2col', defineCustomElement(NListItem2col))
customElements.define('n-list-item-3col', defineCustomElement(NListItem3col))
customElements.define('n-list-item-app', defineCustomElement(NListItemApp))
customElements.define('n-list-item-date', defineCustomElement(NListItemDate))
customElements.define('n-list-item-komazu', defineCustomElement(NListItemKomazu))
customElements.define('n-list-item-stepper', defineCustomElement(NListItemStepper))
customElements.define('n-list-nav', defineCustomElement(NListNav))
customElements.define('n-list-nav-row', defineCustomElement(NListNavRow))
customElements.define('n-list-news', defineCustomElement(NListNews))
customElements.define('n-list-simple', defineCustomElement(NListSimple))
customElements.define('n-modal', defineCustomElement(NModal))
customElements.define('n-sheet', defineCustomElement(NSheet))
customElements.define('n-signature', defineCustomElement(NSignature))
customElements.define('n-strong', defineCustomElement(NStrong))
customElements.define('n-title-lv2-index', defineCustomElement(NTitleLv2Index))
customElements.define('n-title-lv2-page', defineCustomElement(NTitleLv2Page))
customElements.define('n-title-lv3', defineCustomElement(NTitleLv3))
customElements.define('n-title-lv4', defineCustomElement(NTitleLv4))
customElements.define('n-title-lv5', defineCustomElement(NTitleLv5))
customElements.define('n-tooltip-info', defineCustomElement(NTooltipInfo))
customElements.define('n-youtube', defineCustomElement(NYoutube))
