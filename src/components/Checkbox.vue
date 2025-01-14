<template>
  <div>
    <v-checkbox v-model="value" :label="text" hide-details></v-checkbox>
  </div>
</template>

<script>
export default {
  props: {
    text: {
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
};
</script>
