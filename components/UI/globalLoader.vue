<template>
  <div class="loader-wrapper">
    <img src="../../public/logo.png" alt="Logo" class="loader-logo" />
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  inset: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.loader-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
    animation: jump .8s ease-in-out infinite;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
