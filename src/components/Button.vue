<template>
  <div class="container">
    <v-btn
      block
      outlined
      elevation="0"
      @click="onClick"
      :loading="isLoading"
      :disabled="isDisabled"
    >
      <slot></slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    overlayLoading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    disable: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data: () => {
    return {
      timeout: 1000,
      complete: false,
    };
  },
  computed: {
    isLoading: function () {
      return this.loading ? this.complete : false;
    },
    isDisabled: function () {
      return this.disable ? this.disable : false;
    },
  },
  methods: {
    onClick() {
      const self = this;

      self.$emit("click", true);

      self.complete = true;
      self.onOverlayLoading(self.complete);
    },
    onComplete() {
      const self = this;

      setTimeout(() => {
        self.complete = false;
        self.onOverlayLoading(self.complete);
      }, self.timeout);
    },
    onOverlayLoading(loading) {
      if (this.overlayLoading) {
        localStorage.setItem("loading", loading);
        window.dispatchEvent(
          new CustomEvent("loading", {
            detail: localStorage.getItem("loading"),
          })
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}

.v-btn {
  height: 55px !important;
}

.v-btn--outlined {
  border: thin solid var(--border-color) !important;
}

.v-btn--disabled {
  border: thin solid var(--border-disabled-color) !important;
}
</style>
