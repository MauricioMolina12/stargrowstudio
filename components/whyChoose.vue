<template>
  <section class="whyChoose">
    <div class="whyChoose--inner">
      <div class="whyChoose--inner__description">
        <span class="subtitle">En Star Grow queremos hacer todo fácil para ti.</span>
        <h1 class="title">¿Por qué elegirnos? 🥇</h1>
      </div>
      <div class="whyChoose--inner__grid">
        
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup></script>
<style>
.whyChoose {
  width: 100%;
  max-height: max-content;
  padding-block: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.whyChoose--inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 30px;
  gap: 20px;
}

.whyChoose--inner__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 0;
  gap: 10px;
}

.whyChoose--inner .subtitle {
  color: var(--color-primary);
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  text-align: center;
  max-width: 90%;
}

.whyChoose--inner .title {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 700;
  color: var(--color-black);
  text-align: center;
  max-width: 90%;
}

@media (min-width: 1280px) {
  .whyChoose--inner {
    width: 60%;
    margin: 0 auto;
  }
}
</style>