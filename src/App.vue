<template>
  <v-app>
    <Loading />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },
};
</script>

<style>
:root {
  --border-color: rgba(0, 0, 0, 0.42);
  --border-error-color: rgba(213, 0, 0, 1);

  --border-disabled-color: rgba(0, 0, 0, 0.26);

  --error-color: rgba(213, 0, 0, 1);

  --prefix-color-icon: rgba(0, 0, 0, 0.42);

  --prepend-color-icon: rgba(117, 117, 117, 1);

  --switch-active-color: rgba(25, 118, 209, 1);
}

/* Remove the ripple effect in button */
.v-btn:before {
  opacity: 0 !important;
}

.v-ripple__container {
  opacity: 0 !important;
}

/* Remove uppercase effect in button */
.v-btn__content {
  font-size: 16px;
  text-transform: none !important;
}
</style>
