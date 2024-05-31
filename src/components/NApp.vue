<script setup lang="ts"></script>

<template>
  <Transition name="fade">
    <ly-wrapper v-show="!loading" class="ly_wrapperConventional">
      <ly-header
        :title="siteTitle"
        :nav="navigation"
        class="ly_headerConventional"
        :class="{ is_headerActive: drawer }"
      ></ly-header>

      <ly-mainVisual :links="navigation.lang">
        <slot name="image" />
      </ly-mainVisual>
      <ly-global-nav :nav="navigation.header" offSP> </ly-global-nav>
      <ly-main class="ly_mainConventional">
        <ly-body>
          <slot />
        </ly-body>
      </ly-main>
      <ly-footer :nav="navigation.footer" class="hp_textCenter">{{ copyright }}</ly-footer>
      <ly-tool :active="drawer" class="ly_toolConventional" @click="operateDrawer()"></ly-tool>
    </ly-wrapper>
  </Transition>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
