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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 10px solid #ddd;
  border-top-color: orange;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
