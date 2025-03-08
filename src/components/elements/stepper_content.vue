<template>
  <div class="stepper-container">
    <v-stepper v-model="step">
      <v-stepper-items>
        <template v-for="step in steps">
          <v-stepper-content :key="step" :step="step">
            <slot :name="`stepper-${step}`"></slot>
          </v-stepper-content>
        </template>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Number,
      default: () => {
        return 1;
      },
    },
  },
  data: () => {
    return {
      step: 1,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.stepper-container .v-stepper__content {
  padding: 0px;
}
</style>
