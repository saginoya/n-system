import IconSdgsEn01 from '@/components/icons/IconSdgsEn01.vue'
import IconSdgsEn02 from '@/components/icons/IconSdgsEn02.vue'
import IconSdgsEn03 from '@/components/icons/IconSdgsEn03.vue'
import IconSdgsEn04 from '@/components/icons/IconSdgsEn04.vue'
import IconSdgsEn05 from '@/components/icons/IconSdgsEn05.vue'
import IconSdgsEn06 from '@/components/icons/IconSdgsEn06.vue'
import IconSdgsEn07 from '@/components/icons/IconSdgsEn07.vue'
import IconSdgsEn08 from '@/components/icons/IconSdgsEn08.vue'
import IconSdgsEn09 from '@/components/icons/IconSdgsEn09.vue'
import IconSdgsEn10 from '@/components/icons/IconSdgsEn10.vue'
import IconSdgsEn11 from '@/components/icons/IconSdgsEn11.vue'
import IconSdgsEn12 from '@/components/icons/IconSdgsEn12.vue'
import IconSdgsEn13 from '@/components/icons/IconSdgsEn13.vue'
import IconSdgsEn14 from '@/components/icons/IconSdgsEn14.vue'
import IconSdgsEn15 from '@/components/icons/IconSdgsEn15.vue'
import IconSdgsEn16 from '@/components/icons/IconSdgsEn16.vue'
import IconSdgsEn17 from '@/components/icons/IconSdgsEn17.vue'

import IconSdgsJa01 from '@/components/icons/IconSdgsJa01.vue'
import IconSdgsJa02 from '@/components/icons/IconSdgsJa02.vue'
import IconSdgsJa03 from '@/components/icons/IconSdgsJa03.vue'
import IconSdgsJa04 from '@/components/icons/IconSdgsJa04.vue'
import IconSdgsJa05 from '@/components/icons/IconSdgsJa05.vue'
import IconSdgsJa06 from '@/components/icons/IconSdgsJa06.vue'
import IconSdgsJa07 from '@/components/icons/IconSdgsJa07.vue'
import IconSdgsJa08 from '@/components/icons/IconSdgsJa08.vue'
import IconSdgsJa09 from '@/components/icons/IconSdgsJa09.vue'
import IconSdgsJa10 from '@/components/icons/IconSdgsJa10.vue'
import IconSdgsJa11 from '@/components/icons/IconSdgsJa11.vue'
import IconSdgsJa12 from '@/components/icons/IconSdgsJa12.vue'
import IconSdgsJa13 from '@/components/icons/IconSdgsJa13.vue'
import IconSdgsJa14 from '@/components/icons/IconSdgsJa14.vue'
import IconSdgsJa15 from '@/components/icons/IconSdgsJa15.vue'
import IconSdgsJa16 from '@/components/icons/IconSdgsJa16.vue'
import IconSdgsJa17 from '@/components/icons/IconSdgsJa17.vue'

import type { Component } from 'vue'

export type SdgsNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17
type SdgsObj = Record<SdgsNum, string>
type SdgsCompObj = Record<SdgsNum, Component>
type GetSdgs = {
  ja: string
  en: string
  iconJa: Component
  iconEn: Component
}

export const useSdgs = () => {
  const sdgsNum: SdgsNum[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  const sdgsJa: SdgsObj = {
    1: '貧困をなくそう',
    2: '飢餓をゼロに',
    3: 'すべての人に健康と福祉を',
    4: '質の高い教育をみんなに',
    5: 'ジェンダー平等を実現しよう',
    6: '安全な水とトイレを世界中に',
    7: 'エネルギーをみんなにそしてクリーンに',
    8: '働きがいも経済成長も',
    9: '産業と技術革新の基盤をつくろう',
    10: '人や国の不平等をなくそう',
    11: '住み続けられるまちづくりを',
    12: 'つくる責任つかう責任',
    13: '気候変動に具体的な対策を',
    14: '海の豊かさを守ろう',
    15: '陸の豊かさも守ろう',
    16: '平和と公正をすべての人に',
    17: 'パートナーシップで目標を達成しよう'
  }
  const sdgsEn: SdgsObj = {
    1: 'No Poverty',
    2: 'Zero Hunger',
    3: 'Good Health and Well-Being',
    4: 'Quality Education',
    5: 'Gender Equality',
    6: 'Clean Water and Sanitation',
    7: 'Affordable and Clean Energy',
    8: 'Decent Work and Economic Growth',
    9: 'Industry, Innovation and Infrastructure',
    10: 'Reduced Inequalities',
    11: 'Sustainable Cities and Communities',
    12: 'Responsible Consumption and Production',
    13: 'Climate Action',
    14: 'Life Below Water',
    15: 'Life On Land',
    16: 'Peace, Justice and Strong Institutions',
    17: 'Partnerships for the Goals'
  }

  const sdgsJaImg: SdgsCompObj = {
    1: IconSdgsJa01,
    2: IconSdgsJa02,
    3: IconSdgsJa03,
    4: IconSdgsJa04,
    5: IconSdgsJa05,
    6: IconSdgsJa06,
    7: IconSdgsJa07,
    8: IconSdgsJa08,
    9: IconSdgsJa09,
    10: IconSdgsJa10,
    11: IconSdgsJa11,
    12: IconSdgsJa12,
    13: IconSdgsJa13,
    14: IconSdgsJa14,
    15: IconSdgsJa15,
    16: IconSdgsJa16,
    17: IconSdgsJa17
  }

  const sdgsEnImg: SdgsCompObj = {
    1: IconSdgsEn01,
    2: IconSdgsEn02,
    3: IconSdgsEn03,
    4: IconSdgsEn04,
    5: IconSdgsEn05,
    6: IconSdgsEn06,
    7: IconSdgsEn07,
    8: IconSdgsEn08,
    9: IconSdgsEn09,
    10: IconSdgsEn10,
    11: IconSdgsEn11,
    12: IconSdgsEn12,
    13: IconSdgsEn13,
    14: IconSdgsEn14,
    15: IconSdgsEn15,
    16: IconSdgsEn16,
    17: IconSdgsEn17
  }

  const getSdgs = (num: SdgsNum): GetSdgs => {
    return {
      ja: sdgsJa[num],
      en: sdgsEn[num],
      iconJa: sdgsJaImg[num],
      iconEn: sdgsEnImg[num]
    }
  }

  return {
    sdgsNum,
    sdgsJa,
    sdgsEn,
    sdgsJaImg,
    sdgsEnImg,
    getSdgs
  }
}
