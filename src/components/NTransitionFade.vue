<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <slot />
  </Transition>
</template>

<style>
@import url(../assets/css/main.css);
</style>
