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

export type SdgsNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17

export const useSdgs = () => {
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
    IconSdgsJa01,
    IconSdgsJa02,
    IconSdgsJa03,
    IconSdgsJa04,
    IconSdgsJa05,
    IconSdgsJa06,
    IconSdgsJa07,
    IconSdgsJa08,
    IconSdgsJa09,
    IconSdgsJa10,
    IconSdgsJa11,
    IconSdgsJa12,
    IconSdgsJa13,
    IconSdgsJa14,
    IconSdgsJa15,
    IconSdgsJa16,
    IconSdgsJa17
  ]
  const sdgsEnImg = [
    '-',
    IconSdgsEn01,
    IconSdgsEn02,
    IconSdgsEn03,
    IconSdgsEn04,
    IconSdgsEn05,
    IconSdgsEn06,
    IconSdgsEn07,
    IconSdgsEn08,
    IconSdgsEn09,
    IconSdgsEn10,
    IconSdgsEn11,
    IconSdgsEn12,
    IconSdgsEn13,
    IconSdgsEn14,
    IconSdgsEn15,
    IconSdgsEn16,
    IconSdgsEn17
  ]

  const getSdgs = (num: SdgsNum) => {
    return {
      ja: sdgsJa[num],
      en: sdgsEn[num],
      iconJa: sdgsJaImg[num],
      iconEn: sdgsEnImg[num]
    }
  }

  return {
    sdgsJa,
    sdgsEn,
    sdgsJaImg,
    sdgsEnImg,
    getSdgs
  }
}
