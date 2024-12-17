import NInputEmail from '@/components/atoms/NInputEmail.vue'
import NInputNum from '@/components/atoms/NInputNum.vue'
import NInputPostalCode from '@/components/atoms/NInputPostalCode.vue'
import NInputTel from '@/components/atoms/NInputTel.vue'
import NInputText from '@/components/atoms/NInputText.vue'
import NInputTextarea from '@/components/atoms/NInputTextarea.vue'
import NInputUrl from '@/components/atoms/NInputUrl.vue'
import NInputSdgs from '@/components/molecules/NInputSdgs.vue'
import NInputsRadio from '@/components/molecules/NInputsRadio.vue'

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
