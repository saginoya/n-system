import IconSDGsEn01 from '@/components/icons/SDGs/IconSDGsEn01.vue'
import IconSDGsEn02 from '@/components/icons/SDGs/IconSDGsEn02.vue'
import IconSDGsEn03 from '@/components/icons/SDGs/IconSDGsEn03.vue'
import IconSDGsEn04 from '@/components/icons/SDGs/IconSDGsEn04.vue'
import IconSDGsEn05 from '@/components/icons/SDGs/IconSDGsEn05.vue'
import IconSDGsEn06 from '@/components/icons/SDGs/IconSDGsEn06.vue'
import IconSDGsEn07 from '@/components/icons/SDGs/IconSDGsEn07.vue'
import IconSDGsEn08 from '@/components/icons/SDGs/IconSDGsEn08.vue'
import IconSDGsEn09 from '@/components/icons/SDGs/IconSDGsEn09.vue'
import IconSDGsEn10 from '@/components/icons/SDGs/IconSDGsEn10.vue'
import IconSDGsEn11 from '@/components/icons/SDGs/IconSDGsEn11.vue'
import IconSDGsEn12 from '@/components/icons/SDGs/IconSDGsEn12.vue'
import IconSDGsEn13 from '@/components/icons/SDGs/IconSDGsEn13.vue'
import IconSDGsEn14 from '@/components/icons/SDGs/IconSDGsEn14.vue'
import IconSDGsEn15 from '@/components/icons/SDGs/IconSDGsEn15.vue'
import IconSDGsEn16 from '@/components/icons/SDGs/IconSDGsEn16.vue'
import IconSDGsEn17 from '@/components/icons/SDGs/IconSDGsEn17.vue'
import IconSDGsJa01 from '@/components/icons/SDGs/IconSDGsJa01.vue'
import IconSDGsJa02 from '@/components/icons/SDGs/IconSDGsJa02.vue'
import IconSDGsJa03 from '@/components/icons/SDGs/IconSDGsJa03.vue'
import IconSDGsJa04 from '@/components/icons/SDGs/IconSDGsJa04.vue'
import IconSDGsJa05 from '@/components/icons/SDGs/IconSDGsJa05.vue'
import IconSDGsJa06 from '@/components/icons/SDGs/IconSDGsJa06.vue'
import IconSDGsJa07 from '@/components/icons/SDGs/IconSDGsJa07.vue'
import IconSDGsJa08 from '@/components/icons/SDGs/IconSDGsJa08.vue'
import IconSDGsJa09 from '@/components/icons/SDGs/IconSDGsJa09.vue'
import IconSDGsJa10 from '@/components/icons/SDGs/IconSDGsJa10.vue'
import IconSDGsJa11 from '@/components/icons/SDGs/IconSDGsJa11.vue'
import IconSDGsJa12 from '@/components/icons/SDGs/IconSDGsJa12.vue'
import IconSDGsJa13 from '@/components/icons/SDGs/IconSDGsJa13.vue'
import IconSDGsJa14 from '@/components/icons/SDGs/IconSDGsJa14.vue'
import IconSDGsJa15 from '@/components/icons/SDGs/IconSDGsJa15.vue'
import IconSDGsJa16 from '@/components/icons/SDGs/IconSDGsJa16.vue'
import IconSDGsJa17 from '@/components/icons/SDGs/IconSDGsJa17.vue'

import type { Component } from 'vue'

export type SDGsNumType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
type SDGsObj = Record<SDGsNumType, string>
type SDGsCompObj = Record<SDGsNumType, Component>

export const SDGsNumList: SDGsNumType[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
]

export const SDGsJaMap: SDGsObj = {
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
  17: 'パートナーシップで目標を達成しよう',
}

export const SDGsEnMap: SDGsObj = {
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
  17: 'Partnerships for the Goals',
}

export const SDGsJaImgMap: SDGsCompObj = {
  1: IconSDGsJa01,
  2: IconSDGsJa02,
  3: IconSDGsJa03,
  4: IconSDGsJa04,
  5: IconSDGsJa05,
  6: IconSDGsJa06,
  7: IconSDGsJa07,
  8: IconSDGsJa08,
  9: IconSDGsJa09,
  10: IconSDGsJa10,
  11: IconSDGsJa11,
  12: IconSDGsJa12,
  13: IconSDGsJa13,
  14: IconSDGsJa14,
  15: IconSDGsJa15,
  16: IconSDGsJa16,
  17: IconSDGsJa17,
}

export const SDGsEnImgMap: SDGsCompObj = {
  1: IconSDGsEn01,
  2: IconSDGsEn02,
  3: IconSDGsEn03,
  4: IconSDGsEn04,
  5: IconSDGsEn05,
  6: IconSDGsEn06,
  7: IconSDGsEn07,
  8: IconSDGsEn08,
  9: IconSDGsEn09,
  10: IconSDGsEn10,
  11: IconSDGsEn11,
  12: IconSDGsEn12,
  13: IconSDGsEn13,
  14: IconSDGsEn14,
  15: IconSDGsEn15,
  16: IconSDGsEn16,
  17: IconSDGsEn17,
}
