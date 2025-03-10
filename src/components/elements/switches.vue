<template>
  <div class="switch-container">
    <span class="label">{{ label }}</span>
    <slot></slot>
    <div class="switch-wrapper">
      <Button
        v-for="(item, index) in items"
        :key="index"
        :class="`switch switch-${index} ${isActive(item.value)}`"
        @click="onClick(index)"
      >
        {{ item.key }}
      </Button>
    </div>
  </div>
</template>

<script>
import { lazyLoad } from "@/utils";

export default {
  components: {
    Button: lazyLoad("button", "component"),
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    default: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    label: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data: () => {
    return {
      value: "",
    };
  },
  mounted() {
    if (this.items.length > 0) {
      this.value = this.items[this.default].value;
    }
  },
  methods: {
    onClick(index) {
      this.value = this.items[index].value;
    },
    isActive(text) {
      return this.value == text ? "active" : "";
    },
  },
};
</script>

<style>
.button-container.switch > .v-btn--outlined {
  border: 1px solid var(--switch-border-secondary) !important;
  background: var(--switch-background-secondary) !important;
}

.button-container.switch.active > .v-btn--outlined {
  border: 1px solid var(--switch-border-primary) !important;
  background: var(--switch-background-primary) !important;
}
</style>

<style scoped>
.switch-container {
  margin-bottom: 10px;
}

.switch-wrapper {
  display: flex;
}

.label {
  font-size: 12px;
}

.switch {
  width: calc(50% - 5px);
  height: 55px !important;
}

.switch-0 {
  margin-inline: 0px 5px;
}

.switch-1 {
  margin-inline: 5px 0px;
}
</style>
