<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useValueList } from '@/composables/useValueList'
import { useSdgs } from '@/utils/useSdgs'
import { useCommaSeparatedValues } from '@/utils/useCommaSeparatedValues'
import NContainer2col from '@/components/NContainer2col.ce.vue'
import NInputCheckbox from '@/components/NInputCheckbox.vue'
import NSdgsIcons from '@/components/NSdgsIcons.vue'
import NSheet from '@/components/NSheet.ce.vue'

import type { FormFieldText } from '@/types/formField'
import type { SdgsNum } from '@/utils/useSdgs'

defineProps<FormFieldText>()

// 親コンポーネントと共有するSDGsの番号
const model = defineModel<string>()

// 配列とカンマ区切り文字列を変換する関数
const { toCommaSeparated, toStringArray } = useCommaSeparatedValues()

// 配列とそれを操作する関数
const { valueList, addValue, removeValue } = useValueList()

const sortValueList = () => {
  valueList.value.sort((a, b) => Number(a) - Number(b))
}

// SDGsの掲載を希望しない場合の値
const notListedValue = '18'
const isNotListed = computed<boolean>(() => {
  return valueList.value.includes(notListedValue)
})
const isListed = computed<boolean>(() => {
  return !isNotListed.value && valueList.value.length > 0
})

watchEffect(() => {
  valueList.value = toStringArray(model.value)
})

// チェックボックスの切り替えで値を操作
const toggleValue = (value: string, event: InputEvent): void => {
  const isChecked = (event.target as HTMLInputElement).checked
  if (isChecked) {
    addValue(value)
  } else {
    removeValue(value)
  }
  sortValueList()
  // 配列の情報をモデルに上書きする
  model.value = toCommaSeparated(valueList.value)
}

// SDGsの情報取得
const { sdgsJa, sdgsNum } = useSdgs()
const values = Object.keys(sdgsJa)
const labels = Object.values(sdgsJa)
</script>

<template>
  <NContainer2col>
    <NInputCheckbox
      v-for="(value, index) in values"
      :key="value"
      :name
      :value
      :checked="valueList.includes(value)"
      :disabled="isNotListed"
      @change="toggleValue(value, $event)"
    >
      {{ sdgsNum[index] }} {{ labels ? labels[index] || value : value }}
    </NInputCheckbox>
    <NInputCheckbox
      :name
      :value="notListedValue"
      :checked="isNotListed"
      :disabled="isListed"
      @change="toggleValue(notListedValue, $event)"
    >
      {{ notListedValue }} 掲載しない（希望しない）
    </NInputCheckbox>
  </NContainer2col>
  <NSheet color="gray">
    <NSdgsIcons v-if="isListed" :numbers="valueList as SdgsNum[]"></NSdgsIcons>
    <p v-else-if="isNotListed">掲載を希望しない</p>
  </NSheet>
</template>
