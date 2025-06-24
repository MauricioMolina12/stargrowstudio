import { ref } from 'vue'

const isVisible = ref(false)

export function useComponentMeeting() {
  const show = () => {
    isVisible.value = true
  }

  const hide = () => {
    isVisible.value = false
  }

  const toggle = () => {
    isVisible.value = !isVisible.value
  }

  return {
    isVisible,
    show,
    hide,
    toggle
  }
}
