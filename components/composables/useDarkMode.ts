import { useStorage } from "@vueuse/core";
import { watchEffect } from "vue";

export function useDarkMode() {
  const isDark = useStorage("dark-mode", false); 

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  const setDark = (value: boolean) => {
    isDark.value = value;
  };

  if (process.client) {
    const updateHtmlClass = () => {
      document.documentElement.classList.toggle("dark", isDark.value);
    };

    updateHtmlClass();
    watchEffect(updateHtmlClass);
  }

  return { isDark, toggleDark, setDark };
}
