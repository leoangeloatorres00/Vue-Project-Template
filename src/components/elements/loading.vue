<template>
  <div v-if="loading" class="loading-state">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      loading: false,
    };
  },
  mounted() {
    window.addEventListener("loading", (event) => {
      this.loading = event.detail === "true";
    });
  },
};
</script>

<style scoped>
.loading-state {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--overlay-background-primary);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid var(--overlay-loading-secondary);
  border-top-color: var(--overlay-loading-primary);
  animation: loading 1s linear infinite;
}

@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
