<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useFormFields } from '@/composables/useFormFields'
import { useValidatedResults } from '@/composables/useValidatedResults'

import NTitleLv3 from '@/components/atoms/NTitleLv3.ce.vue'
import NContainer1col from '@/components/atoms/NContainer1col.ce.vue'
import NBtn from '@/components/atoms/NBtn.ce.vue'
import NContainerFlex from '@/components/atoms/NContainerFlex.ce.vue'
import NGroupInput from '@/components/molecules/NGroupInput.vue'
import NGroupInputMultiSelect from '@/components/molecules/NGroupInputMultiSelect.vue'
import NModal from '@/components/molecules/NModal.ce.vue'

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
  cat1Num: {
    type: 'text',
    name: 'cat1-num',
    title: 'カテゴリー1番号',
    value: '',
    required: false
  },
  cat1: {
    type: 'text',
    name: 'cat1',
    title: 'カテゴリー1',
    value: '',
    required: false
  },
  en_cat1: {
    type: 'text',
    name: 'en_cat1',
    title: 'カテゴリー1英語',
    value: '',
    required: false
  },
  cat2Num: {
    type: 'text',
    name: 'cat2-num',
    title: 'カテゴリー2番号',
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
  en_cat2: {
    type: 'text',
    name: 'en_cat2',
    title: 'カテゴリー2英語',
    value: '',
    required: false
  },
  cat3Num: {
    type: 'text',
    name: 'cat3-num',
    title: 'カテゴリー3番号',
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
  en_cat3: {
    type: 'text',
    name: 'en_cat3',
    title: 'カテゴリー3英語',
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
  en_exhibitsMethods: {
    type: 'radio',
    name: 'en_exhibitsMethods',
    title: '英文出展内容入力方法',
    value: '',
    values: [
      '(1) 英文出展内容は掲載しない',
      '(2) 入力内容を掲載',
      '(3) 選択した業種の英文を掲載する'
    ],
    required: true
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

const { formFields, saveFormFields, loadFormFields, updateFormFieldValue } = useFormFields(
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

const catModel = ref<string[]>([])
const updateCatModel = () => {
  updateFormFieldValue('cat1', catModel.value[0])
  updateFormFieldValue('cat2', catModel.value[1])
  updateFormFieldValue('cat3', catModel.value[2])
}
const setCatModel = () => {
  const catKeys = ['cat1', 'cat2', 'cat3']
  let resultList = []
  for (const key of catKeys) {
    if (formFields.value[key] && formFields.value[key].value) {
      resultList.push(formFields.value[key].value)
    }
  }
  catModel.value = resultList
}
watch(formFields.value, () => {
  setCatModel()
})

onMounted(() => {
  // ローカルストレージの内容を読み込む
  loadFormFields()
})
</script>

<template>
  <div>
    <NContainer1col v-if="storageKey" :gap="4">
      <NGroupInputMultiSelect
        name="categories"
        :options="[{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }, { value: 'ddd' }]"
        title="カテゴリー"
        required
        :maxlength="3"
        v-model="catModel"
        @change="updateCatModel"
      ></NGroupInputMultiSelect>
      <p>1 {{ formFields['cat1'].value }}</p>
      <p>2 {{ formFields['cat2'].value }}</p>
      <p>3 {{ formFields['cat3'].value }}</p>
      <NGroupInput
        :form-field="formFields['email']"
        v-model="formFields['email'].value"
        @validated="(result) => addValidatedResults(formFields['email'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['name']"
        v-model="formFields['name'].value"
        @validated="(result) => addValidatedResults(formFields['name'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['url']"
        v-model="formFields['url'].value"
        @validated="(result) => addValidatedResults(formFields['url'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['koma']"
        v-model="formFields['koma'].value"
        @validated="(result) => addValidatedResults(formFields['koma'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['organization']"
        v-model="formFields['organization'].value"
        @validated="(result) => addValidatedResults(formFields['organization'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['kana']"
        v-model="formFields['kana'].value"
        @validated="(result) => addValidatedResults(formFields['kana'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['address']"
        v-model="formFields['address'].value"
        @validated="(result) => addValidatedResults(formFields['address'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['tel']"
        v-model="formFields['tel'].value"
        @validated="(result) => addValidatedResults(formFields['tel'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['exhibits']"
        v-model="formFields['exhibits'].value"
        @validated="(result) => addValidatedResults(formFields['exhibits'].name, result)"
      ></NGroupInput>

      <NGroupInput
        :form-field="formFields['sdgs']"
        v-model="formFields['sdgs'].value"
        @validated="(result) => addValidatedResults(formFields['sdgs'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['en_organization']"
        v-model="formFields['en_organization'].value"
        @validated="(result) => addValidatedResults(formFields['en_organization'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['en_organization2']"
        v-model="formFields['en_organization2'].value"
        @validated="(result) => addValidatedResults(formFields['en_organization2'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['en_address']"
        v-model="formFields['en_address'].value"
        @validated="(result) => addValidatedResults(formFields['en_address'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['en_tel']"
        v-model="formFields['en_tel'].value"
        @validated="(result) => addValidatedResults(formFields['en_tel'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['en_exhibitsMethods']"
        v-model="formFields['en_exhibitsMethods'].value"
        @validated="(result) => addValidatedResults(formFields['en_exhibitsMethods'].name, result)"
      ></NGroupInput>
      <NGroupInput
        :form-field="formFields['en_exhibits']"
        v-model="formFields['en_exhibits'].value"
        @validated="(result) => addValidatedResults(formFields['en_exhibits'].name, result)"
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
      <slot>
        <NTitleLv3>確認画面</NTitleLv3>
        <form>
          <NContainer1col>
            <div v-for="field in formFields" :key="field.name">
              <p>{{ field.title }}</p>
              <input type="text" :name="field.name" :value="field.value" readonly />
            </div>
          </NContainer1col>
        </form>
      </slot>
    </NModal>
  </div>
</template>
