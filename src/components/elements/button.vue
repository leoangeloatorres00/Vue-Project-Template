<template>
  <div class="button-container">
    <v-btn
      text
      block
      elevation="0"
      :class="addClass"
      :outlined="outlined"
      :loading="isLoading"
      :rounded="isRounded"
      :disabled="isDisabled"
      @click="onClick"
    >
      <slot></slot>
    </v-btn>
  </div>
</template>

<script>
import { setLocalStorage } from "@/utils";

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
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    rounded: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    type: {
      type: String,
      default: () => {
        // primary, secondary, text
        return "primary";
      },
    },
  },
  data: () => {
    return {
      complete: false,
      buttonTimeout: 200,
      overlayLoadingTimeout: 1000,
    };
  },
  computed: {
    isLoading: function () {
      return this.loading ? this.complete : false;
    },
    isDisabled: function () {
      return this.disable;
    },
    isRounded: function () {
      return this.rounded;
    },
    addClass: function () {
      let className = "";

      if (this.disabled) className += "disabled ";
      if (this.type == "text") className += "text ";
      if (this.type == "secondary") className += "secondary ";

      return className;
    },
    outlined() {
      return this.type == "primary" || this.type == "secondary";
    },
  },
  methods: {
    onClick() {
      if (this.disabled) return;

      const self = this;

      self.$emit("click", true);

      self.complete = true;
      self.onOverlayLoading(self.complete);
      return;
    },
    onComplete() {
      const self = this;

      const timeout = this.overlayLoading
        ? this.overlayLoadingTimeout
        : this.buttonTimeout;

      setTimeout(() => {
        self.complete = false;
        self.onOverlayLoading(self.complete);
      }, timeout);
    },
    onOverlayLoading(loading) {
      if (this.overlayLoading) {
        setLocalStorage("loading", loading);
      }
    },
  },
};
</script>

<style scoped>
.button-container .v-btn {
  height: 55px !important;
  color: var(--button-text-primary);
  background: var(--button-background-primary);

  cursor: pointer;
  text-transform: none;
}

.button-container .v-btn.text {
  height: 20px !important;
}

.button-container .v-btn--outlined {
  border: 2px solid var(--button-border-primary) !important;
}

.button-container .v-btn--outlined.secondary {
  color: var(--button-text-secondary) !important;
  background: var(--button-background-secondary) !important;
}

.button-container .v-btn--outlined.disabled,
.button-container .v-btn--outlined.secondary.disabled {
  opacity: 0.5;
}
</style>
