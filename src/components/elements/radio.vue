<template>
  <div class="radio-container">
    <v-radio-group v-model="value" :row="vertical">
      <template v-for="(list, index) in lists">
        <v-radio class="radio" :key="index" :value="index">
          <template v-slot:label> {{ list }}</template>
        </v-radio>
      </template>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default: () => {
        return [];
      },
    },
    vertical: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data: () => {
    return {
      value: 0,
    };
  },
};
</script>

<style>
.radio-container .primary--text {
  color: var(--radio-text-primary) !important;
  caret-color: var(--radio-text-primary) !important;
}

.radio-container .v-messages {
  min-height: 0px;
}

.radio-container .v-input--radio-group__input > .v-radio:nth-last-child() {
  margin-block: 10px 0px;
}
</style>

<style scoped>
.radio {
  margin-block: 10px 0px;
}

.radio >>> label {
  font-size: 14px;
  padding-block: 3px 0px;
}

.radio-container .v-input--radio-group {
  margin-block: 0px;
}
</style>
