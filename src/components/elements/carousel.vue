<template>
  <v-carousel
    :cycle="cycle"
    :height="height"
    :interval="interval"
    :show-arrows="showarrows"
    hide-delimiter-background
  >
    <v-carousel-item v-for="(item, index) in items" :key="index">
      <slot :item="item"></slot>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: () => {
        return 200;
      },
    },
    interval: {
      type: Number,
      default: () => {
        return 6000;
      },
    },
    cycle: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    showarrows: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.v-carousel__controls__item .v-icon {
  color: var(--carousel-indicator-primary) !important;
}

.v-carousel__controls__item.v-btn--active .v-icon {
  opacity: 1;
}
</style>
