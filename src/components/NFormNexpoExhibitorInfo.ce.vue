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
    title: 'E-mail',
    value: '',
    required: true
  },
  num: {
    type: 'number',
    name: 'num',
    title: '数字',
    value: '',
    required: true
  },
  postalCode: {
    type: 'postal-code',
    name: 'postal-code',
    title: '郵便番号',
    value: '',
    required: true
  },
  tel: {
    type: 'tel',
    name: 'tel',
    title: 'TEL',
    value: '',
    required: true
  },
  text: {
    type: 'text',
    name: 'text',
    title: 'テキスト',
    value: '',
    required: false
  },
  url: {
    type: 'url',
    name: 'url',
    title: 'URL',
    value: '',
    required: false
  },
  radio: {
    type: 'radio',
    name: 'radio',
    title: 'ラジオボタン',
    value: '',
    required: true,
    values: 'いち,に,さん'
  },
  textarea: {
    type: 'textarea',
    name: 'textarea',
    title: 'テキストボックス',
    value: '',
    required: false
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
