<template>
  <a
    :href="href"
    class="header-link"
    :style="{ color: color, padding: padding }"
  >
    {{ label }}
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#fff",
  },
  fontWeight: {
    type: String,
  },
  padding: {
    type: String
  }
});
</script>

<style scoped>
.header-link {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 400;
  transition: color 0.2s;
  cursor: pointer;
  font-size: 0.9rem;
}

/* .header-link.active {
  color: var(--color-primary);
}

.header-link:hover {
  color: var(--color-primary);
} */

@media (max-width: 900px) {
  .header-link {
    font-size: 1rem;
    padding-left: 0;
  }
}
</style>
