import NInputEmail from '@/components/NInputEmail.vue'
import NInputNum from '@/components/NInputNum.vue'
import NInputPostalCode from '@/components/NInputPostalCode.vue'
import NInputTel from '@/components/NInputTel.vue'
import NInputText from '@/components/NInputText.vue'
import NInputTextarea from '@/components/NInputTextarea.vue'
import NInputUrl from '@/components/NInputUrl.vue'
import NInputSdgs from '@/components/NInputSdgs.vue'
import NInputsRadio from '@/components/NInputsRadio.vue'

import type { TypeOfFormField } from '@/types/formField'

export const useInputComps = () => {
  const getInputComp = (type: TypeOfFormField) => {
    switch (type) {
      case 'email':
        return NInputEmail
      case 'number':
        return NInputNum
      case 'postal-code':
        return NInputPostalCode
      case 'tel':
        return NInputTel
      case 'text':
        return NInputText
      case 'textarea':
        return NInputTextarea
      case 'url':
        return NInputUrl
      case 'sdgs':
        return NInputSdgs
      case 'radio':
        return NInputsRadio
      default:
        return NInputText
    }
  }

  return {
    getInputComp
  }
}
