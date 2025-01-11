<template>
  <div>
    <div class="title-container" v-if="onTitle">
      <span class="input-title">{{ title }}</span>
    </div>
    <v-btn
      v-for="(item, index) in items"
      :key="index"
      outlined
      :class="`switch switch-${index} ${isActive(item)}`"
      @click="onClick(index)"
    >
      {{ item }}
    </v-btn>
  </div>
</template>

<script>
export default {
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
    title: {
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
  computed: {
    onTitle: function () {
      return this.title != "";
    },
  },
  mounted() {
    if (this.items.length > 0) {
      this.value = this.items[this.default];
    }
  },
  methods: {
    onClick(index) {
      this.value = this.items[index];
    },
    isActive(text) {
      return this.value == text ? "active" : "";
    },
  },
};
</script>

<style scoped>
.title-container {
  margin-top: 16px;
  margin-bottom: 4px;
}

.input-title {
  margin-left: 4px;
  font-size: 12px;
}

.switch {
  width: calc(50% - 10px);
  height: 55px !important;
}

.switch-0 {
  margin-inline: 0px 10px;
}

.switch-1 {
  margin-inline: 10px 0px;
}

.switch.active {
  border: thin solid var(--switch-active-color) !important;
  color: var(--switch-active-color);
}

.v-btn--outlined {
  border: thin solid var(--border-color) !important;
}
</style>
