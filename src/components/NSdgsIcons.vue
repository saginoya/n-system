<script setup lang="ts">
import NContainerFlex from '@/components/NContainerFlex.ce.vue'
import NImage from '@/components/NImage.ce.vue'
import { useLang } from '@/composables/useLang'

defineProps<{
  numbers: number[]
}>()

import IconJa01 from '@/assets/images/icons/sdg_icon_01.png'
import IconJa02 from '@/assets/images/icons/sdg_icon_02.png'
import IconJa03 from '@/assets/images/icons/sdg_icon_03.png'
import IconJa04 from '@/assets/images/icons/sdg_icon_04.png'
import IconJa05 from '@/assets/images/icons/sdg_icon_05.png'
import IconJa06 from '@/assets/images/icons/sdg_icon_06.png'
import IconJa07 from '@/assets/images/icons/sdg_icon_07.png'
import IconJa08 from '@/assets/images/icons/sdg_icon_08.png'
import IconJa09 from '@/assets/images/icons/sdg_icon_09.png'
import IconJa10 from '@/assets/images/icons/sdg_icon_10.png'
import IconJa11 from '@/assets/images/icons/sdg_icon_11.png'
import IconJa12 from '@/assets/images/icons/sdg_icon_12.png'
import IconJa13 from '@/assets/images/icons/sdg_icon_13.png'
import IconJa14 from '@/assets/images/icons/sdg_icon_14.png'
import IconJa15 from '@/assets/images/icons/sdg_icon_15.png'
import IconJa16 from '@/assets/images/icons/sdg_icon_16.png'
import IconJa17 from '@/assets/images/icons/sdg_icon_17.png'

import IconEn01 from '@/assets/images/icons/sdg_eng_icon_01.png'
import IconEn02 from '@/assets/images/icons/sdg_eng_icon_02.png'
import IconEn03 from '@/assets/images/icons/sdg_eng_icon_03.png'
import IconEn04 from '@/assets/images/icons/sdg_eng_icon_04.png'
import IconEn05 from '@/assets/images/icons/sdg_eng_icon_05.png'
import IconEn06 from '@/assets/images/icons/sdg_eng_icon_06.png'
import IconEn07 from '@/assets/images/icons/sdg_eng_icon_07.png'
import IconEn08 from '@/assets/images/icons/sdg_eng_icon_08.png'
import IconEn09 from '@/assets/images/icons/sdg_eng_icon_09.png'
import IconEn10 from '@/assets/images/icons/sdg_eng_icon_10.png'
import IconEn11 from '@/assets/images/icons/sdg_eng_icon_11.png'
import IconEn12 from '@/assets/images/icons/sdg_eng_icon_12.png'
import IconEn13 from '@/assets/images/icons/sdg_eng_icon_13.png'
import IconEn14 from '@/assets/images/icons/sdg_eng_icon_14.png'
import IconEn15 from '@/assets/images/icons/sdg_eng_icon_15.png'
import IconEn16 from '@/assets/images/icons/sdg_eng_icon_16.png'
import IconEn17 from '@/assets/images/icons/sdg_eng_icon_17.png'

const { lang } = useLang()

const sdgsJa = [
  '-',
  '貧困をなくそう',
  '飢餓をゼロに',
  'すべての人に健康と福祉を',
  '質の高い教育をみんなに',
  'ジェンダー平等を実現しよう',
  '安全な水とトイレを世界中に',
  'エネルギーをみんなにそしてクリーンに',
  '働きがいも経済成長も',
  '産業と技術革新の基盤をつくろう',
  '人や国の不平等をなくそう',
  '住み続けられるまちづくりを',
  'つくる責任つかう責任',
  '気候変動に具体的な対策を',
  '海の豊かさを守ろう',
  '陸の豊かさも守ろう',
  '平和と公正をすべての人に',
  'パートナーシップで目標を達成しよう'
]
const sdgsEn = [
  '-',
  'No Poverty',
  'Zero Hunger',
  'Good Health and Well-Being',
  'Quality Education',
  'Gender Equality',
  'Clean Water and Sanitation',
  'Affordable and Clean Energy',
  'Decent Work and Economic Growth',
  'Industry, Innovation and Infrastructure',
  'Reduced Inequalities',
  'Sustainable Cities and Communities',
  'Responsible Consumption and Production',
  'Climate Action',
  'Life Below Water',
  'Life On Land',
  'Peace, Justice and Strong Institutions',
  'Partnerships for the Goals'
]
const sdgsJaImg = [
  '-',
  IconJa01,
  IconJa02,
  IconJa03,
  IconJa04,
  IconJa05,
  IconJa06,
  IconJa07,
  IconJa08,
  IconJa09,
  IconJa10,
  IconJa11,
  IconJa12,
  IconJa13,
  IconJa14,
  IconJa15,
  IconJa16,
  IconJa17
]
const sdgsEnImg = [
  '-',
  IconEn01,
  IconEn02,
  IconEn03,
  IconEn04,
  IconEn05,
  IconEn06,
  IconEn07,
  IconEn08,
  IconEn09,
  IconEn10,
  IconEn11,
  IconEn12,
  IconEn13,
  IconEn14,
  IconEn15,
  IconEn16,
  IconEn17
]
</script>

<template>
  <NContainerFlex>
    <NImage
      v-for="n in numbers"
      :key="n"
      :width="80"
      :height="80"
      :src="lang === 'ja' ? sdgsJaImg[n] : sdgsEnImg[n]"
      :alt="lang === 'ja' ? sdgsJa[n] : sdgsEn[n]"
      :title="lang === 'ja' ? sdgsJa[n] : sdgsEn[n]"
    ></NImage>
  </NContainerFlex>
</template>
