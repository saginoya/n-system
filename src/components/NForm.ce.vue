<script setup lang="ts">
import { ref } from 'vue'
import NContainer1col from '@/components/NContainer1col.ce.vue'
import NModal from '@/components/NModal.ce.vue'
import NInputEmail from '@/components/NInputEmail.vue'
import NInputNum from '@/components/NInputNum.vue'
import NInputPostalCode from '@/components/NInputPostalCode.vue'
import NInputTel from '@/components/NInputTel.vue'
import NInputText from '@/components/NInputText.vue'
import NInputUrl from '@/components/NInputUrl.vue'
import NInputsRadio from '@/components/NInputsRadio.vue'
import NInputWrapper from '@/components/NInputWrapper.ce.vue'
import NTextarea from '@/components/NTextarea.vue'

defineProps<{
  action: string
}>()

type Response = {
  id: string
  label: string
  value: string | undefined
  required: boolean
}
type Responses = {
  email: Response
  num: Response
  postalCode: Response
  tel: Response
  text: Response
  url: Response
  radio: Response
  textarea: Response
}
const responses = ref<Responses>({
  email: {
    id: 'email',
    label: 'E-mail',
    value: '',
    required: true
  },
  num: {
    id: 'num',
    label: '数字',
    value: '',
    required: false
  },
  postalCode: {
    id: 'postal-code',
    label: '郵便番号',
    value: '',
    required: true
  },
  tel: {
    id: 'tel',
    label: 'TEL',
    value: '',
    required: true
  },
  text: {
    id: 'text',
    label: 'テキスト',
    value: '',
    required: false
  },
  url: {
    id: 'url',
    label: 'URL',
    value: '',
    required: false
  },
  radio: {
    id: 'radio',
    label: 'ラジオボタン',
    value: '',
    required: false
  },
  textarea: {
    id: 'textarea',
    label: 'テキストボックス',
    value: '',
    required: false
  }
})
</script>

<template>
  <NContainer1col :gap="8">
    <NInputWrapper :title="responses['email'].label" :required="responses['email'].required">
      <NInputEmail
        :name="responses['email'].id"
        :required="responses['email'].required"
        v-model="responses['email'].value"
      ></NInputEmail>
    </NInputWrapper>

    <NInputWrapper :title="responses['num'].label" :required="responses['num'].required">
      <NInputNum
        :name="responses['num'].id"
        :required="responses['num'].required"
        v-model="responses['num'].value"
      ></NInputNum>
    </NInputWrapper>

    <NInputWrapper
      :title="responses['postalCode'].label"
      :required="responses['postalCode'].required"
    >
      <NInputPostalCode
        :name="responses['postalCode'].id"
        :required="responses['postalCode'].required"
        v-model="responses['postalCode'].value"
      ></NInputPostalCode>
    </NInputWrapper>

    <NInputWrapper :title="responses['tel'].label" :required="responses['tel'].required">
      <NInputTel
        :name="responses['tel'].id"
        :required="responses['tel'].required"
        v-model="responses['tel'].value"
      ></NInputTel>
    </NInputWrapper>

    <NInputWrapper :title="responses['text'].label" :required="responses['text'].required">
      <NInputText
        :name="responses['text'].id"
        :required="responses['text'].required"
        v-model="responses['text'].value"
      ></NInputText>
    </NInputWrapper>

    <NInputWrapper :title="responses['url'].label" :required="responses['url'].required">
      <NInputUrl
        :name="responses['url'].id"
        :required="responses['url'].required"
        v-model="responses['url'].value"
      ></NInputUrl>
    </NInputWrapper>

    <NInputWrapper :title="responses['radio'].label" :required="responses['radio'].required">
      <NInputsRadio
        :name="responses['radio'].id"
        :required="responses['radio'].required"
        values="ひとつ,ふたつ,みっつ"
        v-model="responses['radio'].value"
      ></NInputsRadio>

      <NInputWrapper
        :title="responses['textarea'].label"
        :required="responses['textarea'].required"
      >
        <NTextarea
          :name="responses['textarea'].id"
          :required="responses['textarea'].required"
          v-model="responses['textarea'].value"
        ></NTextarea>
      </NInputWrapper>
    </NInputWrapper>
  </NContainer1col>
  <NModal btnTitle="確認">
    <form :action="action">
      <NContainer1col>
        <div v-for="response in responses" :key="response.id">
          <p class="font-bold">{{ response.label }}</p>
          <p>
            <input
              type="text"
              :name="response.label"
              :value="response.value"
              :required="response.required"
              readonly
            />
          </p>
        </div>
        <div>
          <input type="submit" value="送信" />
        </div>
      </NContainer1col>
    </form>
  </NModal>
</template>

<style>
@import url(../assets/css/main.css);
</style>
