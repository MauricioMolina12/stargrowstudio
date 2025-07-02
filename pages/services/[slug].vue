<template>
  <h1>{{ slug }}</h1>
</template>
definePageMeta({
  layout: "default",
});
<script setup>
const route = useRoute()
const slug = computed(() => route.params.slug)

const service = computed(() => {
  return servicesData.find((s) => s.slug === slug.value)
})

</script>

<style>
h1 {
  color: red;
  font-size: 2rem;
}
</style>
