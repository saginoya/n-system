<script setup lang="ts">
import { computed } from 'vue'

import IconCall from '@/components/icons/IconCall.vue'
import IconFax from '@/components/icons/IconFax.vue'
import IconMail from '@/components/icons/IconMail.vue'
import NContainer1col from '@/components/n-elements/NContainer1col.ce.vue'
import NContainerFlex from '@/components/n-elements/NContainerFlex.ce.vue'
import NContainerGrid from '@/components/n-elements/NContainerGrid.ce.vue'
import NImage from '@/components/n-elements/NImage.ce.vue'
import NImageBanner from '@/components/n-elements/NImageBanner.ce.vue'
import { useRouter } from '@/composables/useRouter'

withDefaults(
  defineProps<{
    email?: string
    facebook?: string
    line?: string
    tokyoTel?: string
    tokyoFax?: string | undefined
    osakaTel?: string
    osakaFax?: string | undefined
  }>(),
  {
    email: 'n-expo2@nippo-biz.co.jp',
    facebook: 'https://www.facebook.com/nippo.biz/',
    line: 'https://page.line.me/xsm9203w?openQrModal=true',
    tokyoTel: '03(3262)3562',
    tokyoFax: '03(5214)6633',
    osakaTel: '06(6265)9106',
    osakaFax: '06(6265)9105',
  },
)

const snsLogoSize = 45

const { getById } = useRouter()

const logoNippo = computed(() => getById('logo-nippo'))
const logoFacebook = computed(() => getById('logo-facebook'))
const logoLine = computed(() => getById('logo-line'))
</script>

<template>
  <address class="not-italic">
    <!-- <NTitle>主催会社・お問い合わせ先</NTitle> -->
    <NImage
      v-if="logoNippo"
      :src="logoNippo.path"
      :width="280"
      :height="34"
      alt="日報ビジネス株式会社"
      class="my-2"
    ></NImage>
    <NContainerGrid cols="3">
      <NContainer1col>
        <NContainerFlex gap="0.5"><IconMail />Email {{ email }}</NContainerFlex>
        <NContainerFlex>
          <NImageBanner
            v-if="facebook && logoFacebook"
            :src="logoFacebook.path"
            :width="snsLogoSize"
            :height="snsLogoSize"
            :href="facebook"
            type="external"
            alt="Facebook"
          ></NImageBanner>
          <NImageBanner
            v-if="line && logoLine"
            :src="logoLine.path"
            :width="snsLogoSize"
            :height="snsLogoSize"
            alt="LINE"
            :href="line"
            type="external"
          ></NImageBanner>
        </NContainerFlex>
      </NContainer1col>
      <div>
        <p class="text-xl font-bold">東京</p>
        <NContainerFlex gap="0.5">
          <span>〒101-0061</span>
          <span>東京都千代田区神田三崎町3-1-5</span>
          <span>神田三崎町ビル</span>
        </NContainerFlex>
        <NContainerFlex>
          <NContainerFlex gap="0.5"><IconCall />Tel {{ tokyoTel }}</NContainerFlex>
          <NContainerFlex gap="0.5" v-if="tokyoFax"><IconFax />Fax {{ tokyoFax }}</NContainerFlex>
        </NContainerFlex>
      </div>
      <div>
        <p class="text-xl font-bold">大阪</p>
        <NContainerFlex gap="0.5">
          <span>〒541-0054</span>
          <span>大阪市中央区南本町1-8-14</span>
          <span>JRE堺筋本町ビル2階</span>
        </NContainerFlex>
        <NContainerFlex>
          <NContainerFlex gap="0.5"><IconCall />Tel {{ osakaTel }}</NContainerFlex>
          <NContainerFlex gap="0.5" v-if="osakaFax"><IconFax />Fax {{ osakaFax }}</NContainerFlex>
        </NContainerFlex>
      </div>
    </NContainerGrid>
  </address>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
