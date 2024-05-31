<script setup lang="ts"></script>

<template>
  <div class="ly_mainVisual_wrapper">
    <div class="ly_mainVisual">
      <slot />
      <div v-if="links" class="ly_mainVisual_overlap">
        <bl-container-col>
          <el-chip v-for="(link, index) in links" :key="index" :href="link.link" color="info">
            {{ link.title }}
          </el-chip>
        </bl-container-col>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
