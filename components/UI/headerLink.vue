<template>
  <a
    :href="href"
    class="header-link"
    :class="{ active: isActive }"
    :style="{ color: color, padding: padding }"
  >
    {{ label }}
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: false,
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
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.header-link {
  text-decoration: none;
  font-weight: 400;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.8rem;
}

.header-link.active {
  color: #5656b5 !important;
  font-weight: 600;
}

.header-link:hover {
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 900px) {
  .header-link {
    font-size: 1rem;
    padding-left: 0;
  }
}
</style>
