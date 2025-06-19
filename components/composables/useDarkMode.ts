import { useStorage } from "@vueuse/core";
import { onMounted, watch } from "vue";

export function useDarkMode() {
  const isDark = useStorage("dark-mode", false);

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  const setDark = (value: boolean) => {
    isDark.value = value;
  };

  const updateHtmlClass = () => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark.value);
  };

  onMounted(updateHtmlClass);

  watch(isDark, updateHtmlClass); 

  return { isDark, toggleDark, setDark };
}
