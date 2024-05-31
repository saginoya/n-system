<script setup lang="ts"></script>

<template>
  <header class="flex flex-col gap-6 bg-primary px-4 py-2 text-white">
    <n-title-site :titleList="title"></n-title-site>
    <nav>
      <bl-container-col>
        <bl-nav-list :links="nav.header"> </bl-nav-list>
        <bl-nav-list :links="nav.footer"> </bl-nav-list>
        <bl-nav-list :links="nav.lang"> </bl-nav-list>
      </bl-container-col>
    </nav>
    <slot />
  </header>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
