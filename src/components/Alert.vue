<template>
  <v-dialog v-model="show" width="350">
    <v-card>
      <v-card-title> {{ title }} </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="mt-5" height="500">
        {{ content }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="my-2" outlined block dense @click="show = false">
          Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    content: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.v-btn--outlined {
  border: thin solid var(--border-color) !important;
}

.v-btn__content {
  font-size: 18px;
  text-transform: none !important;
}
</style>
