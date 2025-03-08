<template>
  <span :class="`link-container ${isNoIcon ? '' : 'with-icon'}`">
    <v-icon class="icon" small v-if="!isNoIcon">{{ icon }}</v-icon>
    <span :class="addClass" @click="onClick" hide-details>
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => {
        return "";
      },
    },
    underline: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  computed: {
    addClass: function () {
      if (this.underline) return "link with-underline";

      return "link";
    },
    isNoIcon: function () {
      return this.icon == "";
    },
  },
  methods: {
    onClick() {
      this.$emit("click", true);
    },
  },
};
</script>

<style scoped>
.link-container {
  margin-bottom: 10px;
}

.link-container.with-icon {
  display: flex;
  align-items: center;
}

.link-container > .icon {
  margin-right: 5px;

  color: var(--link-primary);
}

.link {
  color: var(--link-primary);

  cursor: pointer;

  font-size: 14px;
}

.link.with-underline {
  border-bottom: 1px solid var(--link-primary);
}
</style>
