import { defineCustomElement } from 'vue'
import './assets/css/main.css'

// Components
import NApp from './components/NApp.ce.vue'
import NAlert from './components/NAlert.ce.vue'
import NBanner from './components/NBanner.ce.vue'
import NBtn from './components/NBtn.ce.vue'
import NCard from './components/NCard.ce.vue'
import NChip from './components/NChip.ce.vue'
import NCode from './components/NCode.ce.vue'
import NContainer1col from './components/NContainer1col.ce.vue'
import NContainer2col from './components/NContainer2col.ce.vue'
import NContainer3col from './components/NContainer3col.ce.vue'
import NContainerFlex from './components/NContainerFlex.ce.vue'
import NContainerVerticalGrow from './components/NContainerVerticalGrow.ce.vue'
import NContainerMedia from './components/NContainerMedia.ce.vue'
import NElapsed from './components/NElapsed.ce.vue'
import NIcon from './components/NIcon.ce.vue'
import NImage from './components/NImage.ce.vue'
// import NInputEmail from './components/NInputEmail.ce.vue'
// import NInputNum from './components/NInputNum.ce.vue'
// import NInputPostalCode from './components/NInputPostalCode.ce.vue'
// import NInputsRadio from './components/NInputsRadio.ce.vue'
// import NInputTel from './components/NInputTel.ce.vue'
// import NInputText from './components/NInputText.ce.vue'
// import NInputUrl from './components/NInputUrl.ce.vue'
import NInputWrapper from './components/NInputWrapper.ce.vue'
import NLink from './components/NLink.ce.vue'
import NListDecimal from './components/NListDecimal.ce.vue'
import NListDisc from './components/NListDisc.ce.vue'
import NListItem2col from './components/NListItem2col.ce.vue'
import NListItemDate from './components/NListItemDate.ce.vue'
import NListNav from './components/NListNav.ce.vue'
import NListNavRow from './components/NListNavRow.ce.vue'
import NListNews from './components/NListNews.ce.vue'
import NListSimple from './components/NListSimple.ce.vue'
// import NMsgCheck from './components/NMsgCheck.ce.vue'
// import NMsgWarning from './components/NMsgWarning.ce.vue'
import NSheet from './components/NSheet.ce.vue'
import NSignature from './components/NSignature.ce.vue'
// import NTextarea from './components/NTextarea.ce.vue'
import NTitleLv2Index from './components/NTitleLv2Index.ce.vue'
import NTitleLv2Page from './components/NTitleLv2Page.ce.vue'
import NTitleLv3 from './components/NTitleLv3.ce.vue'
import NTitleLv4 from './components/NTitleLv4.ce.vue'
import NTitleLv5 from './components/NTitleLv5.ce.vue'
import NYoutube from './components/NYoutube.ce.vue'

customElements.define('n-app', defineCustomElement(NApp))
customElements.define('n-alert', defineCustomElement(NAlert))
customElements.define('n-banner', defineCustomElement(NBanner))
customElements.define('n-btn', defineCustomElement(NBtn))
customElements.define('n-card', defineCustomElement(NCard))
customElements.define('n-chip', defineCustomElement(NChip))
customElements.define('n-code', defineCustomElement(NCode))
customElements.define('n-container-1col', defineCustomElement(NContainer1col))
customElements.define('n-container-2col', defineCustomElement(NContainer2col))
customElements.define('n-container-3col', defineCustomElement(NContainer3col))
customElements.define('n-container-flex', defineCustomElement(NContainerFlex))
customElements.define('n-container-vertical-grow', defineCustomElement(NContainerVerticalGrow))
customElements.define('n-container-media', defineCustomElement(NContainerMedia))
customElements.define('n-elapsed', defineCustomElement(NElapsed))
customElements.define('n-icon', defineCustomElement(NIcon))
customElements.define('n-image', defineCustomElement(NImage))
// customElements.define('n-input-email', defineCustomElement(NInputEmail))
// customElements.define('n-input-num', defineCustomElement(NInputNum))
// customElements.define('n-input-postal-code', defineCustomElement(NInputPostalCode))
// customElements.define('n-inputs-radio', defineCustomElement(NInputsRadio))
// customElements.define('n-input-tel', defineCustomElement(NInputTel))
// customElements.define('n-input-text', defineCustomElement(NInputText))
// customElements.define('n-input-url', defineCustomElement(NInputUrl))
customElements.define('n-input-wrapper', defineCustomElement(NInputWrapper))
customElements.define('n-link', defineCustomElement(NLink))
customElements.define('n-list-decimal', defineCustomElement(NListDecimal))
customElements.define('n-list-disc', defineCustomElement(NListDisc))
customElements.define('n-list-item-2col', defineCustomElement(NListItem2col))
customElements.define('n-list-item-date', defineCustomElement(NListItemDate))
customElements.define('n-list-nav', defineCustomElement(NListNav))
customElements.define('n-list-nav-row', defineCustomElement(NListNavRow))
customElements.define('n-list-news', defineCustomElement(NListNews))
customElements.define('n-list-simple', defineCustomElement(NListSimple))
// customElements.define('n-msg-check', defineCustomElement(NMsgCheck))
// customElements.define('n-msg-warning', defineCustomElement(NMsgWarning))
customElements.define('n-sheet', defineCustomElement(NSheet))
customElements.define('n-signature', defineCustomElement(NSignature))
// customElements.define('n-textarea', defineCustomElement(NTextarea))
customElements.define('n-title-lv2-index', defineCustomElement(NTitleLv2Index))
customElements.define('n-title-lv2-page', defineCustomElement(NTitleLv2Page))
customElements.define('n-title-lv3', defineCustomElement(NTitleLv3))
customElements.define('n-title-lv4', defineCustomElement(NTitleLv4))
customElements.define('n-title-lv5', defineCustomElement(NTitleLv5))
customElements.define('n-youtube', defineCustomElement(NYoutube))
