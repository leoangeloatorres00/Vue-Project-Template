<template>
  <div class="container">
    <Dropdown
      ref="state"
      :items="items"
      keys="state"
      placeholder="Select state"
    />

    <Button ref="btnBack" @click="onBack"> Return Home </Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Dropdown from "@/components/Dropdown.vue";

import { userInput } from "@/utils/data.js";

export default {
  components: {
    Button,
    Dropdown,
  },
  data: () => {
    return {
      items: [
        { state: "Florida", abbr: "FL" },
        { state: "Georgia", abbr: "GA" },
        { state: "Nebraska", abbr: "NE" },
        { state: "California", abbr: "CA" },
        { state: "New York", abbr: "NY" },
      ],
    };
  },
  computed: {
    state() {
      return this.$refs.state.value;
    },
  },
  mounted() {
    userInput(this, "state", this.onTest);
  },
  methods: {
    onTest() {
      if (this.state != "") {
        console.log(this.state);
        return;
      }
    },
    onBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}
</style>
