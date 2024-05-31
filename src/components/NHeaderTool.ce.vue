<script setup lang="ts"></script>

<template>
  <button type="button" class="ly_tool">
    <span v-if="!active" class="ly_tool_icon ic_menu"></span>
    <span v-else class="ly_tool_icon ic_close"></span>
    <span class="ly_tool_text">MENU</span>
  </button>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
