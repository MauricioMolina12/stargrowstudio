<template>
  <button
    :class="['sg-button', variant, { disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "SgButton",
  props: {
    variant: {
      type: String,
      default: "primary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.sg-button {
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  font-size: .9rem;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.2s;
  padding: 10px;
  font-family: "Montserrat";
}

.sg-button.primary {
  background: #5956d6;
  color: white;
}

.sg-button.secondary {
  background: white;
  color: #5956d6;
  border: 1px solid #5956d6;
}

.sg-button.disabled,
.sg-button:disabled {
  background: #ccc;
  color: #888;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .sg-button{
    font-size: 1rem;
    width: 100%;

  }
}

</style>
