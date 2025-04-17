import { defineCustomElement } from 'vue'
import './assets/css/main.css'

// Components
import NApp from './components/n-elements/NApp.ce.vue'
import NAlert from './components/n-elements/NAlert.ce.vue'
import NAnnotation from './components/n-elements/NAnnotation.ce.vue'
import NAnnotationLight from './components/n-elements/NAnnotationLight.ce.vue'
import NBanner from './components/n-elements/NBanner.ce.vue'
import NBreakpointSwitcher from './components/n-elements/NBreakpointSwitcher.ce.vue'
import NCard from './components/n-elements/NCard.ce.vue'
import NChip from './components/n-elements/NChip.ce.vue'
import NCircularBanner from './components/n-elements/NCircularBanner.ce.vue'
import NCode from './components/n-elements/NCode.ce.vue'
import NContainer1col from './components/n-elements/NContainer1col.ce.vue'
import NContainer2col from './components/n-elements/NContainer2col.ce.vue'
import NContainer3col from './components/n-elements/NContainer3col.ce.vue'
import NContainerFlex from './components/n-elements/NContainerFlex.ce.vue'
import NContainerMedia from './components/n-elements/NContainerMedia.ce.vue'
import NContainerVerticalGrow from './components/n-elements/NContainerVerticalGrow.ce.vue'
import NContainerXScroll from './components/n-elements/NContainerXScroll.ce.vue'
import NElapsed from './components/n-elements/NElapsed.ce.vue'
import NExhibitorsNexpo from './components/n-elements/NExhibitorsNexpo.ce.vue'
import NFixed from './components/parts/NFixed.ce.vue'
import NIcon from './components/n-elements/NIcon.ce.vue'
import NImage from './components/n-elements/NImage.ce.vue'
import NImageBanner from './components/n-elements/NImageBanner.ce.vue'
import NInputWrapper from './components/n-elements/NInputWrapper.ce.vue'
import NLink from './components/n-elements/NLink.ce.vue'
import NListDecimal from './components/n-elements/NListDecimal.ce.vue'
import NListDisc from './components/n-elements/NListDisc.ce.vue'
import NListItem2col from './components/n-elements/NListItem2col.ce.vue'
import NListItem3col from './components/n-elements/NListItem3col.ce.vue'
import NListItemApp from './components/n-elements/NListItemApp.ce.vue'
import NListItemDate from './components/n-elements/NListItemDate.ce.vue'
import NListItemKomazu from './components/n-elements/NListItemKomazu.ce.vue'
import NListItemStepper from './components/n-elements/NListItemStepper.ce.vue'
import NListNews from './components/n-elements/NListNews.ce.vue'
import NListSimple from './components/n-elements/NListSimple.ce.vue'
import NModal from './components/n-elements/NModal.ce.vue'
import NSheet from './components/n-elements/NSheet.ce.vue'
import NSignature from './components/n-elements/NSignature.ce.vue'
import NStrong from './components/n-elements/NStrong.ce.vue'
import NText from './components/n-elements/NText.ce.vue'
import NTitleLv2Index from './components/n-elements/NTitleLv2Index.ce.vue'
import NTitleLv2Page from './components/n-elements/NTitleLv2Page.ce.vue'
import NTitleLv3 from './components/n-elements/NTitleLv3.ce.vue'
import NTitleLv4 from './components/n-elements/NTitleLv4.ce.vue'
import NTitleLv5 from './components/n-elements/NTitleLv5.ce.vue'
import NTooltipInfo from './components/n-elements/NTooltipInfo.ce.vue'
import NYoutube from './components/n-elements/NYoutube.ce.vue'

customElements.define('n-app', defineCustomElement(NApp))
customElements.define('n-alert', defineCustomElement(NAlert))
customElements.define('n-annotation', defineCustomElement(NAnnotation))
customElements.define('n-annotation-light', defineCustomElement(NAnnotationLight))
customElements.define('n-banner', defineCustomElement(NBanner))
customElements.define('n-breakpoint-switcher', defineCustomElement(NBreakpointSwitcher))
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
customElements.define('n-fixed', defineCustomElement(NFixed))
customElements.define('n-icon', defineCustomElement(NIcon))
customElements.define('n-image', defineCustomElement(NImage))
customElements.define('n-image-banner', defineCustomElement(NImageBanner))
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
customElements.define('n-list-news', defineCustomElement(NListNews))
customElements.define('n-list-simple', defineCustomElement(NListSimple))
customElements.define('n-modal', defineCustomElement(NModal))
customElements.define('n-circular-banner', defineCustomElement(NCircularBanner))
customElements.define('n-sheet', defineCustomElement(NSheet))
customElements.define('n-signature', defineCustomElement(NSignature))
customElements.define('n-strong', defineCustomElement(NStrong))
customElements.define('n-text', defineCustomElement(NText))
customElements.define('n-title-lv2-index', defineCustomElement(NTitleLv2Index))
customElements.define('n-title-lv2-page', defineCustomElement(NTitleLv2Page))
customElements.define('n-title-lv3', defineCustomElement(NTitleLv3))
customElements.define('n-title-lv4', defineCustomElement(NTitleLv4))
customElements.define('n-title-lv5', defineCustomElement(NTitleLv5))
customElements.define('n-tooltip-info', defineCustomElement(NTooltipInfo))
customElements.define('n-youtube', defineCustomElement(NYoutube))
