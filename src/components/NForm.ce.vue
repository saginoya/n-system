<script setup lang="ts">
import { ref, computed } from 'vue'
import NContainer1col from '@/components/NContainer1col.ce.vue'
import NInputEmail from '@/components/NInputEmail.vue'
import NInputNum from '@/components/NInputNum.vue'
import NInputPostalCode from '@/components/NInputPostalCode.vue'
import NInputTel from '@/components/NInputTel.vue'
import NInputText from '@/components/NInputText.vue'
import NInputUrl from '@/components/NInputUrl.vue'
import NInputsRadio from '@/components/NInputsRadio.vue'
import NInputWrapper from '@/components/NInputWrapper.ce.vue'
import NInputTextarea from '@/components/NInputTextarea.vue'
import NBtn from '@/components/NBtn.ce.vue'
import NContainerFlex from '@/components/NContainerFlex.ce.vue'
import NModal from '@/components/NModal.ce.vue'

import { useFormFields } from '@/composables/useFormFields'

import type { FormFields } from '@/types/formField'

const props = defineProps<{
  storageKey: string
}>()

const initFormFields: FormFields = {
  email: {
    name: 'email',
    id: 'email',
    title: 'E-mail',
    value: '',
    required: true
  },
  num: {
    name: 'num',
    id: 'num',
    title: '数字',
    value: '',
    required: true
  },
  postalCode: {
    name: 'postal-code',
    id: 'postal-code',
    title: '郵便番号',
    value: '',
    required: true
  },
  tel: {
    name: 'tel',
    id: 'tel',
    title: 'TEL',
    value: '',
    required: true
  },
  text: {
    name: 'text',
    id: 'text',
    title: 'テキスト',
    value: '',
    required: false
  },
  url: {
    name: 'url',
    id: 'url',
    title: 'URL',
    value: '',
    required: false
  },
  radio: {
    name: 'radio',
    id: 'radio',
    title: 'ラジオボタン',
    value: '',
    required: true
  },
  textarea: {
    name: 'textarea',
    id: 'textarea',
    title: 'テキストボックス',
    value: '',
    required: false
  }
}

const { formFields, saveFormFields } = useFormFields(props.storageKey, initFormFields)

const emit = defineEmits(['custom-confirm'])

const modal = ref()
const validateValues = () => {
  // カスタムイベントを発行
  emit('custom-confirm', formFields.value)
  modal.value.show()
}

// 子コンポーネントから取得したバリデーションの結果
const validatedResults = ref<{ [key: string]: boolean }>({})

// バリデーションがすべてTRUEか
const isValidated = computed<boolean>(() => {
  return Object.values(validatedResults.value).every((value) => value === true)
})

// バリデーション結果を追加する関数
const addValidatedResults = (key: string, result: boolean): void => {
  validatedResults.value[key] = result
}
</script>

<template>
  <div>
    <NContainer1col v-if="storageKey" :gap="4">
      <NInputWrapper :title="formFields['email'].title!" :required="formFields['email'].required">
        <NInputEmail
          :name="formFields['email'].name"
          :required="formFields['email'].required"
          v-model="formFields['email'].value"
          @validated="(result) => addValidatedResults('email', result)"
        ></NInputEmail>
      </NInputWrapper>

      <NInputWrapper :title="formFields['num'].title!" :required="formFields['num'].required">
        <NInputNum
          :name="formFields['num'].name"
          :required="formFields['num'].required"
          v-model="formFields['num'].value"
          @validated="(result) => addValidatedResults('num', result)"
        ></NInputNum>
      </NInputWrapper>

      <NInputWrapper
        :title="formFields['postalCode'].title!"
        :required="formFields['postalCode'].required"
      >
        <NInputPostalCode
          :name="formFields['postalCode'].name"
          :required="formFields['postalCode'].required"
          v-model="formFields['postalCode'].value"
          @validated="(result) => addValidatedResults('postalCode', result)"
        ></NInputPostalCode>
      </NInputWrapper>

      <NInputWrapper :title="formFields['tel'].title!" :required="formFields['tel'].required">
        <NInputTel
          :name="formFields['tel'].name"
          :required="formFields['tel'].required"
          v-model="formFields['tel'].value"
          @validated="(result) => addValidatedResults('tel', result)"
        ></NInputTel>
      </NInputWrapper>

      <NInputWrapper :title="formFields['text'].title!" :required="formFields['text'].required">
        <NInputText
          :name="formFields['text'].name"
          :required="formFields['text'].required"
          v-model="formFields['text'].value"
          @validated="(result) => addValidatedResults('text', result)"
        ></NInputText>
      </NInputWrapper>

      <NInputWrapper :title="formFields['url'].title!" :required="formFields['url'].required">
        <NInputUrl
          :name="formFields['url'].name"
          :required="formFields['url'].required"
          v-model="formFields['url'].value"
          @validated="(result) => addValidatedResults('url', result)"
        ></NInputUrl>
      </NInputWrapper>

      <NInputWrapper :title="formFields['radio'].title!" :required="formFields['radio'].required">
        <NInputsRadio
          :name="formFields['radio'].name"
          :required="formFields['radio'].required"
          values="ひとつ,ふたつ,みっつ"
          v-model="formFields['radio'].value"
          @validated="(result) => addValidatedResults('radio', result)"
        ></NInputsRadio>

        <NInputWrapper
          :title="formFields['textarea'].title!"
          :required="formFields['textarea'].required"
        >
          <NInputTextarea
            :name="formFields['textarea'].name"
            :required="formFields['textarea'].required"
            v-model="formFields['textarea'].value"
            @validated="(result) => addValidatedResults('textarea', result)"
          ></NInputTextarea>
        </NInputWrapper>
      </NInputWrapper>
      <NContainerFlex>
        <NBtn color="primary" :disabled="!isValidated" @click="validateValues">入力内容を確認</NBtn>
        <NBtn color="primary" variant="outlined" @click="saveFormFields">入力内容を一時保存</NBtn>
      </NContainerFlex>
    </NContainer1col>
    <div v-else>
      <p class="text-error">
        ローカルストレージのキーが設定されていないためフォームを表示できません
      </p>
    </div>
    <NModal ref="modal">
      <slot />
    </NModal>
  </div>
</template>

<style>
@import url(../assets/css/main.css);
</style>
