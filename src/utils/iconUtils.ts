import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import IconBookmark from '@/components/icons/IconBookmark.vue'
import IconBus from '@/components/icons/IconBus.vue'
import IconCall from '@/components/icons/IconCall.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconCheckCircle from '@/components/icons/IconCheckCircle.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconDisabledByDefault from '@/components/icons/IconDisabledByDefault.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import IconFax from '@/components/icons/IconFax.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconOpenInNew from '@/components/icons/IconOpenInNew.vue'
import IconPdf from '@/components/icons/IconPdf.vue'
import IconProgressActivity from '@/components/icons/IconProgressActivity.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconTrain from '@/components/icons/IconTrain.vue'
import IconWarning from '@/components/icons/IconWarning.vue'

export const iconMap = {
  'arrow-down': IconArrowDown,
  'arrow-right': IconArrowRight,
  'arrow-up': IconArrowUp,
  bookmark: IconBookmark,
  bus: IconBus,
  call: IconCall,
  car: IconCar,
  'check-circle': IconCheckCircle,
  'chevron-right': IconChevronRight,
  clock: IconClock,
  close: IconClose,
  'disabled-by-default': IconDisabledByDefault,
  download: IconDownload,
  fax: IconFax,
  info: IconInfo,
  mail: IconMail,
  menu: IconMenu,
  'open-in-new': IconOpenInNew,
  pdf: IconPdf,
  'progress-activity': IconProgressActivity,
  search: IconSearch,
  train: IconTrain,
  warning: IconWarning,
} as const

export type Icon = keyof typeof iconMap
