<template>
  <div class="container">
    <TextField
      ref="text"
      placeholder="0.00"
      type="amount"
      title="Amount"
      :titleicon="icon"
      :outlined="false"
    />

    <TextField
      ref="text2"
      placeholder="Enter the amount"
      type="amount"
      title="Amount"
    />

    <Button ref="btnBack" @click="onBack"> Return Home </Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import TextField from "@/components/TextField.vue";

import { userInput } from "@/utils/data.js";

export default {
  components: {
    Button,
    TextField,
  },
  data: () => {
    return {
      icon: "mdi-check-circle",
    };
  },
  computed: {
    text() {
      return this.$refs.text.value;
    },
    text2() {
      return this.$refs.text2.value;
    },
  },
  mounted() {
    userInput(this, "text", this.onTest);
    userInput(this, "text2", this.onTest);
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onTest() {
      if (this.text != "") {
        console.log(this.text);
        return;
      }

      if (this.text2 != "") {
        console.log(this.text2);
        return;
      }
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
