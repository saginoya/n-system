import { ref } from 'vue'

export const useSwitchChoice = (values: string[]) => {
  const active = ref(0)

  const switching = () => {
    if (active.value >= values.length - 1) {
      active.value = 0
    } else {
      active.value = active.value + 1
    }
  }

  return {
    active,
    switching
  }
}
