<template>
  <v-app>
    <Loading />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Loading from "@/components/elements/loading.vue";

export default {
  components: {
    Loading,
  },
};
</script>

<style>
:root {
  /* neutral */
  --white: #ffffff;
  --black: #000000;

  /* error */
  --cg-red: #e53935;

  /* disabled */
  --lotion: #fafafa;

  /* link */
  --blue-cola: #0080da;

  /* primary */
  --oxford-blue: #0c2a42;

  /* border */
  --spanish-gray: #9e9e9e;

  /* overlay */
  --black-lighten: #0000001a;

  /* secondary */
  --dark-midnight-blue: #003a63;

  /* Text Field, Text Area */
  --input-border-primary: var(--spanish-gray);
  --input-border-error: var(--cg-red);

  --input-background-primary: var(--white);
  --input-background-disabled: var(--lotion);

  --input-text-error: var(--cg-red);
  --input-text-primary: var(--oxford-blue);
  --input-text-secondary: var(--spanish-gray);

  /* Button */
  --button-text-primary: var(--oxford-blue);
  --button-border-primary: var(--oxford-blue);
  --button-background-primary: var(--white);

  --button-text-secondary: var(--white);
  --button-border-secondary: var(--oxford-blue);
  --button-background-secondary: var(--oxford-blue);

  /* Paragraph, Span, Label */
  --text-primary: var(--black);

  --text-secondary: var(--oxford-blue);

  --text-disabled: var(--lotion);

  --text-error: var(--lotion);

  --link-primary: var(--blue-cola);

  /* Overlay */
  --overlay-background-primary: var(--black-lighten);
  --overlay-loading-primary: var(--oxford-blue);
  --overlay-loading-secondary: var(--white);

  /* Carousel */
  --carousel-indicator-primary: var(--oxford-blue);

  /* Checkbox */
  --checkbox-text-primary: var(--oxford-blue);

  /* Radio */
  --radio-text-primary: var(--oxford-blue);

  /* Switch */
  --switch-border-primary: var(--oxford-blue);
  --switch-background-primary: var(--oxford-blue);
}

* {
  color: var(--text-secondary);
  caret-color: var(--text-secondary);

  font-family: "Satoshi-Medium", "Roboto" !important;
  font-weight: 500;
}

h2,
h3,
h4 {
  font-family: "Satoshi-Bold", "Roboto" !important;
  font-weight: 700;
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
