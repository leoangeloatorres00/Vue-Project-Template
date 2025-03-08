<template>
  <div class="accordion-wrapper">
    <v-expansion-panels :readonly="readonly">
      <v-expansion-panel v-for="(item, index) in items" :key="index">
        <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
        <v-expansion-panel-content v-html="item.description" />
        <hr />
      </v-expansion-panel>
    </v-expansion-panels>
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
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    readonly: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
};
</script>

<style>
.accordion-wrapper .v-expansion-panel-content__wrap {
  padding: 0px 0px 15px;
}

.accordion-wrapper .v-expansion-panel--active:not(:first-child),
.accordion-wrapper .v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0px;
}
</style>

<style scoped>
.accordion-wrapper .v-expansion-panel {
  margin-bottom: 10px;
  padding: 0px;
}

.accordion-wrapper .v-expansion-panel-content {
  margin-bottom: 10px;
}

.accordion-wrapper .v-expansion-panel::before {
  box-shadow: none;
}

.accordion-wrapper .v-expansion-panel-header {
  min-height: 35px;
  padding: 10px 0px 20px;
}

.accordion-wrapper
  .v-expansion-panels
  .v-expansion-panel:not(:first-child)::after {
  border: none;
}
</style>
