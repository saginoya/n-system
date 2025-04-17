<template>
  <span class="px-4">
    <span
      class="inline-block h-2 w-8 -translate-y-0.5 skew-x-[-45deg] border-b-2 border-l-2 border-b-slate-400 border-l-slate-400 content-['']"
    ></span>
    <span class="inline-block px-2">
      <slot />
    </span>
    <span
      class="inline-block h-2 w-8 -translate-y-0.5 skew-x-[45deg] border-b-2 border-r-2 border-b-slate-400 border-r-slate-400 content-['']"
    ></span>
  </span>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
