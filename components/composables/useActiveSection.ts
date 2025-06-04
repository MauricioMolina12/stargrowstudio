import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref<string>('')

export function useActiveSection(sectionIds: string[]) {
  const handleScroll = () => {
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = `#${id}`
        break
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    activeSection,
  }
}
