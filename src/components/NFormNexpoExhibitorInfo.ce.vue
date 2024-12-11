<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFormFields } from '@/composables/useFormFields'
import { useValidatedResults } from '@/composables/useValidatedResults'

import NContainer1col from '@/components/NContainer1col.ce.vue'
import NBtn from '@/components/NBtn.ce.vue'
import NContainerFlex from '@/components/NContainerFlex.ce.vue'
import NGroupInput from '@/components/NGroupInput.vue'
import NModal from '@/components/NModal.ce.vue'

import type { FormFields } from '@/types/formField'

const props = defineProps<{
  storageKey: string
}>()

const emits = defineEmits(['n-form-confirm'])

const initFormFields: FormFields = {
  email: {
    type: 'email',
    name: 'email',
    title: 'メールアドレス',
    value: '',
    required: true
  },
  name: {
    type: 'text',
    name: 'name',
    title: '記入者名',
    value: '',
    required: true,
    placeholder: '日報 太郎'
  },
  url: {
    type: 'url',
    name: 'url',
    title: 'WEBサイト',
    value: '',
    required: false
  },
  koma: {
    type: 'text',
    name: 'koma',
    title: '小間番号',
    value: '',
    required: false,
    placeholder: 'A101'
  },
  organization: {
    type: 'text',
    name: 'organization',
    title: '会社名',
    value: '',
    required: true,
    placeholder: '日報ビジネス 株式会社'
  },
  kana: {
    type: 'text',
    name: 'kana',
    title: '社名フリガナ',
    value: '',
    required: true,
    placeholder: 'ニッポウビジネス'
  },
  address: {
    type: 'text',
    name: 'address',
    title: '問い合わせ先となる都道府県名',
    value: '',
    required: true,
    placeholder: '東京都 ・ アメリカ',
    autocomplete: 'address-level1'
  },
  tel: {
    type: 'tel',
    name: 'tel',
    title: 'TEL',
    value: '',
    required: true
  },
  exhibits: {
    type: 'textarea',
    name: 'exhibits',
    title: '出展内容',
    value: '',
    required: true,
    maxlength: 100
  },
  cat1: {
    type: 'text',
    name: 'cat1',
    title: 'カテゴリー1',
    value: '',
    required: false
  },
  cat2: {
    type: 'text',
    name: 'cat2',
    title: 'カテゴリー2',
    value: '',
    required: false
  },
  cat3: {
    type: 'text',
    name: 'cat3',
    title: 'カテゴリー3',
    value: '',
    required: false
  },
  sdgs: {
    type: 'sdgs',
    name: 'sdgs',
    title: 'SDGs',
    value: '',
    required: true
  },
  en_organization: {
    type: 'text',
    name: 'en_organization',
    title: '英文会社名',
    value: '',
    required: true
  },
  en_organization2: {
    type: 'text',
    name: 'en_organization2',
    title: '英文会社名2',
    value: '',
    required: false
  },
  en_address: {
    type: 'text',
    name: 'en_address',
    title: '英文の問い合わせ先となる国名・地域名',
    value: '',
    required: true
  },
  en_tel: {
    type: 'text',
    name: 'en_tel',
    title: '英文TEL',
    value: '+',
    required: true,
    pattern: '^\\+(\\d{1,3})(-?\\d{1,14})*$',
    placeholder: '+81-3-3262-3562'
  },
  en_exhibits: {
    type: 'textarea',
    name: 'en_exhibits',
    title: '英文出展内容',
    value: '',
    required: false,
    maxlength: 100
  }
}

const { formFields, saveFormFields, loadFormFields } = useFormFields(
  props.storageKey,
  initFormFields
)
const { addValidatedResults, isValidated } = useValidatedResults()

// モーダルウィンドウのコンポーネント取得
const modal = ref()

// 確認実行
const confirm = () => {
  saveFormFields()
  modal.value.show()
  emits('n-form-confirm')
}

onMounted(() => {
  // ローカルストレージの内容を読み込む
  loadFormFields()
})
</script>

<template>
  <div>
    <NContainer1col v-if="storageKey" :gap="4">
      <NGroupInput
        v-for="formField in formFields"
        :key="formField.name"
        :form-field="formField"
        v-model="formField.value"
        @validated="(result) => addValidatedResults(formField.name, result)"
      ></NGroupInput>
      <NContainerFlex>
        <NBtn color="primary" :disabled="!isValidated" @click="confirm">入力内容を確認</NBtn>
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
