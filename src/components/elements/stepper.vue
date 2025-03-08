<template>
  <div class="stepper-container">
    <div class="stepper">
      <template v-for="step in steps">
        <v-divider :key="step" class="step" :color="isActive(step)"></v-divider>
      </template>
    </div>
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
  mounted() {
    const container = document.querySelector(".stepper");
    const stepper = document.querySelector(".step");
    const width = container.clientWidth / this.steps;
    stepper.style.width = `${width}px`;
  },
  methods: {
    isActive(index) {
      if (this.step > 1) {
        return this.step >= index ? "#024173" : "#EEEEEE";
      }
      return this.step == index ? "#024173" : "#EEEEEE";
    },
  },
};
</script>

<style>
.stepper-container .v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>

<style scoped>
.stepper {
  display: flex;
  gap: 10px;
}

.stepper-container .step {
  height: 10px;
  max-height: 10px;

  margin-block: 10px;
  border-radius: 25px;
}
</style>
