<script setup lang="ts">
import { useValueList } from '@/composables/useValueList'
import { useSdgs } from '@/utils/useSdgs'
import { useCommaSeparatedValues } from '@/utils/useCommaSeparatedValues'
import type { FormFieldText } from '@/types/formField'
import NInputText from '@/components/NInputText.vue'
import NInputCheckbox from '@/components/NInputCheckbox.vue'
import NContainer2col from '@/components/NContainer2col.ce.vue'

defineProps<FormFieldText>()

// 親コンポーネントと共有するSDGsの番号
const model = defineModel<string>()

// 配列とカンマ区切り文字列を変換する関数
const { toCommaSeparated, toStringArray } = useCommaSeparatedValues()

// 配列とそれを操作する関数
const { valueList, addValue, removeValue } = useValueList(['1', '2'])

// チェックボックスの切り替えで値を操作
const toggleValue = (value: string, event: InputEvent): void => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    addValue(value)
  } else {
    removeValue(value)
  }
  // 配列の情報をモデルに上書きする
  model.value = toCommaSeparated(valueList.value)
}

// SDGsの情報取得
const { sdgsJa } = useSdgs()
const values = Object.keys(sdgsJa)
const labels = Object.values(sdgsJa)
</script>

<template>
  <NInputText type="text" :name v-model="model"></NInputText>
  <p>{{ valueList }}</p>
  <NContainer2col>
    <NInputCheckbox
      v-for="(value, index) in values"
      :key="value"
      :name
      :value
      :checked="valueList.includes(value)"
      @change="toggleValue(value, $event)"
    >
      {{ labels ? labels[index] || value : value }}
    </NInputCheckbox>
  </NContainer2col>
</template>
