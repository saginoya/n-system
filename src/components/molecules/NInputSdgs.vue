<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useValueList } from '@/composables/useValueList'
import { useSDGs } from '@/utils/useSDGs'
import { useConvertType } from '@/utils/useConvertType'
import NContainer2col from '@/components/atoms/NContainer2col.ce.vue'
import NInputCheckbox from '@/components/atoms/NInputCheckbox.vue'
import NSdgsIcons from '@/components/molecules/NSDGsIcons.vue'
import NSheet from '@/components/atoms/NSheet.ce.vue'

import type { FormFieldText } from '@/types/formField'
import type { SDGsNumType } from '@/utils/useSDGs'

defineProps<FormFieldText>()

// 親コンポーネントと共有するSDGsの番号
const model = defineModel<string>()
const valueList = ref<string[]>([])

// 配列とカンマ区切り文字列を変換する関数
const { convertArrayToCommaSeparated, convertCommaSeparatedToArray } = useConvertType()

// 配列とそれを操作する関数
const { addValue, removeValue } = useValueList(valueList)

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
  valueList.value = convertCommaSeparatedToArray(model.value)
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
  model.value = convertArrayToCommaSeparated(valueList.value)
}

// SDGsの情報取得
const { SDGsJa, SDGsNum } = useSDGs()
const values = Object.keys(SDGsJa)
const labels = Object.values(SDGsJa)
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
      {{ SDGsNum[index] }} {{ labels ? labels[index] || value : value }}
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
    <NSdgsIcons v-if="isListed" :numbers="valueList as SDGsNumType[]"></NSdgsIcons>
    <p v-else-if="isNotListed">掲載を希望しない</p>
  </NSheet>
</template>
