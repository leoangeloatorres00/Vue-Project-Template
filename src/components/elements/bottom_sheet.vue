<template>
  <v-bottom-sheet class="bottomsheet" v-model="show">
    <v-sheet class="sheet">
      <div class="bottomsheet-close" @click="closeSheet">
        <v-icon>mdi-close</v-icon>
      </div>
      <slot></slot>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  data: () => {
    return {
      show: false,
    };
  },
  methods: {
    closeSheet() {
      this.show = false;
    },
  },
};
</script>

<style>
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 100%;
}

.bottomsheet-container {
  padding: 0px 20px;
}

.bottomsheet-close {
  display: flex;
  justify-content: end;

  padding: 20px 0px 0px !important;
  margin: 0px 20px 0px !important;
}

.bottomsheet-title {
  padding: 0px 20px !important;
}

.v-bottom-sheet header,
.v-bottom-sheet main {
  padding: 0px 20px;
}

.v-bottom-sheet footer {
  padding: 0px 20px 55px;
}
</style>
