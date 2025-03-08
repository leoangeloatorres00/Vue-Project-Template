<template>
  <div class="checkbox-container">
    <v-checkbox v-model="value" hide-details>
      <template v-slot:label>
        <div class="checkbox-text" @click="onClickText">
          <slot></slot>
        </div>
      </template>
    </v-checkbox>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      value: false,
    };
  },
  methods: {
    onClickText(event) {
      event.preventDefault();
      event.stopPropagation();
    },
  },
};
</script>

<style>
.checkbox-container .primary--text {
  color: var(--checkbox-text-primary) !important;
  caret-color: var(--checkbox-text-primary) !important;
}
</style>

<style scoped>
.checkbox-text {
  font-size: 14px;
  text-align: left;
}
</style>
