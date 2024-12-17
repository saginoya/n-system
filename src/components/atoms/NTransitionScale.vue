<template>
  <Transition
    enter-active-class="transition-scale duration-300"
    leave-active-class="transition-scale duration-300"
    enter-from-class="scale-0"
    leave-to-class="scale-0"
  >
    <slot />
  </Transition>
</template>

<style>
@import url(../../assets/css/main.css);
</style>
