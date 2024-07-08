<template>
  <article class="flex h-full flex-col gap-2">
    <header class="flex-none">
      <slot name="header"></slot>
    </header>
    <div class="grow">
      <slot />
    </div>
    <footer class="flex-none">
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
