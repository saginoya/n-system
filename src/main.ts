import { defineCustomElement } from 'vue'
// import { createPinia, setActivePinia } from 'pinia'
import './assets/css/main.css'
// Piniaを利用する場合は以下を実行する
// setActivePinia(createPinia())

// Components
import NApp from './components/templates/NApp.ce.vue'
import NAlert from './components/atoms/NAlert.ce.vue'
import NAnnotation from './components/atoms/NAnnotation.ce.vue'
import NAnnotationLight from './components/atoms/NAnnotationLight.ce.vue'
import NBanner from './components/molecules/NBanner.ce.vue'
import NBtn from './components/atoms/NBtn.ce.vue'
import NCard from './components/atoms/NCard.ce.vue'
import NChip from './components/atoms/NChip.ce.vue'
import NCode from './components/atoms/NCode.ce.vue'
import NContainer1col from './components/atoms/NContainer1col.ce.vue'
import NContainer2col from './components/atoms/NContainer2col.ce.vue'
import NContainer3col from './components/atoms/NContainer3col.ce.vue'
import NContainerFlex from './components/atoms/NContainerFlex.ce.vue'
import NContainerMedia from './components/molecules/NContainerMedia.ce.vue'
import NContainerVerticalGrow from './components/molecules/NContainerVerticalGrow.ce.vue'
import NContainerXScroll from './components/atoms/NContainerXScroll.ce.vue'
import NElapsed from './components/atoms/NElapsed.ce.vue'
import NExhibitorsNexpo from './components/organisms/NExhibitorsNexpo.ce.vue'
import NFormNexpoExhibitorInfo from './components/organisms/NFormNexpoExhibitorInfo.ce.vue'
import NIcon from './components/atoms/NIcon.ce.vue'
import NImage from './components/molecules/NImage.ce.vue'
import NInputWrapper from './components/atoms/NInputWrapper.ce.vue'
import NLink from './components/atoms/NLink.ce.vue'
import NListDecimal from './components/atoms/NListDecimal.ce.vue'
import NListDisc from './components/atoms/NListDisc.ce.vue'
import NListItem2col from './components/atoms/NListItem2col.ce.vue'
import NListItem3col from './components/atoms/NListItem3col.ce.vue'
import NListItemApp from './components/atoms/NListItemApp.ce.vue'
import NListItemDate from './components/atoms/NListItemDate.ce.vue'
import NListItemKomazu from './components/atoms/NListItemKomazu.ce.vue'
import NListItemStepper from './components/atoms/NListItemStepper.ce.vue'
import NListNav from './components/molecules/NListNav.ce.vue'
import NListNavRow from './components/molecules/NListNavRow.ce.vue'
import NListNews from './components/atoms/NListNews.ce.vue'
import NListSimple from './components/atoms/NListSimple.ce.vue'
import NModal from './components/molecules/NModal.ce.vue'
import NSheet from './components/atoms/NSheet.ce.vue'
import NSignature from './components/atoms/NSignature.ce.vue'
import NStrong from './components/atoms/NStrong.ce.vue'
import NTitleLv2Index from './components/atoms/NTitleLv2Index.ce.vue'
import NTitleLv2Page from './components/atoms/NTitleLv2Page.ce.vue'
import NTitleLv3 from './components/atoms/NTitleLv3.ce.vue'
import NTitleLv4 from './components/atoms/NTitleLv4.ce.vue'
import NTitleLv5 from './components/atoms/NTitleLv5.ce.vue'
import NTooltipInfo from './components/molecules/NTooltipInfo.ce.vue'
import NYoutube from './components/molecules/NYoutube.ce.vue'

customElements.define('n-app', defineCustomElement(NApp))
customElements.define('n-alert', defineCustomElement(NAlert))
customElements.define('n-annotation', defineCustomElement(NAnnotation))
customElements.define('n-annotation-light', defineCustomElement(NAnnotationLight))
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
// NForm ビルド時に型エラーのため、これを一時的に回避するためany型にしている
customElements.define(
  'n-form-nexpo-exhibitor-info',
  defineCustomElement(NFormNexpoExhibitorInfo as any)
)
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
