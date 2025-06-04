// composables/useDarkMode.ts
import { useStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'

export function useDarkMode() {
  // Guarda el modo oscuro como booleano
  const isDark = useStorage('dark-mode', false)

  const toggleDark = () => {
    isDark.value = !isDark.value
    updateHtmlClass()
  }

  const setDark = (value: boolean) => {
    isDark.value = value
    updateHtmlClass()
  }

  const updateHtmlClass = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  onMounted(updateHtmlClass)

  return { isDark, toggleDark, setDark }
}
